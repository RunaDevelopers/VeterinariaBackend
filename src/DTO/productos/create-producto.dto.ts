import { IsNotEmpty, IsOptional, IsString, IsUUID, IsBoolean, IsNumber, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductoDto {
    @ApiProperty({
        description: 'ID del tipo de producto',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @IsUUID()
    @IsNotEmpty()
    idTipoProducto: string;

    @ApiPropertyOptional({
        description: 'Código único del producto',
        example: 'PROD-001',
    })
    @IsString()
    @IsOptional()
    codigoProducto?: string;

    @ApiProperty({
        description: 'Nombre del producto',
        example: 'Amoxicilina 500mg',
    })
    @IsString()
    @IsNotEmpty()
    nombreProducto: string;

    @ApiPropertyOptional({
        description: 'Descripción detallada del producto',
        example: 'Antibiótico de amplio espectro',
    })
    @IsString()
    @IsOptional()
    descripcion?: string;

    @ApiPropertyOptional({
        description: 'Marca del producto',
        example: 'Pfizer',
    })
    @IsString()
    @IsOptional()
    marca?: string;

    @ApiPropertyOptional({
        description: 'Presentación del producto',
        example: 'Caja x 20 tabletas',
    })
    @IsString()
    @IsOptional()
    presentacion?: string;

    @ApiPropertyOptional({
        description: 'Indica si requiere receta médica',
        example: true,
        default: false,
    })
    @IsBoolean()
    @IsOptional()
    requiereReceta?: boolean;

    @ApiPropertyOptional({
        description: 'Indica si requiere refrigeración',
        example: false,
        default: false,
    })
    @IsBoolean()
    @IsOptional()
    requiereRefrigeracion?: boolean;

    @ApiPropertyOptional({
        description: 'Stock actual disponible',
        example: 50,
        default: 0,
    })
    @IsNumber()
    @IsOptional()
    stockActual?: number;

    @ApiPropertyOptional({
        description: 'Stock mínimo requerido',
        example: 10,
        default: 5,
    })
    @IsNumber()
    @IsOptional()
    stockMinimo?: number;

    @ApiPropertyOptional({
        description: 'Stock máximo permitido',
        example: 200,
    })
    @IsNumber()
    @IsOptional()
    stockMaximo?: number;

    @ApiPropertyOptional({
        description: 'Unidad de medida',
        example: 'Unidad',
        enum: ['Unidad', 'Caja', 'Frasco', 'Ampolla', 'ml', 'gr'],
    })
    @IsString()
    @IsOptional()
    unidadMedida?: string;

    @ApiPropertyOptional({
        description: 'Precio de costo',
        example: 25.50,
    })
    @IsNumber()
    @IsOptional()
    precioCosto?: number;

    @ApiPropertyOptional({
        description: 'Precio de venta',
        example: 45.00,
    })
    @IsNumber()
    @IsOptional()
    precioVenta?: number;

    @ApiPropertyOptional({
        description: 'Porcentaje de IVA',
        example: 18,
    })
    @IsNumber()
    @IsOptional()
    iva?: number;

    @ApiPropertyOptional({
        description: 'Fecha de caducidad',
        example: '2026-12-31',
    })
    @IsDateString()
    @IsOptional()
    fechaCaducidad?: string;

    @ApiPropertyOptional({
        description: 'Número de lote',
        example: 'LOT-2024-001',
    })
    @IsString()
    @IsOptional()
    lote?: string;

    @ApiPropertyOptional({
        description: 'Proveedor del producto',
        example: 'Distribuidora Veterinaria SA',
    })
    @IsString()
    @IsOptional()
    proveedor?: string;

    @ApiPropertyOptional({
        description: 'Observaciones adicionales',
        example: 'Mantener en lugar fresco y seco',
    })
    @IsString()
    @IsOptional()
    observaciones?: string;

    @ApiPropertyOptional({
        description: 'Estado activo del producto',
        example: true,
        default: true,
    })
    @IsBoolean()
    @IsOptional()
    activo?: boolean;
}