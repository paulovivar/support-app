import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities';

import { UsersService } from 'src/users/services/users.service';
import { Payload } from '../models/payload.model';
import { ProfilesService } from 'src/users/services/profiles.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly profilesService: ProfilesService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string) {
    const user = await this.usersService.getUserByUsername(username);
    if (!user) {
      throw new UnauthorizedException(`No autorizado`);
    }
    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException(`No autorizado`);
    }
    return user;
  }

  async generateToken(user: User) {
    const profileId = await this.profilesService.getProfileIdByUserId(user.id);
    const payload: Payload = { sub: user.id, profileId };
    return this.jwtService.sign(payload);
  }
}
