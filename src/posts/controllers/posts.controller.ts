import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';

import { PostsService } from '../services/posts.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { Payload } from 'src/auth/models/payload.model';

@Controller('api/v1/posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createPostDto: CreatePostDto, @Req() req: Request) {
    const payload = req.user as Payload;
    const profileId = payload.profileId;
    return this.postsService.create(createPostDto, profileId);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.postsService.findOneById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id/publish')
  publish(@Param('id') id: string, @Req() req: Request) {
    const payload = req.user as Payload;
    return this.postsService.publish(id, payload.profileId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }
}
