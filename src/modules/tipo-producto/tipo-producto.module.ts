import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoProducto } from 'src/entities';
import { TipoProductoService } from 'src/services/tipo-producto/tipo-producto.service';
import { TipoProductoController } from 'src/controllers/tipo-producto/tipo-producto.controller';

@Module({
    imports: [TypeOrmModule.forFeature([TipoProducto])],
    controllers: [TipoProductoController],
    providers: [TipoProductoService],
    exports: [TipoProductoService],
})
export class TipoProductoModule { }
