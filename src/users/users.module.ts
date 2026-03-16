import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { Profile, User } from './entities';
import { ProfilesController } from './controllers/profiles.controller';
import { ProfilesService } from './services/profiles.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile])],
  controllers: [UsersController, ProfilesController],
  providers: [UsersService, ProfilesService],
  exports: [UsersService, ProfilesService],
})
export class UsersModule {}
