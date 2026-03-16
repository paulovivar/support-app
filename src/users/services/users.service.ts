import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(user: CreateUserDto) {
    try {
      const newUser = await this.userRepository.save(user);
      return newUser;
    } catch {
      throw new BadRequestException(`Error al crear el usuario`);
    }
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
  }

  async getUserById(id: string) {
    const user = await this.findOne(id);
    return user;
  }

  async update(id: string, changes: UpdateUserDto) {
    try {
      const user = await this.findOne(id);
      const userUpdated = this.userRepository.merge(user, changes);
      const userSaved = await this.userRepository.save(userUpdated);
      return userSaved;
    } catch {
      throw new BadRequestException(`Error al actualizar el usuario con id ${id}`);
    }
  }

  async delete(id: string) {
    try {
      const user = await this.findOne(id);
      const userDeleted = this.userRepository.delete(user.id);
      return { userDeleted, message: `Usuario con id ${id} eliminado correctamente` };
    } catch {
      throw new BadRequestException(`Error al eliminar el usuario con id ${id}`);
    }
  }

  private async findOne(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`El usuario con el ${id} no existe`);
    }
    return user;
  }
}
