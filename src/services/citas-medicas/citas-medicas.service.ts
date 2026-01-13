import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CitasMedicas } from 'src/entities';
import { CreateCitaMedicaDto } from 'src/DTO/citas-medicas/create-cita-medica.dto';
import { UpdateCitaMedicaDto } from 'src/DTO/citas-medicas/update-cita-medica.dto';
import { BaseResponseDto } from 'src/DTO/baseResponse/baseResponse.dto';
import { CitaMedicaInterface } from 'src/interfaces/cita-medica.interface';
import { ClientesService } from '../clientes/clientes.service';
import { MascotasService } from '../mascotas/mascotas.service';

@Injectable()
export class CitasMedicasService implements CitaMedicaInterface {
    constructor(
        @InjectRepository(CitasMedicas)
        private readonly citasMedicasRepository: Repository<CitasMedicas>,
        private readonly clientesService: ClientesService,
        private readonly mascotasService: MascotasService,
    ) { }

    /**
     * Crear una nueva cita médica
     * Valida que exista el cliente (a través de la mascota) y la mascota
     */
    async createCitaMedica(cita: CreateCitaMedicaDto): Promise<BaseResponseDto<CitasMedicas>> {
        try {
            // 1. Validar que la mascota existe
            const mascotaResponse = await this.mascotasService.getMascotaById(cita.idMascota);

            if (!mascotaResponse.success || !mascotaResponse.data) {
                return new BaseResponseDto<CitasMedicas>(
                    false,
                    `Mascota con ID ${cita.idMascota} no encontrada`,
                    undefined,
                    null,
                    HttpStatus.NOT_FOUND,
                );
            }

            const mascota = mascotaResponse.data;

            // 2. Validar que la mascota esté activa
            if (!mascota.activo) {
                return new BaseResponseDto<CitasMedicas>(
                    false,
                    `La mascota "${mascota.nombre}" no está activa`,
                    undefined,
                    null,
                    HttpStatus.BAD_REQUEST,
                );
            }

            // 3. Obtener el cliente a través de la mascota
            const clienteId = mascota.idCliente2?.idCliente;
            if (!clienteId) {
                return new BaseResponseDto<CitasMedicas>(
                    false,
                    `La mascota no tiene un cliente asociado`,
                    undefined,
                    null,
                    HttpStatus.BAD_REQUEST,
                );
            }

            // 4. Validar que el cliente existe y está activo
            const clienteResponse = await this.clientesService.buscarClientePorId(clienteId);
            if (!clienteResponse.success || !clienteResponse.data) {
                return new BaseResponseDto<CitasMedicas>(
                    false,
                    `Cliente con ID ${clienteId} no encontrado`,
                    undefined,
                    null,
                    HttpStatus.NOT_FOUND,
                );
            }

            if (!clienteResponse.data.activo) {
                return new BaseResponseDto<CitasMedicas>(
                    false,
                    `El cliente no está activo`,
                    undefined,
                    null,
                    HttpStatus.BAD_REQUEST,
                );
            }

            // 5. Validar que no haya otra cita en el mismo horario para el veterinario
            const citaExistente = await this.citasMedicasRepository.findOne({
                where: {
                    idVeterinario: cita.idVeterinario,
                    fechaCita: cita.fechaCita,
                    horaInicio: cita.horaInicio,
                    estado: 'PROGRAMADA',
                },
            });

            if (citaExistente) {
                return new BaseResponseDto<CitasMedicas>(
                    false,
                    `Ya existe una cita programada para el veterinario en ese horario`,
                    undefined,
                    null,
                    HttpStatus.CONFLICT,
                );
            }

            // 6. Crear la cita médica
            const nuevaCita = this.citasMedicasRepository.create({
                idMascota: cita.idMascota,
                idVeterinario: cita.idVeterinario,
                fechaCita: cita.fechaCita,
                horaInicio: cita.horaInicio,
                horaFin: cita.horaFin,
                estado: cita.estado || 'PROGRAMADA',
                motivoConsulta: cita.motivoConsulta,
                prioridad: cita.prioridad || 'NORMAL',
                notasPreparacion: cita.notasPreparacion,
                idCliente: { idCliente: clienteId } as any,
                idReserva: cita.idReserva ? { idReserva: cita.idReserva } as any : null,
                idTipoServicio: cita.idTipoServicio ? { idTipoServicio: cita.idTipoServicio } as any : null,
            });

            const citaGuardada = await this.citasMedicasRepository.save(nuevaCita);

            // 7. Obtener la cita con todas sus relaciones
            const citaCompleta = await this.citasMedicasRepository.findOne({
                where: { idCita: citaGuardada.idCita },
                relations: ['idCliente', 'idMascota2', 'idVeterinario2', 'idTipoServicio'],
            });

            return new BaseResponseDto<CitasMedicas>(
                true,
                'Cita médica creada exitosamente',
                citaCompleta || undefined,
                null,
                HttpStatus.CREATED,
            );
        } catch (error) {
            return new BaseResponseDto<CitasMedicas>(
                false,
                'Error al crear la cita médica',
                undefined,
                error.message || error,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    /**
     * Obtener todas las citas médicas
     */
    async getCitasMedicas(): Promise<BaseResponseDto<CitasMedicas[]>> {
        try {
            const citas = await this.citasMedicasRepository.find({
                relations: ['idCliente', 'idMascota2', 'idVeterinario2', 'idTipoServicio', 'idReserva'],
                order: {
                    fechaCita: 'DESC',
                    horaInicio: 'DESC',
                },
            });

            return new BaseResponseDto<CitasMedicas[]>(
                true,
                'Citas médicas obtenidas exitosamente',
                citas,
                null,
                HttpStatus.OK,
            );
        } catch (error) {
            return new BaseResponseDto<CitasMedicas[]>(
                false,
                'Error al obtener las citas médicas',
                undefined,
                error.message || error,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    /**
     * Obtener una cita médica por ID
     */
    async getCitaMedicaById(id: string): Promise<BaseResponseDto<CitasMedicas>> {
        try {
            const cita = await this.citasMedicasRepository.findOne({
                where: { idCita: id },
                relations: ['idCliente', 'idMascota2', 'idVeterinario2', 'idTipoServicio', 'idReserva'],
            });

            if (!cita) {
                return new BaseResponseDto<CitasMedicas>(
                    false,
                    `Cita médica con ID ${id} no encontrada`,
                    undefined,
                    null,
                    HttpStatus.NOT_FOUND,
                );
            }

            return new BaseResponseDto<CitasMedicas>(
                true,
                'Cita médica obtenida exitosamente',
                cita,
                null,
                HttpStatus.OK,
            );
        } catch (error) {
            return new BaseResponseDto<CitasMedicas>(
                false,
                'Error al obtener la cita médica',
                undefined,
                error.message || error,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    /**
     * Obtener citas por cliente
     */
    async getCitasByCliente(idCliente: string): Promise<BaseResponseDto<CitasMedicas[]>> {
        try {
            // Validar que el cliente existe
            const clienteResponse = await this.clientesService.buscarClientePorId(idCliente);
            if (!clienteResponse.success) {
                return new BaseResponseDto<CitasMedicas[]>(
                    false,
                    clienteResponse.message,
                    undefined,
                    null,
                    HttpStatus.NOT_FOUND,
                );
            }

            const citas = await this.citasMedicasRepository.find({
                where: { idCliente: { idCliente } as any },
                relations: ['idCliente', 'idMascota2', 'idVeterinario2', 'idTipoServicio'],
                order: {
                    fechaCita: 'DESC',
                    horaInicio: 'DESC',
                },
            });

            return new BaseResponseDto<CitasMedicas[]>(
                true,
                `Citas del cliente obtenidas exitosamente (${citas.length} encontradas)`,
                citas,
                null,
                HttpStatus.OK,
            );
        } catch (error) {
            return new BaseResponseDto<CitasMedicas[]>(
                false,
                'Error al obtener las citas del cliente',
                undefined,
                error.message || error,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    /**
     * Obtener citas por mascota
     */
    async getCitasByMascota(idMascota: string): Promise<BaseResponseDto<CitasMedicas[]>> {
        try {
            // Validar que la mascota existe
            const mascotaResponse = await this.mascotasService.getMascotaById(idMascota);
            if (!mascotaResponse.success) {
                return new BaseResponseDto<CitasMedicas[]>(
                    false,
                    mascotaResponse.message,
                    undefined,
                    null,
                    HttpStatus.NOT_FOUND,
                );
            }

            const citas = await this.citasMedicasRepository.find({
                where: { idMascota },
                relations: ['idCliente', 'idMascota2', 'idVeterinario2', 'idTipoServicio'],
                order: {
                    fechaCita: 'DESC',
                    horaInicio: 'DESC',
                },
            });

            return new BaseResponseDto<CitasMedicas[]>(
                true,
                `Citas de la mascota obtenidas exitosamente (${citas.length} encontradas)`,
                citas,
                null,
                HttpStatus.OK,
            );
        } catch (error) {
            return new BaseResponseDto<CitasMedicas[]>(
                false,
                'Error al obtener las citas de la mascota',
                undefined,
                error.message || error,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    /**
     * Obtener citas por veterinario
     */
    async getCitasByVeterinario(idVeterinario: string): Promise<BaseResponseDto<CitasMedicas[]>> {
        try {
            const citas = await this.citasMedicasRepository.find({
                where: { idVeterinario },
                relations: ['idCliente', 'idMascota2', 'idVeterinario2', 'idTipoServicio'],
                order: {
                    fechaCita: 'DESC',
                    horaInicio: 'DESC',
                },
            });

            return new BaseResponseDto<CitasMedicas[]>(
                true,
                `Citas del veterinario obtenidas exitosamente (${citas.length} encontradas)`,
                citas,
                null,
                HttpStatus.OK,
            );
        } catch (error) {
            return new BaseResponseDto<CitasMedicas[]>(
                false,
                'Error al obtener las citas del veterinario',
                undefined,
                error.message || error,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    /**
     * Obtener citas por estado
     */
    async getCitasByEstado(estado: string): Promise<BaseResponseDto<CitasMedicas[]>> {
        try {
            const estadosValidos = ['PROGRAMADA', 'CONFIRMADA', 'EN_CURSO', 'COMPLETADA', 'CANCELADA'];
            if (!estadosValidos.includes(estado.toUpperCase())) {
                return new BaseResponseDto<CitasMedicas[]>(
                    false,
                    `Estado inválido. Estados válidos: ${estadosValidos.join(', ')}`,
                    undefined,
                    null,
                    HttpStatus.BAD_REQUEST,
                );
            }

            const citas = await this.citasMedicasRepository.find({
                where: { estado: estado.toUpperCase() },
                relations: ['idCliente', 'idMascota2', 'idVeterinario2', 'idTipoServicio'],
                order: {
                    fechaCita: 'DESC',
                    horaInicio: 'DESC',
                },
            });

            return new BaseResponseDto<CitasMedicas[]>(
                true,
                `Citas con estado ${estado} obtenidas exitosamente (${citas.length} encontradas)`,
                citas,
                null,
                HttpStatus.OK,
            );
        } catch (error) {
            return new BaseResponseDto<CitasMedicas[]>(
                false,
                'Error al obtener las citas por estado',
                undefined,
                error.message || error,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    /**
     * Obtener citas por fecha
     */
    async getCitasByFecha(fecha: string): Promise<BaseResponseDto<CitasMedicas[]>> {
        try {
            const citas = await this.citasMedicasRepository.find({
                where: { fechaCita: fecha },
                relations: ['idCliente', 'idMascota2', 'idVeterinario2', 'idTipoServicio'],
                order: {
                    horaInicio: 'ASC',
                },
            });

            return new BaseResponseDto<CitasMedicas[]>(
                true,
                `Citas del día ${fecha} obtenidas exitosamente (${citas.length} encontradas)`,
                citas,
                null,
                HttpStatus.OK,
            );
        } catch (error) {
            return new BaseResponseDto<CitasMedicas[]>(
                false,
                'Error al obtener las citas por fecha',
                undefined,
                error.message || error,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    /**
     * Actualizar una cita médica
     */
    async updateCitaMedica(id: string, cita: UpdateCitaMedicaDto): Promise<BaseResponseDto<CitasMedicas>> {
        try {
            // 1. Verificar que la cita existe
            const citaExistente = await this.citasMedicasRepository.findOne({
                where: { idCita: id },
            });

            if (!citaExistente) {
                return new BaseResponseDto<CitasMedicas>(
                    false,
                    `Cita médica con ID ${id} no encontrada`,
                    undefined,
                    null,
                    HttpStatus.NOT_FOUND,
                );
            }

            // 2. Si se está actualizando la mascota, validar
            if (cita.idMascota && cita.idMascota !== citaExistente.idMascota) {
                const mascotaResponse = await this.mascotasService.getMascotaById(cita.idMascota);
                if (!mascotaResponse.success || !mascotaResponse.data) {
                    return new BaseResponseDto<CitasMedicas>(
                        false,
                        `Mascota con ID ${cita.idMascota} no encontrada`,
                        undefined,
                        null,
                        HttpStatus.NOT_FOUND,
                    );
                }

                if (!mascotaResponse.data.activo) {
                    return new BaseResponseDto<CitasMedicas>(
                        false,
                        `La mascota no está activa`,
                        undefined,
                        null,
                        HttpStatus.BAD_REQUEST,
                    );
                }
            }

            // 3. Validar conflicto de horarios si se actualiza fecha/hora
            if (
                (cita.fechaCita || cita.horaInicio || cita.idVeterinario) &&
                (cita.estado !== 'CANCELADA')
            ) {
                const nuevaFecha = cita.fechaCita || citaExistente.fechaCita;
                const nuevaHora = cita.horaInicio || citaExistente.horaInicio;
                const nuevoVeterinario = cita.idVeterinario || citaExistente.idVeterinario;

                const conflicto = await this.citasMedicasRepository.findOne({
                    where: {
                        idVeterinario: nuevoVeterinario,
                        fechaCita: nuevaFecha,
                        horaInicio: nuevaHora,
                        estado: 'PROGRAMADA',
                    },
                });

                if (conflicto && conflicto.idCita !== id) {
                    return new BaseResponseDto<CitasMedicas>(
                        false,
                        `Ya existe una cita programada para el veterinario en ese horario`,
                        undefined,
                        null,
                        HttpStatus.CONFLICT,
                    );
                }
            }

            // 4. Actualizar la cita
            const { idCliente, idReserva, idTipoServicio, ...updateData } = cita;
            await this.citasMedicasRepository.update(id, {
                ...updateData,
                fechaModificacion: new Date(),
            });

            // 5. Obtener la cita actualizada con relaciones
            const citaActualizada = await this.citasMedicasRepository.findOne({
                where: { idCita: id },
                relations: ['idCliente', 'idMascota2', 'idVeterinario2', 'idTipoServicio'],
            });

            return new BaseResponseDto<CitasMedicas>(
                true,
                'Cita médica actualizada exitosamente',
                citaActualizada || undefined,
                null,
                HttpStatus.OK,
            );
        } catch (error) {
            return new BaseResponseDto<CitasMedicas>(
                false,
                'Error al actualizar la cita médica',
                undefined,
                error.message || error,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    /**
     * Cancelar una cita médica
     */
    async cancelarCita(id: string, motivo?: string): Promise<BaseResponseDto<CitasMedicas>> {
        try {
            const citaExistente = await this.citasMedicasRepository.findOne({
                where: { idCita: id },
            });

            if (!citaExistente) {
                return new BaseResponseDto<CitasMedicas>(
                    false,
                    `Cita médica con ID ${id} no encontrada`,
                    undefined,
                    null,
                    HttpStatus.NOT_FOUND,
                );
            }

            if (citaExistente.estado === 'CANCELADA') {
                return new BaseResponseDto<CitasMedicas>(
                    false,
                    'La cita ya está cancelada',
                    undefined,
                    null,
                    HttpStatus.BAD_REQUEST,
                );
            }

            if (citaExistente.estado === 'COMPLETADA') {
                return new BaseResponseDto<CitasMedicas>(
                    false,
                    'No se puede cancelar una cita completada',
                    undefined,
                    null,
                    HttpStatus.BAD_REQUEST,
                );
            }

            await this.citasMedicasRepository.update(id, {
                estado: 'CANCELADA',
                motivoConsulta: motivo ? `CANCELADA - ${motivo}` : citaExistente.motivoConsulta,
                fechaModificacion: new Date(),
            });

            const citaCancelada = await this.citasMedicasRepository.findOne({
                where: { idCita: id },
                relations: ['idCliente', 'idMascota2', 'idVeterinario2', 'idTipoServicio'],
            });

            return new BaseResponseDto<CitasMedicas>(
                true,
                'Cita médica cancelada exitosamente',
                citaCancelada || undefined,
                null,
                HttpStatus.OK,
            );
        } catch (error) {
            return new BaseResponseDto<CitasMedicas>(
                false,
                'Error al cancelar la cita médica',
                undefined,
                error.message || error,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    /**
     * Eliminar una cita médica permanentemente
     */
    async deleteCitaMedica(id: string): Promise<BaseResponseDto<null>> {
        try {
            const cita = await this.citasMedicasRepository.findOne({
                where: { idCita: id },
            });

            if (!cita) {
                return new BaseResponseDto<null>(
                    false,
                    `Cita médica con ID ${id} no encontrada`,
                    undefined,
                    null,
                    HttpStatus.NOT_FOUND,
                );
            }

            await this.citasMedicasRepository.delete(id);

            return new BaseResponseDto<null>(
                true,
                'Cita médica eliminada exitosamente',
                null,
                null,
                HttpStatus.OK,
            );
        } catch (error) {
            return new BaseResponseDto<null>(
                false,
                'Error al eliminar la cita médica',
                undefined,
                error.message || error,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
