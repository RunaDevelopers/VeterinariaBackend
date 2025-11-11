import { CreateClienteDto } from 'src/DTO';
import { BaseResponseDto } from 'src/DTO/baseResponse/baseResponse.dto';
import { Clientes } from 'src/entities';

export interface ClienteInterface {

    registrarCliente(cliente: CreateClienteDto): Promise<BaseResponseDto<Clientes>>;
    buscarCliente(): Promise<BaseResponseDto<Clientes>>;
    buscarClientePorDni(dni: string): Promise<BaseResponseDto<Clientes>>;
    actualizarCliente(id: number, cliente: CreateClienteDto): Promise<BaseResponseDto<Clientes>>;
    eliminarClienteLogico(id: string): Promise<BaseResponseDto<null>>;

}
