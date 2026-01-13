import { CreateRazaDto, UpdateRazaDto } from 'src/DTO';
import { BaseResponseDto } from 'src/DTO/baseResponse/baseResponse.dto';
import { Razas } from 'src/entities';

export interface RazaInterface {
    getRazas(): Promise<BaseResponseDto<Razas[]>>;
    getRazasActivas(): Promise<BaseResponseDto<Razas[]>>;
    getRazaById(id: string): Promise<BaseResponseDto<Razas>>;
    getRazaByName(nombre: string): Promise<BaseResponseDto<Razas>>;
    getRazasByEspecie(idEspecie: string): Promise<BaseResponseDto<Razas[]>>;
    createRaza(createRazaDto: CreateRazaDto): Promise<BaseResponseDto<Razas>>;
    updateRaza(id: string, updateRazaDto: UpdateRazaDto): Promise<BaseResponseDto<Razas>>;
    deleteRaza(id: string): Promise<BaseResponseDto<null>>;
    activateRaza(id: string): Promise<BaseResponseDto<Razas>>;
}
