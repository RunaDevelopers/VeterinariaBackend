import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTipoProductoDto } from 'src/DTO';
import { BaseResponseDto } from 'src/DTO/baseResponse/baseResponse.dto';
import { TipoProducto } from 'src/entities';
import { TipoProductoInterface } from 'src/interfaces';

@Injectable()
export class TipoProductoService implements TipoProductoInterface {
    constructor(
        @InjectRepository(TipoProducto)
        private readonly tipoProductoRepository: Repository<TipoProducto>,
    ) { }

    async createTipoProducto(
        producto: CreateTipoProductoDto,
    ): Promise<BaseResponseDto<TipoProducto>> {
        try {
            // Verificar si el nombre ya existe
            const existingTipoProducto = await this.tipoProductoRepository.findOne({
                where: { nombreTipo: producto.nombreTipo },
            });

            if (existingTipoProducto) {
                return new BaseResponseDto<TipoProducto>(
                    false,
                    `El tipo de producto "${producto.nombreTipo}" ya existe`,
                    undefined,
                    null,
                    HttpStatus.CONFLICT,
                );
            }

            const nuevoTipoProducto = this.tipoProductoRepository.create(producto);
            const tipoProductoGuardado =
                await this.tipoProductoRepository.save(nuevoTipoProducto);

            return new BaseResponseDto<TipoProducto>(
                true,
                'Tipo de producto creado exitosamente',
                tipoProductoGuardado,
                null,
                HttpStatus.CREATED,
            );
        } catch (error) {
            return new BaseResponseDto<TipoProducto>(
                false,
                'Error al crear el tipo de producto',
                undefined,
                error,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    /**
     * Obtener todos los tipos de producto
     */
    async getTipoProductos(): Promise<BaseResponseDto<TipoProducto[]>> {
        try {
            const tiposProducto = await this.tipoProductoRepository.find({
                order: {
                    nombreTipo: 'ASC',
                },
            });

            return new BaseResponseDto<TipoProducto[]>(
                true,
                'Lista de tipos de producto cargada exitosamente',
                tiposProducto,
                null,
                HttpStatus.OK,
            );
        } catch (error) {
            return new BaseResponseDto<TipoProducto[]>(
                false,
                'Error al obtener los tipos de producto',
                undefined,
                error,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    /**
     * Obtener tipos de producto activos
     */
    async getTipoProductosActivos(): Promise<BaseResponseDto<TipoProducto[]>> {
        try {
            const tiposProducto = await this.tipoProductoRepository.find({
                where: { activo: true },
                order: {
                    nombreTipo: 'ASC',
                },
            });

            return new BaseResponseDto<TipoProducto[]>(
                true,
                'Tipos de producto activos cargados exitosamente',
                tiposProducto,
                null,
                HttpStatus.OK,
            );
        } catch (error) {
            return new BaseResponseDto<TipoProducto[]>(
                false,
                'Error al obtener los tipos de producto activos',
                undefined,
                error,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    /**
     * Obtener un tipo de producto por nombre
     */
    async getTipoProductoByName(
        name: string,
    ): Promise<BaseResponseDto<TipoProducto>> {
        try {
            const tipoProducto = await this.tipoProductoRepository.findOne({
                where: { nombreTipo: name },
            });

            if (!tipoProducto) {
                return new BaseResponseDto<TipoProducto>(
                    false,
                    `Tipo de producto con nombre "${name}" no encontrado`,
                    undefined,
                    null,
                    HttpStatus.NOT_FOUND,
                );
            }

            return new BaseResponseDto<TipoProducto>(
                true,
                'Tipo de producto encontrado exitosamente',
                tipoProducto,
                null,
                HttpStatus.OK,
            );
        } catch (error) {
            return new BaseResponseDto<TipoProducto>(
                false,
                'Error al buscar el tipo de producto por nombre',
                undefined,
                error,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    /**
     * Obtener un tipo de producto por ID
     */
    async getTipoProductoById(
        id: string,
    ): Promise<BaseResponseDto<TipoProducto>> {
        try {
            const tipoProducto = await this.tipoProductoRepository.findOne({
                where: { idTipoProducto: id },
                relations: ['productos'],
            });

            if (!tipoProducto) {
                return new BaseResponseDto<TipoProducto>(
                    false,
                    `Tipo de producto con ID ${id} no encontrado`,
                    undefined,
                    null,
                    HttpStatus.NOT_FOUND,
                );
            }

            return new BaseResponseDto<TipoProducto>(
                true,
                'Tipo de producto encontrado exitosamente',
                tipoProducto,
                null,
                HttpStatus.OK,
            );
        } catch (error) {
            return new BaseResponseDto<TipoProducto>(
                false,
                'Error al obtener el tipo de producto',
                undefined,
                error,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    /**
     * Actualizar un tipo de producto
     */
    async updateTipoProducto(
        id: string,
        producto: CreateTipoProductoDto,
    ): Promise<BaseResponseDto<TipoProducto>> {
        try {
            // Verificar que el tipo de producto existe
            const tipoProductoResponse = await this.getTipoProductoById(id);
            if (!tipoProductoResponse.success) {
                return tipoProductoResponse;
            }

            const tipoProducto = tipoProductoResponse.data;

            // Si se está actualizando el nombre, verificar que no exista otro con ese nombre
            if (
                producto.nombreTipo &&
                producto.nombreTipo !== tipoProducto.nombreTipo
            ) {
                const existingTipoProducto = await this.tipoProductoRepository.findOne({
                    where: { nombreTipo: producto.nombreTipo },
                });

                if (existingTipoProducto) {
                    return new BaseResponseDto<TipoProducto>(
                        false,
                        `Ya existe otro tipo de producto con el nombre "${producto.nombreTipo}"`,
                        undefined,
                        null,
                        HttpStatus.CONFLICT,
                    );
                }
            }

            // Actualizar los campos
            Object.assign(tipoProducto, producto);
            const tipoProductoActualizado =
                await this.tipoProductoRepository.save(tipoProducto);

            return new BaseResponseDto<TipoProducto>(
                true,
                'Tipo de producto actualizado exitosamente',
                tipoProductoActualizado,
                null,
                HttpStatus.OK,
            );
        } catch (error) {
            return new BaseResponseDto<TipoProducto>(
                false,
                'Error al actualizar el tipo de producto',
                undefined,
                error,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    /**
     * Eliminar un tipo de producto (eliminación lógica)
     */
    async deleteTipoProducto(id: string): Promise<BaseResponseDto<null>> {
        try {
            const tipoProductoResponse = await this.getTipoProductoById(id);
            if (!tipoProductoResponse.success) {
                return new BaseResponseDto<null>(
                    false,
                    tipoProductoResponse.message,
                    null,
                    null,
                    tipoProductoResponse.statusCode,
                );
            }

            const tipoProducto = tipoProductoResponse.data;

            // Verificar si tiene productos asociados
            if (tipoProducto.productos && tipoProducto.productos.length > 0) {
                return new BaseResponseDto<null>(
                    false,
                    `No se puede eliminar el tipo de producto "${tipoProducto.nombreTipo}" porque tiene ${tipoProducto.productos.length} producto(s) asociado(s)`,
                    null,
                    null,
                    HttpStatus.CONFLICT,
                );
            }

            // Eliminación lógica
            tipoProducto.activo = false;
            await this.tipoProductoRepository.save(tipoProducto);

            return new BaseResponseDto<null>(
                true,
                `Tipo de producto "${tipoProducto.nombreTipo}" desactivado exitosamente`,
                null,
                null,
                HttpStatus.OK,
            );
        } catch (error) {
            return new BaseResponseDto<null>(
                false,
                'Error al eliminar el tipo de producto',
                null,
                error,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    /**
     * Reactivar un tipo de producto
     */
    async activateTipoProducto(id: string): Promise<BaseResponseDto<TipoProducto>> {
        try {
            const tipoProductoResponse = await this.getTipoProductoById(id);
            if (!tipoProductoResponse.success) {
                return tipoProductoResponse;
            }

            const tipoProducto = tipoProductoResponse.data;

            if (tipoProducto.activo) {
                return new BaseResponseDto<TipoProducto>(
                    false,
                    'El tipo de producto ya está activo',
                    undefined,
                    null,
                    HttpStatus.CONFLICT,
                );
            }

            tipoProducto.activo = true;
            const tipoProductoActivado =
                await this.tipoProductoRepository.save(tipoProducto);

            return new BaseResponseDto<TipoProducto>(
                true,
                'Tipo de producto activado exitosamente',
                tipoProductoActivado,
                null,
                HttpStatus.OK,
            );
        } catch (error) {
            return new BaseResponseDto<TipoProducto>(
                false,
                'Error al activar el tipo de producto',
                undefined,
                error,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    /**
     * Eliminar permanentemente un tipo de producto
     */
    async hardDeleteTipoProducto(id: string): Promise<BaseResponseDto<null>> {
        try {
            const tipoProductoResponse = await this.getTipoProductoById(id);
            if (!tipoProductoResponse.success) {
                return new BaseResponseDto<null>(
                    false,
                    tipoProductoResponse.message,
                    null,
                    null,
                    tipoProductoResponse.statusCode,
                );
            }

            const tipoProducto = tipoProductoResponse.data;

            // Verificar si tiene productos asociados
            if (tipoProducto.productos && tipoProducto.productos.length > 0) {
                return new BaseResponseDto<null>(
                    false,
                    `No se puede eliminar permanentemente el tipo de producto "${tipoProducto.nombreTipo}" porque tiene productos asociados`,
                    null,
                    null,
                    HttpStatus.CONFLICT,
                );
            }

            await this.tipoProductoRepository.remove(tipoProducto);

            return new BaseResponseDto<null>(
                true,
                `Tipo de producto "${tipoProducto.nombreTipo}" eliminado permanentemente`,
                null,
                null,
                HttpStatus.OK,
            );
        } catch (error) {
            return new BaseResponseDto<null>(
                false,
                'Error al eliminar permanentemente el tipo de producto',
                null,
                error,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
