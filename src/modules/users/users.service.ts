import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { hash } from 'bcryptjs';
import { AuthenticatedUser } from '../auth/interfaces/authenticated-user.interface';
import { PrismaService } from '../../shared/database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

const userPublicSelect = {
  id: true,
  name: true,
  email: true,
  organizationId: true,
} satisfies Prisma.UserSelect;

// Este select representa apenas os campos necessarios para autenticacao.
// Ele evita retornar dados desnecessarios e permite extrair um tipo forte
// diretamente do Prisma para uso no AuthService.
const userAuthSelect = {
  id: true,
  email: true,
  passwordHash: true,
} satisfies Prisma.UserSelect;

// Aqui usamos o proprio Prisma para derivar o tipo exato do retorno
// com base no select acima. Isso evita `any`, tipos implicitos e
// os erros de `no-unsafe-*` no AuthService.
type UserAuthRecord = Prisma.UserGetPayload<{
  select: typeof userAuthSelect;
}>;

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  // Este metodo existe para a strategy reconstruir o contexto do usuario
  // autenticado com dados atuais do banco.
  async findAuthenticatedUserById(
    id: number,
  ): Promise<AuthenticatedUser | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        organizationId: true,
      },
    });

    if (!user) {
      return null;
    }

    return {
      userId: user.id,
      email: user.email,
      organizationId: user.organizationId,
    };
  }

  // Este metodo e consumido pelo AuthService no fluxo de login.
  // Ele retorna apenas o necessario para validar credenciais e
  // gerar o token, com tipagem explicita e segura.
  async findByEmail(email: string): Promise<UserAuthRecord | null> {
    return this.prisma.user.findUnique({
      where: { email },
      select: userAuthSelect,
    });
  }

  async create(createUserDto: CreateUserDto) {
    const passwordHash = await hash(createUserDto.password, 10);

    try {
      return await this.prisma.user.create({
        data: {
          name: createUserDto.name,
          email: createUserDto.email,
          passwordHash,
        },
        select: userPublicSelect,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Email already exists');
      }

      throw error;
    }
  }

  async findAll(authenticatedUser: AuthenticatedUser) {
    if (!authenticatedUser.organizationId) {
      return [];
    }

    return this.prisma.user.findMany({
      where: {
        organizationId: authenticatedUser.organizationId,
      },
      select: userPublicSelect,
    });
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: userPublicSelect,
    });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      return await this.prisma.user.update({
        where: { id },
        data: updateUserDto,
        select: userPublicSelect,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`User with id ${id} not found`);
      }

      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Email already exists');
      }

      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.user.delete({
        where: { id },
        select: userPublicSelect,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`User with id ${id} not found`);
      }

      throw error;
    }
  }
}
