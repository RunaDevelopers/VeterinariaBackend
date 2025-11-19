import { CreateTipoProductoDto } from 'src/DTO';
import { BaseResponseDto } from 'src/DTO/baseResponse/baseResponse.dto';
import { TipoProducto } from 'src/entities';

export interface TipoProductoInterface {
    createTipoProducto(
        producto: CreateTipoProductoDto,
    ): Promise<BaseResponseDto<TipoProducto>>;
    getTipoProductos(): Promise<BaseResponseDto<TipoProducto[]>>;
    getTipoProductosActivos(): Promise<BaseResponseDto<TipoProducto[]>>;
    getTipoProductoByName(name: string): Promise<BaseResponseDto<TipoProducto>>;
    getTipoProductoById(id: string): Promise<BaseResponseDto<TipoProducto>>;
    updateTipoProducto(
        id: string,
        producto: CreateTipoProductoDto,
    ): Promise<BaseResponseDto<TipoProducto>>;
    deleteTipoProducto(id: string): Promise<BaseResponseDto<null>>;
    activateTipoProducto(id: string): Promise<BaseResponseDto<TipoProducto>>;
    hardDeleteTipoProducto(id: string): Promise<BaseResponseDto<null>>;
}