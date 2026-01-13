import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Clientes } from 'src/entities';
import { Repository } from 'typeorm';
import { CreateClienteDto } from 'src/DTO';
import { BaseResponseDto } from 'src/DTO/baseResponse/baseResponse.dto';
import { ClienteInterface } from 'src/interfaces/cliente.interface';

@Injectable()
export class ClientesService implements ClienteInterface {
    constructor(
        @InjectRepository(Clientes)
        private readonly clientesRepository: Repository<Clientes>,
    ) { }

    async registrarCliente(cliente: CreateClienteDto): Promise<BaseResponseDto<Clientes>> {
        try {
            // Validar duplicado por documento de identidad si se proporciona
            if (cliente.documentoIdentidad) {
                const existente = await this.clientesRepository.findOne({
                    where: { documentoIdentidad: cliente.documentoIdentidad },
                });

                if (existente) {
                    return new BaseResponseDto<Clientes>(
                        false,
                        `Ya existe un cliente con el documento de identidad: ${cliente.documentoIdentidad}`,
                        undefined,
                        null,
                        HttpStatus.CONFLICT,
                    );
                }
            }

            const nuevoCliente = this.clientesRepository.create(cliente);
            const clienteGuardado = await this.clientesRepository.save(nuevoCliente);

            return new BaseResponseDto<Clientes>(
                true,
                'Cliente registrado exitosamente',
                clienteGuardado,
                null,
                HttpStatus.CREATED,
            );
        } catch (error) {
            return new BaseResponseDto<Clientes>(
                false,
                'Error al registrar el cliente',
                undefined,
                error.message || error,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async buscarCliente(): Promise<BaseResponseDto<Clientes[]>> {
        try {
            const clientes = await this.clientesRepository.find({
                relations: ['mascotas'],
                order: { nombres: 'ASC' },
            });

            return new BaseResponseDto<Clientes[]>(
                true,
                'Clientes cargados exitosamente',
                clientes,
                null,
                HttpStatus.OK,
            );
        } catch (error) {
            return new BaseResponseDto<Clientes[]>(
                false,
                'Error al buscar clientes',
                undefined,
                error.message || error,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async buscarClienteActivos(): Promise<BaseResponseDto<Clientes[]>> {
        try {
            const clientes = await this.clientesRepository.find({
                where: { activo: true },
                relations: ['mascotas'],
                order: { nombres: 'ASC' },
            });

            return new BaseResponseDto<Clientes[]>(
                true,
                'Clientes activos cargados exitosamente',
                clientes,
                null,
                HttpStatus.OK,
            );
        } catch (error) {
            return new BaseResponseDto<Clientes[]>(
                false,
                'Error al buscar clientes activos',
                undefined,
                error.message || error,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async buscarClientePorId(id: string): Promise<BaseResponseDto<Clientes>> {
        try {
            const cliente = await this.clientesRepository.findOne({
                where: { idCliente: id },
                relations: ['mascotas'],
            });

            if (!cliente) {
                return new BaseResponseDto<Clientes>(
                    false,
                    `Cliente con ID ${id} no encontrado`,
                    undefined,
                    null,
                    HttpStatus.NOT_FOUND,
                );
            }

            return new BaseResponseDto<Clientes>(
                true,
                'Cliente encontrado exitosamente',
                cliente,
                null,
                HttpStatus.OK,
            );
        } catch (error) {
            return new BaseResponseDto<Clientes>(
                false,
                'Error al buscar el cliente',
                undefined,
                error.message || error,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async buscarClientePorDni(dni: string): Promise<BaseResponseDto<Clientes>> {
        try {
            const cliente = await this.clientesRepository.findOne({
                where: { documentoIdentidad: dni },
                relations: ['mascotas'],
            });

            if (!cliente) {
                return new BaseResponseDto<Clientes>(
                    false,
                    `Cliente con documento ${dni} no encontrado`,
                    undefined,
                    null,
                    HttpStatus.NOT_FOUND,
                );
            }

            return new BaseResponseDto<Clientes>(
                true,
                'Cliente encontrado exitosamente',
                cliente,
                null,
                HttpStatus.OK,
            );
        } catch (error) {
            return new BaseResponseDto<Clientes>(
                false,
                'Error al buscar el cliente',
                undefined,
                error.message || error,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async actualizarCliente(id: string, cliente: CreateClienteDto): Promise<BaseResponseDto<Clientes>> {
        try {
            const clienteExistente = await this.clientesRepository.findOne({
                where: { idCliente: id },
            });

            if (!clienteExistente) {
                return new BaseResponseDto<Clientes>(
                    false,
                    `Cliente con ID ${id} no encontrado`,
                    undefined,
                    null,
                    HttpStatus.NOT_FOUND,
                );
            }

            // Validar duplicado de documento (excluyendo el cliente actual)
            if (cliente.documentoIdentidad && cliente.documentoIdentidad !== clienteExistente.documentoIdentidad) {
                const clienteConMismoDocumento = await this.clientesRepository.findOne({
                    where: { documentoIdentidad: cliente.documentoIdentidad },
                });

                if (clienteConMismoDocumento) {
                    return new BaseResponseDto<Clientes>(
                        false,
                        `Ya existe otro cliente con el documento de identidad: ${cliente.documentoIdentidad}`,
                        undefined,
                        null,
                        HttpStatus.CONFLICT,
                    );
                }
            }

            const clienteActualizado = this.clientesRepository.merge(clienteExistente, {
                ...cliente,
                fechaModificacion: new Date(),
            });
            const clienteGuardado = await this.clientesRepository.save(clienteActualizado);

            return new BaseResponseDto<Clientes>(
                true,
                'Cliente actualizado exitosamente',
                clienteGuardado,
                null,
                HttpStatus.OK,
            );
        } catch (error) {
            return new BaseResponseDto<Clientes>(
                false,
                'Error al actualizar el cliente',
                undefined,
                error.message || error,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async eliminarClienteLogico(id: string): Promise<BaseResponseDto<null>> {
        try {
            const cliente = await this.clientesRepository.findOne({
                where: { idCliente: id },
            });

            if (!cliente) {
                return new BaseResponseDto<null>(
                    false,
                    `Cliente con ID ${id} no encontrado`,
                    undefined,
                    null,
                    HttpStatus.NOT_FOUND,
                );
            }

            if (!cliente.activo) {
                return new BaseResponseDto<null>(
                    false,
                    `El cliente "${cliente.nombres} ${cliente.apellidos}" ya está inactivo`,
                    undefined,
                    null,
                    HttpStatus.BAD_REQUEST,
                );
            }

            cliente.activo = false;
            cliente.fechaModificacion = new Date();
            await this.clientesRepository.save(cliente);

            return new BaseResponseDto<null>(
                true,
                'Cliente eliminado lógicamente',
                null,
                null,
                HttpStatus.OK,
            );
        } catch (error) {
            return new BaseResponseDto<null>(
                false,
                'Error al eliminar el cliente',
                undefined,
                error.message || error,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async activarCliente(id: string): Promise<BaseResponseDto<Clientes>> {
        try {
            const cliente = await this.clientesRepository.findOne({
                where: { idCliente: id },
                relations: ['mascotas'],
            });

            if (!cliente) {
                return new BaseResponseDto<Clientes>(
                    false,
                    `Cliente con ID ${id} no encontrado`,
                    undefined,
                    null,
                    HttpStatus.NOT_FOUND,
                );
            }

            if (cliente.activo) {
                return new BaseResponseDto<Clientes>(
                    false,
                    `El cliente "${cliente.nombres} ${cliente.apellidos}" ya está activo`,
                    undefined,
                    null,
                    HttpStatus.BAD_REQUEST,
                );
            }

            cliente.activo = true;
            cliente.fechaModificacion = new Date();
            const clienteActivado = await this.clientesRepository.save(cliente);

            return new BaseResponseDto<Clientes>(
                true,
                'Cliente activado exitosamente',
                clienteActivado,
                null,
                HttpStatus.OK,
            );
        } catch (error) {
            return new BaseResponseDto<Clientes>(
                false,
                'Error al activar el cliente',
                undefined,
                error.message || error,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
