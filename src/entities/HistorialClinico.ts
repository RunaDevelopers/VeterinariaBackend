import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Cirugias } from "./Cirugias";
import { Desparacitaciones } from "./Desparacitaciones";
import { ExamenesLaboratorio } from "./ExamenesLaboratorio";
import { CitasMedicas } from "./CitasMedicas";
import { Mascotas } from "./Mascotas";
import { ServiciosRealizados } from "./ServiciosRealizados";
import { Usuarios } from "./Usuarios";
import { RecetasMedicas } from "./RecetasMedicas";
import { Vacunaciones } from "./Vacunaciones";

@Index("idx_historial_fecha", ["fechaRegistro"], {})
@Index("historial_clinico_pkey", ["idHistorial"], { unique: true })
@Index("idx_historial_mascota", ["idMascota"], {})
@Index("idx_historial_veterinario", ["idVeterinario"], {})
@Index("idx_historial_tipo", ["tipoRegistro"], {})
@Entity("historial_clinico", { schema: "public" })
export class HistorialClinico {
  @Column("uuid", {
    primary: true,
    name: "id_historial",
    default: () => "uuid_generate_v4()",
  })
  idHistorial: string;

  @Column("uuid", { name: "id_mascota" })
  idMascota: string;

  @Column("timestamp without time zone", {
    name: "fecha_registro",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  fechaRegistro: Date | null;

  @Column("character varying", { name: "tipo_registro", length: 50 })
  tipoRegistro: string;

  @Column("text", { name: "adjuntos_ruta", nullable: true })
  adjuntosRuta: string | null;

  @Column("uuid", { name: "id_veterinario" })
  idVeterinario: string;

  @Column("timestamp without time zone", {
    name: "fecha_modificacion",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  fechaModificacion: Date | null;

  @OneToMany(() => Cirugias, (cirugias) => cirugias.idHistorialClinico)
  cirugias: Cirugias[];

  @OneToMany(
    () => Desparacitaciones,
    (desparacitaciones) => desparacitaciones.idHistorialClinico
  )
  desparacitaciones: Desparacitaciones[];

  @OneToMany(
    () => ExamenesLaboratorio,
    (examenesLaboratorio) => examenesLaboratorio.idHistorialClinico
  )
  examenesLaboratorios: ExamenesLaboratorio[];

  @ManyToOne(
    () => CitasMedicas,
    (citasMedicas) => citasMedicas.historialClinicos
  )
  @JoinColumn([{ name: "id_cita", referencedColumnName: "idCita" }])
  idCita: CitasMedicas;

  @ManyToOne(() => Mascotas, (mascotas) => mascotas.historialClinicos)
  @JoinColumn([{ name: "id_mascota", referencedColumnName: "idMascota" }])
  idMascota2: Mascotas;

  @ManyToOne(
    () => ServiciosRealizados,
    (serviciosRealizados) => serviciosRealizados.historialClinicos
  )
  @JoinColumn([
    {
      name: "id_servicio_realizado",
      referencedColumnName: "idServicioRealizado",
    },
  ])
  idServicioRealizado: ServiciosRealizados;

  @ManyToOne(() => Usuarios, (usuarios) => usuarios.historialClinicos)
  @JoinColumn([{ name: "id_veterinario", referencedColumnName: "idUsuario" }])
  idVeterinario2: Usuarios;

  @OneToMany(
    () => RecetasMedicas,
    (recetasMedicas) => recetasMedicas.idHistorialClinico
  )
  recetasMedicas: RecetasMedicas[];

  @OneToMany(
    () => Vacunaciones,
    (vacunaciones) => vacunaciones.idHistorialClinico
  )
  vacunaciones: Vacunaciones[];
}
