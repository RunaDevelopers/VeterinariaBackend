import { BadRequestException, HttpCode, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Clientes } from 'src/entities';
import { Repository } from 'typeorm';
import { CreateClienteDto } from 'src/DTO';
import { BaseResponseDto } from 'src/DTO/baseResponse/baseResponse.dto';
import { ClienteInterface } from 'src/interfaces/cliente.interface';

@Injectable()
export class ClientesService implements ClienteInterface {

    constructor(@InjectRepository(Clientes) private clientesRepository: Repository<Clientes>) { }

    async registrarCliente(cliente: CreateClienteDto): Promise<BaseResponseDto<Clientes>> {
        try {
            if (!cliente) {
                throw new BadRequestException(HttpStatus.BAD_REQUEST, 'Los datos del cliente son obligatorios');
            }
            const nuevoCliente = this.clientesRepository.create(cliente);
            const clienteGuardado = await this.clientesRepository.save(nuevoCliente);
            return new BaseResponseDto<Clientes>(true, 'Cliente registrado exitosamente', clienteGuardado);
        } catch (error) {
            throw new BadRequestException(404, 'Error al registrar el cliente');
        }
    }

    async buscarCliente(): Promise<BaseResponseDto<Clientes[]>> {
        try {
            const clientes = await this.clientesRepository.find();
            if (!clientes || clientes.length === 0) {
                throw new BadRequestException(HttpStatus.NOT_FOUND, 'No se encontraron clientes');
            }
            return new BaseResponseDto<Clientes[]>(true, 'Clientes encontrados exitosamente', clientes);
        } catch (error) {
            throw new BadRequestException(HttpStatus.INTERNAL_SERVER_ERROR, 'Error al buscar clientes');
        }
    }

    async buscarClientePorDni(dni: string): Promise<BaseResponseDto<Clientes>> {
        try {
            const cliente = await this.clientesRepository.findOne({ where: { documentoIdentidad: dni } });
            if (!cliente) {
                throw new BadRequestException(HttpStatus.NOT_FOUND, 'Cliente no encontrado');
            }
            return new BaseResponseDto<Clientes>(true, 'Cliente encontrado exitosamente', cliente);
        } catch (error) {
            throw new BadRequestException(HttpStatus.INTERNAL_SERVER_ERROR, 'Error al buscar el cliente');
        }
    }

    async actualizarCliente(id: string, cliente: CreateClienteDto): Promise<BaseResponseDto<Clientes>> {
        try {
            const clienteExistente = await this.clientesRepository.findOne({
                where: { idCliente: id }
            });
            if (!clienteExistente) {
                throw new BadRequestException(HttpStatus.NOT_FOUND, 'Cliente no encontrado');
            }
            if (cliente.documentoIdentidad && cliente.documentoIdentidad !== clienteExistente.documentoIdentidad) {
                const clienteConMismoDocumento = await this.clientesRepository.findOne({
                    where: { documentoIdentidad: cliente.documentoIdentidad }
                });
                if (clienteConMismoDocumento) {
                    throw new BadRequestException(
                        HttpStatus.CONFLICT,
                        'Ya existe un cliente con ese documento de identidad'
                    );
                }
            }
            const clienteActualizado = this.clientesRepository.merge(clienteExistente, {
                ...cliente,
                fechaModificacion: new Date()
            });
            const clienteGuardado = await this.clientesRepository.save(clienteActualizado);

            return new BaseResponseDto<Clientes>(
                true,
                'Cliente actualizado exitosamente',
                clienteGuardado
            );
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw error;
            }
            throw new BadRequestException(
                HttpStatus.INTERNAL_SERVER_ERROR,
                'Error al actualizar el cliente'
            );
        }
    }

    async eliminarClienteLogico(id: string): Promise<BaseResponseDto<null>> {
        try {
            const cliente = await this.clientesRepository.findOne({ where: { idCliente: id } });
            if (!cliente) {
                throw new BadRequestException(HttpStatus.NOT_FOUND, 'Cliente no encontrado');
            }
            const nuevoCliente = { ...cliente, activo: false };
            await this.clientesRepository.save(nuevoCliente);
            return new BaseResponseDto<null>(true, 'Cliente eliminado exitosamente', null);
        } catch (error) {
            throw new BadRequestException(HttpStatus.INTERNAL_SERVER_ERROR, 'Error al eliminar el cliente');
        }
    }

}
