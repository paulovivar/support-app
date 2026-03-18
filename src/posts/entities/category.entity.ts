import { PrimaryGeneratedColumn, Entity, Column, CreateDateColumn, UpdateDateColumn, ManyToMany } from 'typeorm';
import { Post } from './post.entity';

@Entity({ name: 'prt_categories' })
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', name: 'creado' })
  createAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', name: 'actualizado' })
  updateAt: Date;

  @Column({ type: 'text', name: 'nombre', unique: true })
  name: string;

  @Column({ type: 'text', name: 'descripcion', nullable: true })
  description: string;

  @ManyToMany(() => Post, (post) => post.categories)
  posts: Post[];
}
