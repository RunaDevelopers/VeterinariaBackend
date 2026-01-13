import { CreateEspecieDto, UpdateEspecieDto } from 'src/DTO';
import { BaseResponseDto } from 'src/DTO/baseResponse/baseResponse.dto';
import { Especies } from 'src/entities';

export interface EspecieInterface {
    getEspecies(): Promise<BaseResponseDto<Especies[]>>;
    getEspeciesActivas(): Promise<BaseResponseDto<Especies[]>>;
    getEspecieById(id: string): Promise<BaseResponseDto<Especies>>;
    getEspecieByName(nombre: string): Promise<BaseResponseDto<Especies>>;
    createEspecie(createEspecieDto: CreateEspecieDto): Promise<BaseResponseDto<Especies>>;
    updateEspecie(id: string, updateEspecieDto: UpdateEspecieDto): Promise<BaseResponseDto<Especies>>;
    deleteEspecie(id: string): Promise<BaseResponseDto<null>>;
    activateEspecie(id: string): Promise<BaseResponseDto<Especies>>;
}
