import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../../users/users.service';
import { AuthenticatedUser } from '../interfaces/authenticated-user.interface';

// Este payload e o que foi gravado no token no momento do login.
interface JwtPayload {
  sub: number;
  email: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not set');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  // A cada request autenticada, recarregamos o usuario do banco.
  // Isso garante que `organizationId` esteja atualizada mesmo apos mudancas.
  async validate(payload: JwtPayload): Promise<AuthenticatedUser> {
    const authenticatedUser = await this.usersService.findAuthenticatedUserById(
      payload.sub,
    );

    if (!authenticatedUser) {
      throw new UnauthorizedException('Invalid token');
    }

    return authenticatedUser;
  }
}
