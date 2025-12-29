import { CreateTipoServicioDto, UpdateTipoServicioDto } from "src/DTO";
import { BaseResponseDto } from "src/DTO/baseResponse/baseResponse.dto";
import { TipoServicios } from "src/entities";

export interface TipoServiciosInterface {
    findAll(): Promise<BaseResponseDto<TipoServicios[]>>;
    findAllActive(): Promise<BaseResponseDto<TipoServicios[]>>;
    findByCategoria(categoria: string): Promise<BaseResponseDto<TipoServicios[]>>;
    findRequiereVeterinario(): Promise<BaseResponseDto<TipoServicios[]>>;
    findRequiereCita(): Promise<BaseResponseDto<TipoServicios[]>>;
    findOne(id: string): Promise<BaseResponseDto<TipoServicios>>;
    findOneSimple(id: string): Promise<BaseResponseDto<TipoServicios>>;
    create(createTipoServicioDto: CreateTipoServicioDto): Promise<BaseResponseDto<TipoServicios>>;
    update(id: string, updateTipoServicioDto: UpdateTipoServicioDto): Promise<BaseResponseDto<TipoServicios>>;
    remove(id: string): Promise<BaseResponseDto<TipoServicios>>;
    hardDelete(id: string): Promise<BaseResponseDto<null>>;
    activate(id: string): Promise<BaseResponseDto<TipoServicios>>;
}