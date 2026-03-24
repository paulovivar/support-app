import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities';

import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
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

  generateToken(user: User) {
    const payload = { sub: user.id };
    return this.jwtService.sign(payload);
  }
}
