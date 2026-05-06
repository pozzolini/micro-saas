import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // Este metodo busca o usuario pelo email, valida a senha com bcrypt
  // e gera o token JWT apenas quando as credenciais estiverem corretas.
  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);

    // Se o usuario nao existir ou nao tiver hash de senha valido,
    // a autenticacao deve falhar imediatamente.
    if (!user?.passwordHash) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await compare(loginDto.password, user.passwordHash);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // O payload carrega apenas o necessario para identificar o usuario
    // no token. Dados dinamicos, como organizationId, devem ser buscados
    // novamente na strategy durante a autenticacao da request.
    const payload: { sub: number; email: string } = {
      sub: user.id,
      email: user.email,
    };

    return {
      tokenType: 'Bearer',
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
