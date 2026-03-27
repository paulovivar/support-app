import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { Profile } from '../../users/entities';
import { Category } from './category.entity';

@Entity('prt_posts')
export class Post {
  @ApiProperty({ description: 'The unique identifier of the post' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'The date and time when the post was created' })
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', name: 'creado' })
  createdAt: Date;

  @ApiProperty({ description: 'The date and time when the post was last updated' })
  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', name: 'actualizado' })
  updatedAt: Date;

  @ApiProperty({ description: 'The title of the post' })
  @Column({ type: 'text', name: 'titulo' })
  title: string;

  @ApiProperty({ description: 'The content of the post', required: false })
  @Column({ type: 'text', name: 'contenido', nullable: true })
  content: string;

  @ApiProperty({ description: 'The URL of the cover image', required: false })
  @Column({ type: 'text', name: 'imagen_portada', nullable: true })
  coverImage: string;

  @ApiProperty({ description: 'A brief summary of the post', required: false })
  @Column({ type: 'text', name: 'resumen', nullable: true })
  summary: string;

  @ApiProperty({ description: 'Indicates whether the post is a draft or published', default: true })
  @Column({ type: 'boolean', default: true, name: 'borrador' })
  isDraft: boolean;

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
