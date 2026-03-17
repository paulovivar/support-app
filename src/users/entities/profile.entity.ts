import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Post } from '../../posts/entities/post.entity';

@Entity('adm_perfiles')
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', unique: true, name: 'usuario_dni', nullable: true })
  userDni: string;

  @Column({ type: 'text', unique: true, name: 'usuario_email', nullable: true })
  userEmail: string;

  @Column({ type: 'text', name: 'telefono', nullable: true })
  userPhone: string;

  @Column({ type: 'text', name: 'usuario_avatar', nullable: true })
  avatar: string;

  @Column({ type: 'text', name: 'primer_nombre', nullable: true })
  firstName: string;

  @Column({ type: 'text', name: 'segundo_nombre', nullable: true })
  secondName: string;

  @Column({ type: 'text', name: 'primer_apellido', nullable: true })
  lastName: string;

  @Column({ type: 'text', name: 'segundo_apellido', nullable: true })
  secondLastName: string;

  @Column({ type: 'date', name: 'fecha_nacimiento', nullable: true })
  birthDate: Date;

  @Column({ type: 'text', name: 'numero_casa', nullable: true })
  houseNumber: string;

  @Column({ type: 'text', name: 'direccion', nullable: true })
  addressP: string;

  @Column({ type: 'text', name: 'parroquia', nullable: true })
  parish: string;

  @Column({ type: 'text', name: 'ciudad', nullable: true })
  city: string;

  @Column({ type: 'text', name: 'provincia', nullable: true })
  state: string;

  @Column({ type: 'text', name: 'pais', nullable: true })
  country: string;

  @Column({ type: 'int', name: 'tipo_identificacion', nullable: true })
  identificationType: number;

  @Column({ type: 'int', name: 'persona_legal', nullable: true })
  legalPerson: number;

  @Column({ type: 'int', name: 'estado_civil', nullable: true })
  maritialStatus: number;

  @Column({ type: 'text', name: 'contrayente', nullable: true })
  spouse: string;

  @OneToOne(() => User, { nullable: false, cascade: true })
  @JoinColumn({ name: 'usuario_id' })
  user: User;

  @Column({ type: 'text', name: 'parroquia_id', nullable: true })
  parishId: string;

  @Column({ type: 'text', name: 'ciudad_id' })
  cityId: string;

  @Column({ type: 'text', name: 'provincia_id', nullable: true })
  stateId: string;

  @OneToMany(() => Post, (post) => post.profile)
  posts: Post[];
}
