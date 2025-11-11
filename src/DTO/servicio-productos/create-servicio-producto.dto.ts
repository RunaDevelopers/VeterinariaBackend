import { IsNotEmpty, IsOptional, IsUUID, IsInt, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateServicioProductoDto {
    @ApiProperty({
        description: 'ID del servicio realizado',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @IsUUID()
    @IsNotEmpty()
    idServicioRealizado: string;

    @ApiProperty({
        description: 'ID del producto utilizado',
        example: '123e4567-e89b-12d3-a456-426614174001',
    })
    @IsUUID()
    @IsNotEmpty()
    idProducto: string;

    @ApiProperty({
        description: 'Cantidad de producto utilizado',
        example: 2,
    })
    @IsInt()
    @IsNotEmpty()
    cantidad: number;

    @ApiPropertyOptional({
        description: 'Precio unitario del producto',
        example: 25.50,
    })
    @IsNumber()
    @IsOptional()
    precioUnitario?: number;

    @ApiPropertyOptional({
        description: 'Subtotal (cantidad x precio unitario)',
        example: 51.00,
    })
    @IsNumber()
    @IsOptional()
    subtotal?: number;
}