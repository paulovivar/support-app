import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Post } from '../entities/post.entity';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { OpenaiService } from 'src/ai/services/openai.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    private readonly openaiService: OpenaiService,
  ) {}

  async create(body: CreatePostDto, profileId: string) {
    try {
      const newPost = await this.postRepository.save({
        ...body,
        profile: { id: profileId },
        categories: body.categoryIds?.map((categoryId) => ({ id: categoryId })),
      });
      return this.findOne(newPost.id);
    } catch {
      throw new BadRequestException(`Error al crear el post`);
    }
  }

  async findAll() {
    const posts = await this.postRepository.find({
      relations: ['profile.user'],
    });
    return posts;
  }

  async findOneById(id: string) {
    const post = await this.findOne(id);
    return post;
  }

  async getPostsByCategoryId(categoryId: number) {
    const posts = await this.postRepository.findOne({
      where: { categories: { id: categoryId } },
      relations: ['profile.user'],
    });
    return posts;
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    try {
      const post = await this.findOne(id);
      const postUpdated = this.postRepository.merge(post, updatePostDto);
      const postSaved = await this.postRepository.save(postUpdated);
      return postSaved;
    } catch {
      throw new BadRequestException(`Error al actualizar el post con id ${id}`);
    }
  }

  async publish(id: string, profileId: string) {
    const post = await this.findOne(id);
    if (post.profile.id !== profileId) {
      throw new BadRequestException(`No tienes permisos para publicar este post`);
    }
    if (!post.title || !post.content || post.categories.length === 0) {
      throw new BadRequestException(`El post debe tener título, contenido y al menos una categoría para ser publicado`);
    }
    const summary = await this.openaiService.generateSummary(post.content);
    const image = await this.openaiService.generateImage(summary);

    const postUpdated = this.postRepository.merge(post, {
      isDraft: false,
      summary,
      coverImage: image,
    });
    const postSaved = await this.postRepository.save(postUpdated);

    return this.findOne(postSaved.id);
  }

  async remove(id: string) {
    try {
      const post = await this.findOne(id);
      const postDeleted = this.postRepository.delete(post.id);
      return { postDeleted, message: `Post con id ${id} eliminado correctamente` };
    } catch {
      throw new BadRequestException(`Error al eliminar el post con id ${id}`);
    }
  }

  private async findOne(id: string) {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['profile.user', 'categories'],
    });
    if (!post) {
      throw new NotFoundException(`El post con el ${id} no existe`);
    }
    return post;
  }
}
