import { CreateProductoDto } from "src/DTO";
import { BaseResponseDto } from "src/DTO/baseResponse/baseResponse.dto";
import { Productos } from "src/entities";

export interface ProductoInterface {
    createProducto(producto: CreateProductoDto): Promise<BaseResponseDto<Productos>>;
    getProductos(): Promise<BaseResponseDto<Productos[]>>;
    getProductosActivos(): Promise<BaseResponseDto<Productos[]>>;
    getProductoByName(name: string): Promise<BaseResponseDto<Productos>>;
    updateProducto(id: string, producto: CreateProductoDto): Promise<BaseResponseDto<Productos>>;
    //eliminado lógico
    deleteLogicalProducto(id: string): Promise<BaseResponseDto<null>>;
    //activacion de Producto
    activateProducto(id: string): Promise<BaseResponseDto<Productos>>;
    //eliminado permanente
    hardDeleteProducto(id: string): Promise<BaseResponseDto<null>>;
}