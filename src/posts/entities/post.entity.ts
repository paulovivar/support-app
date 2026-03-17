import { Profile } from '../../users/entities';
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Category } from './category.entity';

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

  @ManyToOne(() => Profile, (profile) => profile.posts, { nullable: false })
  @JoinColumn({ name: 'perfil_id' })
  profile: Profile;

  @ManyToMany(() => Category, (category) => category.posts)
  @JoinTable({
    name: 'prt_posts_categories',
    joinColumn: { name: 'post_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'category_id', referencedColumnName: 'id' },
  })
  categories: Category[];
}
