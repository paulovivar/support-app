import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import type { Request } from 'express';

import { Payload } from 'src/auth/models/payload.model';
import { PostsService } from '../services/posts.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { Post as PostEntity } from '../entities/post.entity';

@Controller('api/v1/posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOperation({ summary: 'Create a new post' })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createPostDto: CreatePostDto, @Req() req: Request) {
    const payload = req.user as Payload;
    const profileId = payload.profileId;
    return this.postsService.create(createPostDto, profileId);
  }

  @ApiOperation({ summary: 'Get all posts' })
  @ApiResponse({ status: 200, description: 'List of posts', type: PostEntity })
  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @ApiOperation({ summary: 'Get a post by ID' })
  @ApiResponse({ status: 200, description: 'The post with the specified ID' })
  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.postsService.findOneById(id);
  }

  @ApiOperation({ summary: 'Update a post by ID' })
  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  @ApiOperation({ summary: 'Publish a post by ID' })
  @UseGuards(AuthGuard('jwt'))
  @Put(':id/publish')
  publish(@Param('id') id: string, @Req() req: Request) {
    const payload = req.user as Payload;
    return this.postsService.publish(id, payload.profileId);
  }

  @ApiOperation({ summary: 'Delete a post by ID' })
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }
}
