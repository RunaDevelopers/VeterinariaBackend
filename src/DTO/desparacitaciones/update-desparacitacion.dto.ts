import { PartialType } from '@nestjs/swagger';
import { CreateDesparacitacionDto } from './create-desparacitacion.dto';

export class UpdateDesparacitacionDto extends PartialType(CreateDesparacitacionDto) { }
