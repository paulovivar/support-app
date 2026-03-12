import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('prt_posts')
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', name: 'creado' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', name: 'actualizado' })
  updatedAt: Date;

  @Column({ type: 'text', name: 'titulo' })
  title: string;

  @Column({ type: 'text', name: 'contenido', nullable: true })
  content: string;

  @Column({ type: 'text', name: 'imagen_portada', nullable: true })
  coverImage: string;

  @Column({ type: 'text', name: 'resumen', nullable: true })
  summary: string;

  @Column({ type: 'boolean', default: true, name: 'borrador' })
  idDraft: boolean;
}
