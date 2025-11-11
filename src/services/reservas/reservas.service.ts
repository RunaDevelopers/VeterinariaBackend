import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservas } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class ReservasService {

    constructor(@InjectRepository(Reservas) private reservasRepository: Repository<Reservas>) { }

    async reservarCita(mascotaId: number, fecha: Date): Promise<string> {
        // Lógica para reservar la cita
        return `Cita reservada para la mascota con ID ${mascotaId} en la fecha ${fecha}`;
    }

}
