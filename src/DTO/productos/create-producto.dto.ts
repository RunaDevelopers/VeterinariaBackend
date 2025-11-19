import { IsNotEmpty, IsOptional, IsString, IsUUID, IsBoolean, IsNumber, IsDateString, Min, Max, IsPositive } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsPrecioVentaValid } from './validators/producto.validator';

export class CreateProductoDto {
    @ApiProperty({
        description: 'ID del tipo de producto',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @IsUUID()
    @IsNotEmpty()
    idTipoProducto: string;

    @ApiProperty({
        description: 'Código único del producto',
        example: 'PROD-001',
    })
    @IsString()
    @IsNotEmpty()
    codigoProducto: string;

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

    @ApiProperty({
        description: 'Stock actual disponible',
        example: 50,
        default: 0,
    })
    @Type(() => Number)
    @IsNumber({}, { message: 'El stock actual debe ser un número' })
    @Min(0, { message: 'El stock actual no puede ser negativo' })
    @IsNotEmpty()
    stockActual: number;

    @ApiProperty({
        description: 'Stock mínimo requerido',
        example: 10,
        default: 5,
    })
    @Type(() => Number)
    @IsNumber({}, { message: 'El stock mínimo debe ser un número' })
    @Min(0, { message: 'El stock mínimo no puede ser negativo' })
    @IsNotEmpty()
    stockMinimo: number;

    @ApiPropertyOptional({
        description: 'Unidad de medida',
        example: 'Unidad',
        enum: ['Unidad', 'Caja', 'Frasco', 'Ampolla', 'ml', 'gr'],
    })
    @IsString()
    @IsOptional()
    unidadMedida?: string;

    @ApiProperty({
        description: 'Precio de costo/compra',
        example: 25.50,
    })
    @Type(() => Number)
    @IsNumber({}, { message: 'El precio de costo debe ser un número' })
    @IsPositive({ message: 'El precio de costo debe ser mayor a 0' })
    @IsNotEmpty()
    precioCosto: number;

    @ApiProperty({
        description: 'Precio de venta al público',
        example: 45.00,
    })
    @Type(() => Number)
    @IsNumber({}, { message: 'El precio de venta debe ser un número' })
    @IsPositive({ message: 'El precio de venta debe ser mayor a 0' })
    @IsPrecioVentaValid()
    @IsNotEmpty()
    precioVenta: number;

    @ApiPropertyOptional({
        description: 'Porcentaje de IVA',
        example: 18,
        default: 0,
    })
    @Type(() => Number)
    @IsNumber({}, { message: 'El IVA debe ser un número' })
    @Min(0, { message: 'El IVA no puede ser negativo' })
    @Max(100, { message: 'El IVA no puede exceder 100%' })
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