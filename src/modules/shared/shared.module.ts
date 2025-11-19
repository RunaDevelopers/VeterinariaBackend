import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
    AlergiasMascotas,
    Auditoria,
    Cirugias,
    CitasMedicas,
    CondicionesCronicas,
    Desparacitaciones,
    Especies,
    ExamenesLaboratorio,
    HistorialClinico,
    Mascotas,
    Productos,
    Razas,
    RecetaDetalle,
    RecetasMedicas,
    ServicioProductos,
    ServiciosRealizados,
    TipoProducto,
    Usuarios,
    Vacunaciones,
} from 'src/entities';
import { AlergiasMascotasService } from 'src/services/alergias-mascotas/alergias-mascotas.service';
import { AuditoriaService } from 'src/services/auditoria/auditoria.service';
import { CirugiasService } from 'src/services/cirugias/cirugias.service';
import { CitasMedicasService } from 'src/services/citas-medicas/citas-medicas.service';
import { CondicionesCronicasService } from 'src/services/condiciones-cronicas/condiciones-cronicas.service';
import { DesparacitacionesService } from 'src/services/desparacitaciones/desparacitaciones.service';
import { EspeciesService } from 'src/services/especies/especies.service';
import { ExamenesLaboratorioService } from 'src/services/examenes-laboratorio/examenes-laboratorio.service';
import { HistorialClinicoService } from 'src/services/historial-clinico/historial-clinico.service';
import { MascotasService } from 'src/services/mascotas/mascotas.service';
import { ProductosService } from 'src/services/productos/productos.service';
import { RazasService } from 'src/services/razas/razas.service';
import { RecetaDetalleService } from 'src/services/receta-detalle/receta-detalle.service';
import { RecetasMedicasService } from 'src/services/recetas-medicas/recetas-medicas.service';
import { ServicioProductosService } from 'src/services/servicio-productos/servicio-productos.service';
import { ServiciosRealizadosService } from 'src/services/servicios-realizados/servicios-realizados.service';
import { TipoProductoService } from 'src/services/tipo-producto/tipo-producto.service';
import { UsuariosService } from 'src/services/usuarios/usuarios.service';
import { VacunacionesService } from 'src/services/vacunaciones/vacunaciones.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            AlergiasMascotas,
            Auditoria,
            Cirugias,
            CitasMedicas,
            CondicionesCronicas,
            Desparacitaciones,
            Especies,
            ExamenesLaboratorio,
            HistorialClinico,
            Mascotas,
            Productos,
            Razas,
            RecetaDetalle,
            RecetasMedicas,
            ServicioProductos,
            ServiciosRealizados,
            TipoProducto,
            Usuarios,
            Vacunaciones,
        ]),
    ],
    providers: [
        AlergiasMascotasService,
        AuditoriaService,
        CirugiasService,
        CitasMedicasService,
        CondicionesCronicasService,
        DesparacitacionesService,
        EspeciesService,
        ExamenesLaboratorioService,
        HistorialClinicoService,
        MascotasService,
        ProductosService,
        RazasService,
        RecetaDetalleService,
        RecetasMedicasService,
        ServicioProductosService,
        ServiciosRealizadosService,
        TipoProductoService,
        UsuariosService,
        VacunacionesService,
    ],
    exports: [
        AlergiasMascotasService,
        AuditoriaService,
        CirugiasService,
        CitasMedicasService,
        CondicionesCronicasService,
        DesparacitacionesService,
        EspeciesService,
        ExamenesLaboratorioService,
        HistorialClinicoService,
        MascotasService,
        ProductosService,
        RazasService,
        RecetaDetalleService,
        RecetasMedicasService,
        ServicioProductosService,
        ServiciosRealizadosService,
        TipoProductoService,
        UsuariosService,
        VacunacionesService,
    ],
})
export class SharedModule { }
