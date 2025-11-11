import { PartialType } from '@nestjs/swagger';
import { CreateServicioRealizadoDto } from './create-servicio-realizado.dto';

export class UpdateServicioRealizadoDto extends PartialType(CreateServicioRealizadoDto) { }
