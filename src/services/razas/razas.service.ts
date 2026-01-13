import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Razas } from 'src/entities';
import { CreateRazaDto, UpdateRazaDto } from 'src/DTO';
import { BaseResponseDto } from 'src/DTO/baseResponse/baseResponse.dto';
import { RazaInterface } from 'src/interfaces/raza.interface';
import { EspeciesService } from '../especies/especies.service';

@Injectable()
export class RazasService implements RazaInterface {
    constructor(
        @InjectRepository(Razas)
        private readonly razasRepository: Repository<Razas>,
        private readonly especiesService: EspeciesService,
    ) { }

    async getRazas(): Promise<BaseResponseDto<Razas[]>> {
        try {
            const razas = await this.razasRepository.find({
                relations: ['idEspecie2', 'mascotas'],
                order: { nombreRaza: 'ASC' },
            });

            return new BaseResponseDto<Razas[]>(
                true,
                'Razas cargadas exitosamente',
                razas,
                null,
                HttpStatus.OK,
            );
        } catch (error) {
            return new BaseResponseDto<Razas[]>(
                false,
                'Error al cargar las razas',
                undefined,
                error.message || error,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async getRazasActivas(): Promise<BaseResponseDto<Razas[]>> {
        try {
            const razas = await this.razasRepository.find({
                where: { activo: true },
                relations: ['idEspecie2'],
                order: { nombreRaza: 'ASC' },
            });

            return new BaseResponseDto<Razas[]>(
                true,
                'Razas activas cargadas exitosamente',
                razas,
                null,
                HttpStatus.OK,
            );
        } catch (error) {
            return new BaseResponseDto<Razas[]>(
                false,
                'Error al cargar las razas activas',
                undefined,
                error.message || error,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async getRazaById(id: string): Promise<BaseResponseDto<Razas>> {
        try {
            const raza = await this.razasRepository.findOne({
                where: { idRaza: id },
                relations: ['idEspecie2', 'mascotas'],
            });

            if (!raza) {
                return new BaseResponseDto<Razas>(
                    false,
                    `Raza con ID ${id} no encontrada`,
                    undefined,
                    null,
                    HttpStatus.NOT_FOUND,
                );
            }

            return new BaseResponseDto<Razas>(
                true,
                'Raza encontrada exitosamente',
                raza,
                null,
                HttpStatus.OK,
            );
        } catch (error) {
            return new BaseResponseDto<Razas>(
                false,
                'Error al buscar la raza',
                undefined,
                error.message || error,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async getRazaByName(nombre: string): Promise<BaseResponseDto<Razas>> {
        try {
            const raza = await this.razasRepository.findOne({
                where: { nombreRaza: nombre },
                relations: ['idEspecie2'],
            });

            if (!raza) {
                return new BaseResponseDto<Razas>(
                    false,
                    `Raza con nombre "${nombre}" no encontrada`,
                    undefined,
                    null,
                    HttpStatus.NOT_FOUND,
                );
            }

            return new BaseResponseDto<Razas>(
                true,
                'Raza encontrada exitosamente',
                raza,
                null,
                HttpStatus.OK,
            );
        } catch (error) {
            return new BaseResponseDto<Razas>(
                false,
                'Error al buscar la raza',
                undefined,
                error.message || error,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async getRazasByEspecie(idEspecie: string): Promise<BaseResponseDto<Razas[]>> {
        try {
            // Validar que la especie existe usando el servicio
            const especieResponse = await this.especiesService.getEspecieById(idEspecie);

            if (!especieResponse.success || !especieResponse.data) {
                return new BaseResponseDto<Razas[]>(
                    false,
                    `Especie con ID ${idEspecie} no encontrada`,
                    undefined,
                    null,
                    HttpStatus.NOT_FOUND,
                );
            }

            const razas = await this.razasRepository.find({
                where: { idEspecie, activo: true },
                relations: ['idEspecie2'],
                order: { nombreRaza: 'ASC' },
            });

            return new BaseResponseDto<Razas[]>(
                true,
                `Razas de ${especieResponse.data.nombreEspecie} cargadas exitosamente`,
                razas,
                null,
                HttpStatus.OK,
            );
        } catch (error) {
            return new BaseResponseDto<Razas[]>(
                false,
                'Error al cargar las razas por especie',
                undefined,
                error.message || error,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async createRaza(createRazaDto: CreateRazaDto): Promise<BaseResponseDto<Razas>> {
        try {
            // Validar que la especie existe y está activa usando el servicio
            const especieResponse = await this.especiesService.getEspecieById(createRazaDto.idEspecie);

            if (!especieResponse.success || !especieResponse.data) {
                return new BaseResponseDto<Razas>(
                    false,
                    `Especie con ID ${createRazaDto.idEspecie} no encontrada`,
                    undefined,
                    null,
                    HttpStatus.NOT_FOUND,
                );
            }

            if (!especieResponse.data.activo) {
                return new BaseResponseDto<Razas>(
                    false,
                    `La especie "${especieResponse.data.nombreEspecie}" no está activa`,
                    undefined,
                    null,
                    HttpStatus.BAD_REQUEST,
                );
            }

            // Validar que no exista una raza con el mismo nombre para esa especie
            const existente = await this.razasRepository.findOne({
                where: {
                    idEspecie: createRazaDto.idEspecie,
                    nombreRaza: createRazaDto.nombreRaza,
                },
            });

            if (existente) {
                return new BaseResponseDto<Razas>(
                    false,
                    `Ya existe una raza "${createRazaDto.nombreRaza}" para la especie ${especieResponse.data.nombreEspecie}`,
                    undefined,
                    null,
                    HttpStatus.CONFLICT,
                );
            }

            // Validar pesos si ambos están presentes
            if (
                createRazaDto.pesoPromedioMin &&
                createRazaDto.pesoPromedioMax &&
                createRazaDto.pesoPromedioMin > createRazaDto.pesoPromedioMax
            ) {
                return new BaseResponseDto<Razas>(
                    false,
                    'El peso mínimo no puede ser mayor al peso máximo',
                    undefined,
                    null,
                    HttpStatus.BAD_REQUEST,
                );
            }

            const nuevaRaza = this.razasRepository.create(createRazaDto);
            const razaGuardada = await this.razasRepository.save(nuevaRaza);

            // Cargar con relaciones
            const razaCompleta = await this.razasRepository.findOne({
                where: { idRaza: razaGuardada.idRaza },
                relations: ['idEspecie2'],
            });
            if (!razaCompleta) {
                return new BaseResponseDto(
                    false,
                    'Error al recuperar la raza creada',
                    null,
                    null,
                    HttpStatus.INTERNAL_SERVER_ERROR,
                );
            }
            return new BaseResponseDto<Razas>(
                true,
                'Raza creada exitosamente',
                razaCompleta,
                null,
                HttpStatus.CREATED,
            );
        } catch (error) {
            return new BaseResponseDto<Razas>(
                false,
                'Error al crear la raza',
                undefined,
                error.message || error,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async updateRaza(id: string, updateRazaDto: UpdateRazaDto): Promise<BaseResponseDto<Razas>> {
        try {
            const raza = await this.razasRepository.findOne({
                where: { idRaza: id },
            });

            if (!raza) {
                return new BaseResponseDto<Razas>(
                    false,
                    `Raza con ID ${id} no encontrada`,
                    undefined,
                    null,
                    HttpStatus.NOT_FOUND,
                );
            }

            // Si se cambia la especie, validar que existe y está activa usando el servicio
            if (updateRazaDto.idEspecie && updateRazaDto.idEspecie !== raza.idEspecie) {
                const especieResponse = await this.especiesService.getEspecieById(updateRazaDto.idEspecie);

                if (!especieResponse.success || !especieResponse.data) {
                    return new BaseResponseDto<Razas>(
                        false,
                        `Especie con ID ${updateRazaDto.idEspecie} no encontrada`,
                        undefined,
                        null,
                        HttpStatus.NOT_FOUND,
                    );
                }

                if (!especieResponse.data.activo) {
                    return new BaseResponseDto<Razas>(
                        false,
                        `La especie "${especieResponse.data.nombreEspecie}" no está activa`,
                        undefined,
                        null,
                        HttpStatus.BAD_REQUEST,
                    );
                }
            }

            // Validar duplicado de nombre (excluyendo la raza actual)
            if (updateRazaDto.nombreRaza) {
                const especieId = updateRazaDto.idEspecie || raza.idEspecie;
                const duplicado = await this.razasRepository.findOne({
                    where: {
                        idEspecie: especieId,
                        nombreRaza: updateRazaDto.nombreRaza,
                    },
                });

                if (duplicado && duplicado.idRaza !== id) {
                    return new BaseResponseDto<Razas>(
                        false,
                        `Ya existe otra raza con el nombre "${updateRazaDto.nombreRaza}" para esta especie`,
                        undefined,
                        null,
                        HttpStatus.CONFLICT,
                    );
                }
            }

            // Validar pesos si se están actualizando
            const pesoMin = updateRazaDto.pesoPromedioMin ?? raza.pesoPromedioMin;
            const pesoMax = updateRazaDto.pesoPromedioMax ?? raza.pesoPromedioMax;

            if (pesoMin && pesoMax && Number(pesoMin) > Number(pesoMax)) {
                return new BaseResponseDto<Razas>(
                    false,
                    'El peso mínimo no puede ser mayor al peso máximo',
                    undefined,
                    null,
                    HttpStatus.BAD_REQUEST,
                );
            }

            const razaActualizada = this.razasRepository.merge(raza, updateRazaDto);
            await this.razasRepository.save(razaActualizada);

            // Cargar con relaciones
            const razaCompleta = await this.razasRepository.findOne({
                where: { idRaza: id },
                relations: ['idEspecie2'],
            });
            if (!razaCompleta) {
                return new BaseResponseDto(
                    false,
                    'Error al recuperar la raza actualizada',
                    null,
                    null,
                    HttpStatus.INTERNAL_SERVER_ERROR,
                );
            }
            return new BaseResponseDto<Razas>(
                true,
                'Raza actualizada exitosamente',
                razaCompleta,
                null,
                HttpStatus.OK,
            );
        } catch (error) {
            return new BaseResponseDto<Razas>(
                false,
                'Error al actualizar la raza',
                undefined,
                error.message || error,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async deleteRaza(id: string): Promise<BaseResponseDto<null>> {
        try {
            const raza = await this.razasRepository.findOne({
                where: { idRaza: id },
            });

            if (!raza) {
                return new BaseResponseDto<null>(
                    false,
                    `Raza con ID ${id} no encontrada`,
                    undefined,
                    null,
                    HttpStatus.NOT_FOUND,
                );
            }

            if (!raza.activo) {
                return new BaseResponseDto<null>(
                    false,
                    `La raza "${raza.nombreRaza}" ya está inactiva`,
                    undefined,
                    null,
                    HttpStatus.BAD_REQUEST,
                );
            }

            raza.activo = false;
            await this.razasRepository.save(raza);

            return new BaseResponseDto<null>(
                true,
                'Raza desactivada exitosamente',
                null,
                null,
                HttpStatus.OK,
            );
        } catch (error) {
            return new BaseResponseDto<null>(
                false,
                'Error al desactivar la raza',
                undefined,
                error.message || error,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async activateRaza(id: string): Promise<BaseResponseDto<Razas>> {
        try {
            const raza = await this.razasRepository.findOne({
                where: { idRaza: id },
                relations: ['idEspecie2'],
            });

            if (!raza) {
                return new BaseResponseDto<Razas>(
                    false,
                    `Raza con ID ${id} no encontrada`,
                    undefined,
                    null,
                    HttpStatus.NOT_FOUND,
                );
            }

            if (raza.activo) {
                return new BaseResponseDto<Razas>(
                    false,
                    `La raza "${raza.nombreRaza}" ya está activa`,
                    undefined,
                    null,
                    HttpStatus.BAD_REQUEST,
                );
            }

            raza.activo = true;
            const razaActivada = await this.razasRepository.save(raza);

            return new BaseResponseDto<Razas>(
                true,
                'Raza activada exitosamente',
                razaActivada,
                null,
                HttpStatus.OK,
            );
        } catch (error) {
            return new BaseResponseDto<Razas>(
                false,
                'Error al activar la raza',
                undefined,
                error.message || error,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
