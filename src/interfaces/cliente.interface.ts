import { CreateClienteDto } from 'src/DTO';
import { BaseResponseDto } from 'src/DTO/baseResponse/baseResponse.dto';
import { Clientes } from 'src/entities';

export interface ClienteInterface {
    registrarCliente(cliente: CreateClienteDto): Promise<BaseResponseDto<Clientes>>;
    buscarCliente(): Promise<BaseResponseDto<Clientes[]>>;
    buscarClienteActivos(): Promise<BaseResponseDto<Clientes[]>>;
    buscarClientePorId(id: string): Promise<BaseResponseDto<Clientes>>;
    buscarClientePorDni(dni: string): Promise<BaseResponseDto<Clientes>>;
    actualizarCliente(id: string, cliente: CreateClienteDto): Promise<BaseResponseDto<Clientes>>;
    eliminarClienteLogico(id: string): Promise<BaseResponseDto<null>>;
    activarCliente(id: string): Promise<BaseResponseDto<Clientes>>;
}
