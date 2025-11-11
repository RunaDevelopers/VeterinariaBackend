import { PartialType } from '@nestjs/swagger';
import { CreateExamenLaboratorioDto } from './create-examen-laboratorio.dto';

export class UpdateExamenLaboratorioDto extends PartialType(CreateExamenLaboratorioDto) { }
