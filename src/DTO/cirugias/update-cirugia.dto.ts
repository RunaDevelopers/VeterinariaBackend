import { PartialType } from '@nestjs/swagger';
import { CreateCirugiaDto } from './create-cirugia.dto';

export class UpdateCirugiaDto extends PartialType(CreateCirugiaDto) { }
