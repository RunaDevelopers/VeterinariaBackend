import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'Token JWT de acceso',
  })
  access_token: string;

  @ApiProperty({
    example: {
      idUsuario: '123e4567-e89b-12d3-a456-426614174000',
      username: 'jperez',
      email: 'usuario@veterinaria.com',
      nombres: 'Juan',
      apellidos: 'Pérez García',
      telefono: '+51 987654321',
      idRol: '6a6063da-6ec4-403e-988c-05a4af86958b',
      nombreRol: 'VETERINARIO',
    },
    description: 'Información del usuario autenticado',
  })
  user: {
    idUsuario: string;
    username: string;
    email: string;
    nombres: string;
    apellidos: string;
    telefono: string;
    idRol: string;
    nombreRol?: string;
  };
}
