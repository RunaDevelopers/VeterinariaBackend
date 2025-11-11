import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Usuarios } from '../../entities/Usuarios';

/**
 * Decorador personalizado para obtener el usuario autenticado
 * Uso: @GetUser() usuario: Usuarios
 */
export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): Usuarios => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
