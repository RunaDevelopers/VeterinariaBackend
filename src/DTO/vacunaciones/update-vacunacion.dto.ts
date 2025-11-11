import { PartialType } from '@nestjs/swagger';
import { CreateVacunacionDto } from './create-vacunacion.dto';

export class UpdateVacunacionDto extends PartialType(CreateVacunacionDto) { }
