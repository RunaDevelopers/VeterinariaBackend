import { PartialType } from '@nestjs/swagger';
import { CreateHistorialClinicoDto } from './create-historial-clinico.dto';

export class UpdateHistorialClinicoDto extends PartialType(CreateHistorialClinicoDto) { }
