// Este tipo representa o usuario autenticado que o JwtStrategy
// coloca dentro de `request.user` depois de validar o token.
export interface AuthenticatedUser {
  // Identificador interno usado nas regras de negocio.
  userId: number;

  // Email mantido no contexto por conveniencia.
  email: string;

  // Define o tenant atual do usuario.
  // Pode ser null enquanto ele ainda nao estiver sem organization vinculada.
  organizationId: number | null;
}
