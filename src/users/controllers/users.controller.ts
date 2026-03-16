import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';
import { UsersService } from '../services/users.service';

@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() user: CreateUserDto) {
    return this.usersService.create(user);
  }

  @Get()
  getUsers() {
    return this.usersService.findAll();
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() changes: UpdateUserDto) {
    return this.usersService.update(id, changes);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
