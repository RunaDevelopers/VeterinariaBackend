import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../entities/user.entity';

export class AuthResponseDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'Token JWT de acceso',
  })
  access_token: string;

  @ApiProperty({
    example: {
      id: '123e4567-e89b-12d3-a456-426614174000',
      email: 'usuario@veterinaria.com',
      nombre: 'Juan',
      apellido: 'Pérez',
      rol: 'cliente',
    },
    description: 'Información del usuario autenticado',
  })
  user: {
    id: string;
    email: string;
    nombre: string;
    apellido: string;
    telefono: string;
    rol: UserRole;
  };
}
