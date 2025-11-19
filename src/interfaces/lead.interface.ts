import { CreateLeadDto, UpdateLeadDto } from 'src/DTO';
import { BaseResponseDto } from 'src/DTO/baseResponse/baseResponse.dto';
import { Leads } from 'src/entities/Leads';

export interface LeadInterface {
    findAll(): Promise<BaseResponseDto<Leads[]>>;
    findAllActive(): Promise<BaseResponseDto<Leads[]>>;
    findOne(id: string): Promise<BaseResponseDto<Leads>>;
    create(createLeadDto: CreateLeadDto): Promise<BaseResponseDto<Leads>>;
    update(id: string, updateLeadDto: UpdateLeadDto): Promise<BaseResponseDto<Leads>>;
    remove(id: string): Promise<BaseResponseDto<null>>;
    findByEmail(correo: string): Promise<BaseResponseDto<Leads>>;
    findByTipoServicio(idTipoServicio: string): Promise<BaseResponseDto<Leads[]>>;
}
