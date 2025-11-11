import { PartialType } from '@nestjs/swagger';
import { CreateCitaMedicaDto } from './create-cita-medica.dto';

export class UpdateCitaMedicaDto extends PartialType(CreateCitaMedicaDto) { }
