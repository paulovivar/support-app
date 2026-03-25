import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfileDto, UpdateProfileDto } from '../dtos/profiles.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from '../entities';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  async create(profile: CreateProfileDto) {
    try {
      const { userDni, userEmail, userPhone, user, ...profileData } = profile;

      if (!userDni || !userEmail || !userPhone) {
        throw new BadRequestException('userDni, userEmail y userPhone son obligatorios');
      }

      const userToSave = {
        ...user,
        username: userDni,
        email: userEmail,
        phone: userPhone,
      };

      const profileToSave = {
        ...profileData,
        userDni,
        userEmail,
        userPhone,
        user: userToSave,
      };

      const newProfile = await this.profileRepository.save(profileToSave);
      return newProfile;
    } catch (error) {
      console.error('Error detallado:', error);
      throw new BadRequestException(`Error al crear el usuario y perfil`);
    }
  }

  async findAll(): Promise<Profile[]> {
    const profiles = await this.profileRepository.find();
    return profiles;
  }

  async getProfileById(id: string) {
    const profile = await this.findOne(id);
    return profile;
  }

  async getProfileIdByUserId(userId: string): Promise<string> {
    const profile = await this.profileRepository.findOne({
      where: { user: { id: userId } },
    });
    if (!profile) {
      throw new NotFoundException(`No se encontró un perfil para el usuario con id ${userId}`);
    }

    return profile.id;
  }

  async getPostsByProfileId(id: string) {
    const profile = await this.profileRepository.findOne({
      where: { id },
      relations: ['posts'],
    });
    if (!profile) {
      throw new NotFoundException(`El perfil con id ${id} no existe`);
    }
    return profile.posts;
  }

  async update(id: string, changes: UpdateProfileDto) {
    try {
      const profile = await this.findOne(id);
      const updatedProfile = this.profileRepository.merge(profile, changes);
      const profileSaved = await this.profileRepository.save(updatedProfile);
      return profileSaved;
    } catch {
      throw new BadRequestException(`Error al actualizar el usuario y perfil con id ${id}`);
    }
  }

  async delete(id: string) {
    try {
      const deletedProfile = await this.profileRepository.delete(id);
      return { deletedProfile, message: `Usuario con id ${id} eliminado correctamente` };
    } catch {
      throw new BadRequestException(`Error al eliminar el usuario y perfil con id ${id}`);
    }
  }

  private async findOne(id: string) {
    const profile = await this.profileRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!profile) {
      throw new NotFoundException(`El usuario y perfil con el ${id} no existe`);
    }
    return profile;
  }
}
