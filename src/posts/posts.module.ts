import { Module } from '@nestjs/common';
import { PostsService } from './services/posts.service';
import { PostsController } from './controllers/posts.controller';
import { CategoriesService } from './services/categories.service';
import { CategoriesController } from './controllers/categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post as PostEntity } from './entities/post.entity';
import { Category } from './entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, Category])],
  controllers: [PostsController, CategoriesController],
  providers: [PostsService, CategoriesService],
  exports: [PostsService, CategoriesService],
})
export class PostsModule {}
