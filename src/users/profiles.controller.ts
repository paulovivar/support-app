import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateProfileDto, UpdateProfileDto } from './dtos/profiles.dto';
import { ProfilesService } from './profiles.service';

@Controller('api/v1/profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post()
  createProfile(@Body() profile: CreateProfileDto) {
    return this.profilesService.create(profile);
  }

  @Get()
  getProfiles() {
    return this.profilesService.findAll();
  }

  @Get(':id')
  getProfile(@Param('id') id: string) {
    return this.profilesService.getProfileById(id);
  }

  @Get(':id/user')
  getUserByProfile(@Param('id') id: string) {
    return this.profilesService.getUserByProfileId(id);
  }

  @Patch(':id')
  updateProfile(@Param('id') id: string, @Body() changes: UpdateProfileDto) {
    return this.profilesService.update(id, changes);
  }

  @Delete(':id')
  deleteProfile(@Param('id') id: string) {
    return this.profilesService.delete(id);
  }
}
