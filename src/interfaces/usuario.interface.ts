import { BaseResponseDto } from '../DTO/baseResponse/baseResponse.dto';
import { Usuarios } from '../entities/Usuarios';
import { CreateUsuarioDto } from '../DTO/usuarios/create-usuario.dto';
import { UpdateUsuarioDto } from '../DTO/usuarios/update-usuario.dto';

export interface IUsuarioService {
    getUsuarios(): Promise<BaseResponseDto<Usuarios[]>>;
    getUsuariosActivos(): Promise<BaseResponseDto<Usuarios[]>>;
    getUsuarioById(id: string): Promise<BaseResponseDto<Usuarios>>;
    getUsuarioByEmail(email: string): Promise<BaseResponseDto<Usuarios>>;
    getUsuariosByRol(idRol: string): Promise<BaseResponseDto<Usuarios[]>>;
    createUsuario(createUsuarioDto: CreateUsuarioDto): Promise<BaseResponseDto<Usuarios>>;
    updateUsuario(id: string, updateUsuarioDto: UpdateUsuarioDto): Promise<BaseResponseDto<Usuarios>>;
    deleteUsuario(id: string): Promise<BaseResponseDto<Usuarios>>;
    activateUsuario(id: string): Promise<BaseResponseDto<Usuarios>>;
    cambiarPassword(id: string, currentPassword: string, newPassword: string): Promise<BaseResponseDto<Usuarios>>;
}
