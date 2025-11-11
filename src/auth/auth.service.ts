import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Usuarios } from '../entities/Usuarios';
import { Roles } from '../entities/Roles';
import { RegisterDto, LoginDto, AuthResponseDto } from './dto';
import { JwtPayload } from './strategies/jwt.strategy';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuarios)
    private readonly usuariosRepository: Repository<Usuarios>,
    @InjectRepository(Roles)
    private readonly rolesRepository: Repository<Roles>,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Registrar un nuevo usuario
   */
  async register(registerDto: RegisterDto): Promise<AuthResponseDto> {
    const { idRol, email, username, password, ...userData } = registerDto;

    // Verificar que el rol existe
    const rol = await this.rolesRepository.findOne({
      where: { idRol, activo: true },
    });

    if (!rol) {
      throw new NotFoundException('El rol especificado no existe o está inactivo');
    }

    // Verificar si el email ya existe
    const existingEmail = await this.usuariosRepository.findOne({
      where: { email },
    });

    if (existingEmail) {
      throw new ConflictException('El email ya está registrado');
    }

    // Verificar si el username ya existe
    const existingUsername = await this.usuariosRepository.findOne({
      where: { username },
    });

    if (existingUsername) {
      throw new ConflictException('El username ya está registrado');
    }

    try {
      // Hashear la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);

      // Crear el usuario
      const usuario = this.usuariosRepository.create({
        idRol,
        email,
        username,
        passwordHash: hashedPassword,
        ...userData,
      });

      await this.usuariosRepository.save(usuario);

      // Generar token JWT
      const token = this.generateToken(usuario, rol);

      return {
        access_token: token,
        user: {
          idUsuario: usuario.idUsuario,
          username: usuario.username,
          email: usuario.email,
          nombres: usuario.nombres,
          apellidos: usuario.apellidos,
          telefono: usuario.telefono,
          idRol: usuario.idRol,
          nombreRol: rol.nombreRol,
        },
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al registrar el usuario',
      );
    }
  }

  /**
   * Iniciar sesión
   */
  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const { username, password } = loginDto;

    // Buscar usuario por username con el rol relacionado
    const usuario = await this.usuariosRepository.findOne({
      where: { username },
      relations: ['idRol2'],
    });

    if (!usuario) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Verificar si el usuario está activo
    if (!usuario.activo) {
      throw new UnauthorizedException('Usuario inactivo');
    }

    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(password, usuario.passwordHash);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Actualizar último acceso
    usuario.ultimoAcceso = new Date();
    await this.usuariosRepository.save(usuario);

    // Generar token JWT
    const token = this.generateToken(usuario, usuario.idRol2);

    return {
      access_token: token,
      user: {
        idUsuario: usuario.idUsuario,
        username: usuario.username,
        email: usuario.email,
        nombres: usuario.nombres,
        apellidos: usuario.apellidos,
        telefono: usuario.telefono,
        idRol: usuario.idRol,
        nombreRol: usuario.idRol2?.nombreRol,
      },
    };
  }

  /**
   * Validar usuario por ID (usado por JwtStrategy)
   */
  async validateUser(userId: string): Promise<Usuarios> {
    const usuario = await this.usuariosRepository.findOne({
      where: { idUsuario: userId, activo: true },
      relations: ['idRol2'],
    });

    if (!usuario) {
      throw new UnauthorizedException('Usuario no encontrado o inactivo');
    }

    return usuario;
  }

  /**
   * Generar token JWT
   */
  private generateToken(usuario: Usuarios, rol: Roles): string {
    const payload: JwtPayload = {
      sub: usuario.idUsuario,
      email: usuario.email,
      rol: rol.nombreRol,
    };

    return this.jwtService.sign(payload);
  }
}
