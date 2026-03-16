import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(body: CreateCategoryDto) {
    try {
      const newCategory = this.categoryRepository.create(body);
      return await this.categoryRepository.save(newCategory);
    } catch {
      throw new BadRequestException(`Error al crear la categoría`);
    }
  }

  async findAll() {
    return await this.categoryRepository.find();
  }

  async findOneById(id: number) {
    return await this.findOne(id);
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      const category = await this.findOne(id);
      const updated = this.categoryRepository.merge(category, updateCategoryDto);
      return await this.categoryRepository.save(updated);
    } catch {
      throw new BadRequestException(`Error al actualizar la categoría con id ${id}`);
    }
  }

  async remove(id: number) {
    try {
      const category = await this.findOne(id);
      await this.categoryRepository.delete(category.id);
      return { message: `Categoría con id ${id} eliminada correctamente` };
    } catch {
      throw new BadRequestException(`Error al eliminar la categoría con id ${id}`);
    }
  }

  private async findOne(id: number) {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException(`La categoría con id ${id} no existe`);
    }
    return category;
  }
}
