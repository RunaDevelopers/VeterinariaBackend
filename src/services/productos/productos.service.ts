import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductoDto } from 'src/DTO';
import { BaseResponseDto } from 'src/DTO/baseResponse/baseResponse.dto';
import { Productos } from 'src/entities';
import { ProductoInterface } from 'src/interfaces';
import { TipoProductoService } from '../tipo-producto/tipo-producto.service';

@Injectable()
export class ProductosService implements ProductoInterface {
    constructor(
        @InjectRepository(Productos)
        private readonly productosRepository: Repository<Productos>,
        private readonly tipoProductoService: TipoProductoService,
    ) { }

    private createCodeProducto(name: string): string {
        // Limpiar y formatear el nombre
        const cleanName = name
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '') // Eliminar acentos
            .toUpperCase()
            .replace(/[^A-Z0-9\s]/g, '') // Solo letras y números y espacios
            .trim()
            .split(/\s+/) // Dividir por espacios
            .slice(0, 3) // Máximo 3 palabras
            .map(word => word.substring(0, 4)) // Máximo 4 letras por palabra
            .join('-');
        const randomNum = Math.floor(Math.random() * 100).toString().padStart(2, '0');

        return `${cleanName}-${randomNum}`; // Ejemplo: "AMOX-847"
    }

    private mapDtoToEntity(dto: CreateProductoDto): Partial<Productos> {
        return {
            idTipoProducto: dto.idTipoProducto,
            codigoProducto: this.createCodeProducto(dto.nombreProducto),
            nombreProducto: dto.nombreProducto,
            descripcion: dto.descripcion,
            marca: dto.marca,
            presentacion: dto.presentacion,
            requiereReceta: dto.requiereReceta ?? false,
            requiereRefrigeracion: dto.requiereRefrigeracion ?? false,
            stockActual: dto.stockActual,
            stockMinimo: dto.stockMinimo,
            unidadMedida: dto.unidadMedida,
            precioCompra: dto.precioCosto,
            precioVenta: dto.precioVenta,
            fechaVencimiento: dto.fechaCaducidad ? new Date(dto.fechaCaducidad) : null,
            lote: dto.lote,
            proveedor: dto.proveedor,
            activo: dto.activo ?? true,
        };
    }

    async createProducto(producto: CreateProductoDto): Promise<BaseResponseDto<Productos>> {
        try {
            // 1. Validar que el tipo de producto existe y está activo
            const tipoProductoResponse = await this.tipoProductoService.getTipoProductoById(
                producto.idTipoProducto
            );

            if (!tipoProductoResponse.success || !tipoProductoResponse.data) {
                return new BaseResponseDto<Productos>(
                    false,
                    `Tipo de producto con ID ${producto.idTipoProducto} no encontrado`,
                    undefined,
                    null,
                    HttpStatus.NOT_FOUND,
                );
            }

            if (!tipoProductoResponse.data.activo) {
                return new BaseResponseDto<Productos>(
                    false,
                    `El tipo de producto "${tipoProductoResponse.data.nombreTipo}" no está activo`,
                    undefined,
                    null,
                    HttpStatus.BAD_REQUEST,
                );
            }

            // Validaremos duplicados y codigo existente
            const existingProducto = await this.productosRepository.findOne({
                where: [
                    { nombreProducto: producto.nombreProducto },
                    { codigoProducto: producto.codigoProducto }
                ]
            });

            if (existingProducto) {
                const campo = existingProducto.nombreProducto === producto.nombreProducto ? 'nombre' : 'código';
                return new BaseResponseDto<Productos>(
                    false,
                    `Ya existe un producto con ese ${campo}: "${existingProducto.nombreProducto === producto.nombreProducto ? producto.nombreProducto : producto.codigoProducto}"`,
                    undefined,
                    null,
                    HttpStatus.CONFLICT,
                );
            }

            // 3. Crear y guardar usando el mapeo (las validaciones de stocks/precios las hace el DTO)
            const datosProducto = this.mapDtoToEntity(producto);
            const nuevoProducto = this.productosRepository.create(datosProducto);
            const productoGuardado = await this.productosRepository.save(nuevoProducto);

            return new BaseResponseDto<Productos>(
                true,
                'Producto creado exitosamente',
                productoGuardado,
                null,
                HttpStatus.CREATED,
            );
        } catch (error) {
            return new BaseResponseDto<Productos>(
                false,
                'Error al crear el producto',
                undefined,
                error.message || error,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
    async getProductos(): Promise<BaseResponseDto<Productos[]>> {
        
        try {
            const productos = await this.productosRepository.find();
            return new BaseResponseDto<Productos[]>(
                true,
                'Productos cargados exitosamente',
                productos,
                null,
                HttpStatus.OK,
            );
        } catch (error) {
            return new BaseResponseDto<any>(
                false,
                'Error al cargar los productos',
                undefined,
                error.message || error,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }

    }

    async getProductosActivos(): Promise<BaseResponseDto<Productos[]>> {
        try {
            const productosActivos = await this.productosRepository.find({ where: { activo: true } });
            return new BaseResponseDto<Productos[]>(
                true,
                'Productos activos cargados exitosamente',
                productosActivos,
                null,
                HttpStatus.OK,
            );
        } catch (error) {
             return new BaseResponseDto<any>(
                false,
                'Error al cargar los productos',
                undefined,
                error.message || error,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
    async getProductoByName(name: string): Promise<BaseResponseDto<Productos>> {
        try {
            const producto = await this.productosRepository.findOne({ where: { nombreProducto: name } });
            if(!producto){
                return new BaseResponseDto<Productos>(
                    false,
                    `Producto con nombre ${name} no encontrado`,
                    undefined,
                    null,
                    HttpStatus.NOT_FOUND,
                );
            }

            return new BaseResponseDto<Productos>(
                true,
                'Producto encontrado exitosamente',
                producto,
                null,
                HttpStatus.OK,
            );
        } catch (error) {

                return new BaseResponseDto<any>(
                false,
                'Error al obtener el producto',
                undefined,
                error.message || error,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async updateProducto(id: string, producto: CreateProductoDto): Promise<BaseResponseDto<Productos | null>> {
       try {
            // 1. Verificar que el producto a actualizar existe
            const productoExistente = await this.productosRepository.findOne({ 
                where: { idProducto: id } 
            });

            if (!productoExistente) {
                return new BaseResponseDto<Productos>(
                    false,
                    `Producto con ID ${id} no encontrado`,
                    undefined,
                    null,
                    HttpStatus.NOT_FOUND,
                );
            }

            // 2. Validar que el tipo de producto existe y está activo
            const tipoProductoResponse = await this.tipoProductoService.getTipoProductoById(
                producto.idTipoProducto
            );

            if (!tipoProductoResponse.success || !tipoProductoResponse.data) {
                return new BaseResponseDto<Productos>(
                    false,
                    `Tipo de producto con ID ${producto.idTipoProducto} no encontrado`,
                    undefined,
                    null,
                    HttpStatus.NOT_FOUND,
                );
            }

            if (!tipoProductoResponse.data.activo) {
                return new BaseResponseDto<Productos>(
                    false,
                    `El tipo de producto "${tipoProductoResponse.data.nombreTipo}" no está activo`,
                    undefined,
                    null,
                    HttpStatus.BAD_REQUEST,
                );
            }

            // 3. Validar duplicados (excluyendo el producto actual)
            const duplicadoNombre = await this.productosRepository.findOne({
                where: { nombreProducto: producto.nombreProducto }
            });

            if (duplicadoNombre && duplicadoNombre.idProducto !== id) {
                return new BaseResponseDto<Productos>(
                    false,
                    `Ya existe otro producto con el nombre: "${producto.nombreProducto}"`,
                    undefined,
                    null,
                    HttpStatus.CONFLICT,
                );
            }

            const codigoGenerado = this.createCodeProducto(producto.nombreProducto);
            const duplicadoCodigo = await this.productosRepository.findOne({
                where: { codigoProducto: codigoGenerado }
            });

            if (duplicadoCodigo && duplicadoCodigo.idProducto !== id) {
                return new BaseResponseDto<Productos>(
                    false,
                    `Ya existe otro producto con código similar: "${codigoGenerado}"`,
                    undefined,
                    null,
                    HttpStatus.CONFLICT,
                );
            }

            // 4. Actualizar y guardar usando el mapeo
            const datosProducto = this.mapDtoToEntity(producto);
            await this.productosRepository.update(id, datosProducto);
            const productoActualizado = await this.productosRepository.findOne({ 
                where: { idProducto: id },
                relations: ['tipoProducto']
            });

            return new BaseResponseDto<Productos>(
                true,
                'Producto actualizado exitosamente',
                productoActualizado ?? undefined,
                null,
                HttpStatus.OK,
            );
        } catch (error) {
            return new BaseResponseDto<Productos>(
                false,
                'Error al actualizar el producto',
                undefined,
                error.message || error,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async deleteLogicalProducto(id: string): Promise<BaseResponseDto<null>> {
        try {
            const producto = await this.productosRepository.findOne({ 
                where: { idProducto: id } 
            });

            if (!producto) {
                return new BaseResponseDto<null>(
                    false,
                    `Producto con ID ${id} no encontrado`,
                    undefined,
                    null,
                    HttpStatus.NOT_FOUND,
                );
            }

            if (!producto.activo) {
                return new BaseResponseDto<null>(
                    false,
                    `El producto "${producto.nombreProducto}" ya está inactivo`,
                    undefined,
                    null,
                    HttpStatus.BAD_REQUEST,
                );
            }

            producto.activo = false;
            await this.productosRepository.save(producto);

            return new BaseResponseDto<null>(
                true,
                'Producto eliminado lógicamente',
                null,
                null,
                HttpStatus.OK,
            );
        } catch (error) {
            return new BaseResponseDto<null>(
                false,
                'Error al eliminar el producto',
                undefined,
                error.message || error,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async activateProducto(id: string): Promise<BaseResponseDto<Productos>> {
        try {
            const producto = await this.productosRepository.findOne({ 
                where: { idProducto: id },
                relations: ['tipoProducto']
            });

            if (!producto) {
                return new BaseResponseDto<Productos>(
                    false,
                    `Producto con ID ${id} no encontrado`,
                    undefined,
                    null,
                    HttpStatus.NOT_FOUND,
                );
            }

            if (producto.activo) {
                return new BaseResponseDto<Productos>(
                    false,
                    `El producto "${producto.nombreProducto}" ya está activo`,
                    undefined,
                    null,
                    HttpStatus.BAD_REQUEST,
                );
            }

            producto.activo = true;
            const productoActivado = await this.productosRepository.save(producto);

            return new BaseResponseDto<Productos>(
                true,
                'Producto activado exitosamente',
                productoActivado,
                null,
                HttpStatus.OK,
            );
        } catch (error) {
            return new BaseResponseDto<Productos>(
                false,
                'Error al activar el producto',
                undefined,
                error.message || error,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async hardDeleteProducto(id: string): Promise<BaseResponseDto<null>> {
        try {
            const producto = await this.productosRepository.findOne({ 
                where: { idProducto: id } 
            });

            if (!producto) {
                return new BaseResponseDto<null>(
                    false,
                    `Producto con ID ${id} no encontrado`,
                    undefined,
                    null,
                    HttpStatus.NOT_FOUND,
                );
            }

            await this.productosRepository.remove(producto);

            return new BaseResponseDto<null>(
                true,
                'Producto eliminado permanentemente',
                null,
                null,
                HttpStatus.OK,
            );
        } catch (error) {
            return new BaseResponseDto<null>(
                false,
                'Error al eliminar permanentemente el producto',
                undefined,
                error.message || error,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
