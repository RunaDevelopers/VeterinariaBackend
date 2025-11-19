import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Productos } from 'src/entities';
import { ProductosService } from 'src/services/productos/productos.service';
import { TipoProductoModule } from '../tipo-producto/tipo-producto.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Productos]),
        TipoProductoModule, // Importar para usar TipoProductoService
    ],
    providers: [ProductosService],
    exports: [ProductosService],
})
export class ProductosModule { }
