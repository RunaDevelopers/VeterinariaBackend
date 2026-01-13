import { CreateCitaMedicaDto } from "src/DTO/citas-medicas/create-cita-medica.dto";
import { UpdateCitaMedicaDto } from "src/DTO/citas-medicas/update-cita-medica.dto";
import { BaseResponseDto } from "src/DTO/baseResponse/baseResponse.dto";
import { CitasMedicas } from "src/entities";

export interface CitaMedicaInterface {
    createCitaMedica(cita: CreateCitaMedicaDto): Promise<BaseResponseDto<CitasMedicas>>;
    getCitasMedicas(): Promise<BaseResponseDto<CitasMedicas[]>>;
    getCitaMedicaById(id: string): Promise<BaseResponseDto<CitasMedicas>>;
    getCitasByCliente(idCliente: string): Promise<BaseResponseDto<CitasMedicas[]>>;
    getCitasByMascota(idMascota: string): Promise<BaseResponseDto<CitasMedicas[]>>;
    getCitasByVeterinario(idVeterinario: string): Promise<BaseResponseDto<CitasMedicas[]>>;
    getCitasByEstado(estado: string): Promise<BaseResponseDto<CitasMedicas[]>>;
    getCitasByFecha(fecha: string): Promise<BaseResponseDto<CitasMedicas[]>>;
    updateCitaMedica(id: string, cita: UpdateCitaMedicaDto): Promise<BaseResponseDto<CitasMedicas>>;
    cancelarCita(id: string, motivo?: string): Promise<BaseResponseDto<CitasMedicas>>;
    deleteCitaMedica(id: string): Promise<BaseResponseDto<null>>;
}
