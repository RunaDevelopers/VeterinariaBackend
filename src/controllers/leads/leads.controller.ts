import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { LeadsService } from '../../services/leads/leads.service';
import { CreateLeadDto } from '../../DTO/leads/create-lead.dto';
import { UpdateLeadDto } from '../../DTO/leads/update-lead.dto';
import { Leads } from '../../entities/Leads';

@ApiTags('Leads')
@ApiBearerAuth()
@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Crear un nuevo lead',
    description: 'Registra un nuevo lead con sus datos de contacto y servicio solicitado',
  })
  @ApiResponse({
    status: 201,
    description: 'Lead creado exitosamente',
    type: Leads,
  })
  @ApiResponse({
    status: 404,
    description: 'Tipo de servicio no encontrado',
  })
  @ApiResponse({
    status: 409,
    description: 'El correo electrónico ya está registrado',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos o tipo de servicio inactivo',
  })
  async create(@Body() createLeadDto: CreateLeadDto): Promise<Leads> {
    return this.leadsService.create(createLeadDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Obtener todos los leads',
    description: 'Retorna la lista completa de leads (activos e inactivos) con sus tipos de servicio',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de leads obtenida exitosamente',
    type: [Leads],
  })
  async findAll(): Promise<Leads[]> {
    return this.leadsService.findAll();
  }

  @Get('recientes')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Obtener leads recientes',
    description: 'Retorna los últimos 100 leads ordenados por fecha de creación',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de leads recientes obtenida exitosamente',
    type: [Leads],
  })
  async findAllActive(): Promise<Leads[]> {
    return this.leadsService.findAllActive();
  }

  @Get('por-servicio/:idTipoServicio')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Obtener leads por tipo de servicio',
    description: 'Retorna todos los leads asociados a un tipo de servicio específico',
  })
  @ApiParam({
    name: 'idTipoServicio',
    description: 'UUID del tipo de servicio',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de leads obtenida exitosamente',
    type: [Leads],
  })
  async findByTipoServicio(
    @Param('idTipoServicio', ParseUUIDPipe) idTipoServicio: string,
  ): Promise<Leads[]> {
    return this.leadsService.findByTipoServicio(idTipoServicio);
  }

  @Get('buscar-por-email')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Buscar lead por correo electrónico',
    description: 'Busca un lead específico usando su correo electrónico',
  })
  @ApiQuery({
    name: 'correo',
    description: 'Correo electrónico del lead',
    example: 'juan.garcia@example.com',
  })
  @ApiResponse({
    status: 200,
    description: 'Lead encontrado',
    type: Leads,
  })
  @ApiResponse({
    status: 404,
    description: 'Lead no encontrado',
  })
  async findByEmail(@Query('correo') correo: string): Promise<Leads | null> {
    return this.leadsService.findByEmail(correo);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Obtener un lead por ID',
    description: 'Retorna un lead específico con su tipo de servicio asociado',
  })
  @ApiParam({
    name: 'id',
    description: 'UUID del lead',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Lead encontrado',
    type: Leads,
  })
  @ApiResponse({
    status: 404,
    description: 'Lead no encontrado',
  })
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Leads> {
    return this.leadsService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Actualizar un lead',
    description: 'Actualiza los datos de un lead existente',
  })
  @ApiParam({
    name: 'id',
    description: 'UUID del lead a actualizar',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Lead actualizado exitosamente',
    type: Leads,
  })
  @ApiResponse({
    status: 404,
    description: 'Lead o tipo de servicio no encontrado',
  })
  @ApiResponse({
    status: 409,
    description: 'El correo electrónico ya existe',
  })
  @ApiResponse({
    status: 400,
    description: 'Tipo de servicio inactivo',
  })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateLeadDto: UpdateLeadDto,
  ): Promise<Leads> {
    return this.leadsService.update(id, updateLeadDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Eliminar un lead',
    description: 'Elimina un lead de forma permanente de la base de datos',
  })
  @ApiParam({
    name: 'id',
    description: 'UUID del lead a eliminar',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Lead eliminado exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Lead no encontrado',
  })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.leadsService.remove(id);
  }
}
