import { PartialType } from '@nestjs/swagger';
import { CreateAlergiaMascotaDto } from './create-alergia-mascota.dto';

export class UpdateAlergiaMascotaDto extends PartialType(CreateAlergiaMascotaDto) { }
