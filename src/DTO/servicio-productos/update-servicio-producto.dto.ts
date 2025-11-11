import { PartialType } from '@nestjs/swagger';
import { CreateServicioProductoDto } from './create-servicio-producto.dto';

export class UpdateServicioProductoDto extends PartialType(CreateServicioProductoDto) { }
