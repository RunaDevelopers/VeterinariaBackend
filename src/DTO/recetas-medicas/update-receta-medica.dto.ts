import { PartialType } from '@nestjs/swagger';
import { CreateRecetaMedicaDto } from './create-receta-medica.dto';

export class UpdateRecetaMedicaDto extends PartialType(CreateRecetaMedicaDto) { }
