import { PartialType } from '@nestjs/swagger';
import { CreateCondicionCronicaDto } from './create-condicion-cronica.dto';

export class UpdateCondicionCronicaDto extends PartialType(CreateCondicionCronicaDto) { }
