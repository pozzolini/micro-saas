import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthenticatedUser } from '../interfaces/authenticated-user.interface';

// Este decorator evita acessar `req.user` manualmente em todo controller.
// O controller recebe so o dado de autenticacao que interessa para a rota.
export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): AuthenticatedUser => {
    const request = ctx.switchToHttp().getRequest<{
      user: AuthenticatedUser;
    }>();

    return request.user;
  },
);
