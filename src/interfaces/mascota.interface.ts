import { BaseResponseDto } from '../DTO/baseResponse/baseResponse.dto';
import { Mascotas } from '../entities/Mascotas';
import { CreateMascotaDto } from '../DTO/mascotas/create-mascota.dto';
import { UpdateMascotaDto } from '../DTO/mascotas/update-mascota.dto';

export interface IMascotaService {
    getMascotas(): Promise<BaseResponseDto<Mascotas[]>>;
    getMascotasActivas(): Promise<BaseResponseDto<Mascotas[]>>;
    getMascotaById(id: string): Promise<BaseResponseDto<Mascotas>>;
    getMascotasByCliente(idCliente: string): Promise<BaseResponseDto<Mascotas[]>>;
    getMascotasByEspecie(idEspecie: string): Promise<BaseResponseDto<Mascotas[]>>;
    getMascotasByRaza(idRaza: string): Promise<BaseResponseDto<Mascotas[]>>;
    createMascota(createMascotaDto: CreateMascotaDto): Promise<BaseResponseDto<Mascotas>>;
    updateMascota(id: string, updateMascotaDto: UpdateMascotaDto): Promise<BaseResponseDto<Mascotas>>;
    deleteMascota(id: string): Promise<BaseResponseDto<Mascotas>>;
    activateMascota(id: string): Promise<BaseResponseDto<Mascotas>>;
    registrarFallecimiento(id: string, fechaFallecimiento: string, causaFallecimiento?: string): Promise<BaseResponseDto<Mascotas>>;
}
