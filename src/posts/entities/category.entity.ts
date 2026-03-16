import { PrimaryGeneratedColumn, Entity, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'prt_categories' })
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', name: 'creado' })
  createAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', name: 'actualizado' })
  updateAt: Date;

  @Column({ type: 'text', unique: true })
  name: string;
}
