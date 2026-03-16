import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async create(body: CreatePostDto) {
    try {
      const newPost = await this.postRepository.save({
        ...body,
        profile: { id: body.profileId },
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

  async getPostsByProfileId(id: string) {
    const post = await this.findOne(id);
    return post.profile;
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
      relations: ['profile.user'],
    });
    if (!post) {
      throw new NotFoundException(`El post con el ${id} no existe`);
    }
    return post;
  }
}
