import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Especies } from 'src/entities';
import { CreateEspecieDto, UpdateEspecieDto } from 'src/DTO';
import { BaseResponseDto } from 'src/DTO/baseResponse/baseResponse.dto';
import { EspecieInterface } from 'src/interfaces/especie.interface';

@Injectable()
export class EspeciesService implements EspecieInterface {
    constructor(
        @InjectRepository(Especies)
        private readonly especiesRepository: Repository<Especies>,
    ) { }

    async getEspecies(): Promise<BaseResponseDto<Especies[]>> {
        try {
            const especies = await this.especiesRepository.find({
                relations: ['razas'],
                order: { nombreEspecie: 'ASC' },
            });

            return new BaseResponseDto<Especies[]>(
                true,
                'Especies cargadas exitosamente',
                especies,
                null,
                HttpStatus.OK,
            );
        } catch (error) {
            return new BaseResponseDto<Especies[]>(
                false,
                'Error al cargar las especies',
                undefined,
                error.message || error,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async getEspeciesActivas(): Promise<BaseResponseDto<Especies[]>> {
        try {
            const especies = await this.especiesRepository.find({
                where: { activo: true },
                relations: ['razas'],
                order: { nombreEspecie: 'ASC' },
            });

            return new BaseResponseDto<Especies[]>(
                true,
                'Especies activas cargadas exitosamente',
                especies,
                null,
                HttpStatus.OK,
            );
        } catch (error) {
            return new BaseResponseDto<Especies[]>(
                false,
                'Error al cargar las especies activas',
                undefined,
                error.message || error,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async getEspecieById(id: string): Promise<BaseResponseDto<Especies>> {
        try {
            const especie = await this.especiesRepository.findOne({
                where: { idEspecie: id },
                relations: ['razas', 'mascotas'],
            });

            if (!especie) {
                return new BaseResponseDto<Especies>(
                    false,
                    `Especie con ID ${id} no encontrada`,
                    undefined,
                    null,
                    HttpStatus.NOT_FOUND,
                );
            }

            return new BaseResponseDto<Especies>(
                true,
                'Especie encontrada exitosamente',
                especie,
                null,
                HttpStatus.OK,
            );
        } catch (error) {
            return new BaseResponseDto<Especies>(
                false,
                'Error al buscar la especie',
                undefined,
                error.message || error,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async getEspecieByName(nombre: string): Promise<BaseResponseDto<Especies>> {
        try {
            const especie = await this.especiesRepository.findOne({
                where: { nombreEspecie: nombre },
                relations: ['razas'],
            });

            if (!especie) {
                return new BaseResponseDto<Especies>(
                    false,
                    `Especie con nombre "${nombre}" no encontrada`,
                    undefined,
                    null,
                    HttpStatus.NOT_FOUND,
                );
            }

            return new BaseResponseDto<Especies>(
                true,
                'Especie encontrada exitosamente',
                especie,
                null,
                HttpStatus.OK,
            );
        } catch (error) {
            return new BaseResponseDto<Especies>(
                false,
                'Error al buscar la especie',
                undefined,
                error.message || error,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async createEspecie(createEspecieDto: CreateEspecieDto): Promise<BaseResponseDto<Especies>> {
        try {
            // Validar que el nombre no exista
            const existente = await this.especiesRepository.findOne({
                where: { nombreEspecie: createEspecieDto.nombreEspecie },
            });

            if (existente) {
                return new BaseResponseDto<Especies>(
                    false,
                    `Ya existe una especie con el nombre: "${createEspecieDto.nombreEspecie}"`,
                    undefined,
                    null,
                    HttpStatus.CONFLICT,
                );
            }

            const nuevaEspecie = this.especiesRepository.create(createEspecieDto);
            const especieGuardada = await this.especiesRepository.save(nuevaEspecie);

            return new BaseResponseDto<Especies>(
                true,
                'Especie creada exitosamente',
                especieGuardada,
                null,
                HttpStatus.CREATED,
            );
        } catch (error) {
            return new BaseResponseDto<Especies>(
                false,
                'Error al crear la especie',
                undefined,
                error.message || error,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async updateEspecie(id: string, updateEspecieDto: UpdateEspecieDto): Promise<BaseResponseDto<Especies>> {
        try {
            const especie = await this.especiesRepository.findOne({
                where: { idEspecie: id },
            });

            if (!especie) {
                return new BaseResponseDto<Especies>(
                    false,
                    `Especie con ID ${id} no encontrada`,
                    undefined,
                    null,
                    HttpStatus.NOT_FOUND,
                );
            }

            // Validar duplicado de nombre (excluyendo la especie actual)
            if (updateEspecieDto.nombreEspecie && updateEspecieDto.nombreEspecie !== especie.nombreEspecie) {
                const duplicado = await this.especiesRepository.findOne({
                    where: { nombreEspecie: updateEspecieDto.nombreEspecie },
                });

                if (duplicado) {
                    return new BaseResponseDto<Especies>(
                        false,
                        `Ya existe otra especie con el nombre: "${updateEspecieDto.nombreEspecie}"`,
                        undefined,
                        null,
                        HttpStatus.CONFLICT,
                    );
                }
            }

            const especieActualizada = this.especiesRepository.merge(especie, updateEspecieDto);
            const especieGuardada = await this.especiesRepository.save(especieActualizada);

            return new BaseResponseDto<Especies>(
                true,
                'Especie actualizada exitosamente',
                especieGuardada,
                null,
                HttpStatus.OK,
            );
        } catch (error) {
            return new BaseResponseDto<Especies>(
                false,
                'Error al actualizar la especie',
                undefined,
                error.message || error,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async deleteEspecie(id: string): Promise<BaseResponseDto<null>> {
        try {
            const especie = await this.especiesRepository.findOne({
                where: { idEspecie: id },
            });

            if (!especie) {
                return new BaseResponseDto<null>(
                    false,
                    `Especie con ID ${id} no encontrada`,
                    undefined,
                    null,
                    HttpStatus.NOT_FOUND,
                );
            }

            if (!especie.activo) {
                return new BaseResponseDto<null>(
                    false,
                    `La especie "${especie.nombreEspecie}" ya está inactiva`,
                    undefined,
                    null,
                    HttpStatus.BAD_REQUEST,
                );
            }

            especie.activo = false;
            await this.especiesRepository.save(especie);

            return new BaseResponseDto<null>(
                true,
                'Especie desactivada exitosamente',
                null,
                null,
                HttpStatus.OK,
            );
        } catch (error) {
            return new BaseResponseDto<null>(
                false,
                'Error al desactivar la especie',
                undefined,
                error.message || error,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async activateEspecie(id: string): Promise<BaseResponseDto<Especies>> {
        try {
            const especie = await this.especiesRepository.findOne({
                where: { idEspecie: id },
                relations: ['razas'],
            });

            if (!especie) {
                return new BaseResponseDto<Especies>(
                    false,
                    `Especie con ID ${id} no encontrada`,
                    undefined,
                    null,
                    HttpStatus.NOT_FOUND,
                );
            }

            if (especie.activo) {
                return new BaseResponseDto<Especies>(
                    false,
                    `La especie "${especie.nombreEspecie}" ya está activa`,
                    undefined,
                    null,
                    HttpStatus.BAD_REQUEST,
                );
            }

            especie.activo = true;
            const especieActivada = await this.especiesRepository.save(especie);

            return new BaseResponseDto<Especies>(
                true,
                'Especie activada exitosamente',
                especieActivada,
                null,
                HttpStatus.OK,
            );
        } catch (error) {
            return new BaseResponseDto<Especies>(
                false,
                'Error al activar la especie',
                undefined,
                error.message || error,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
