import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from '../services/auth.service';
import { User } from 'src/users/entities';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Req() req: Request) {
    const user = req.user as User;
    return {
      user,
      access_token: this.authService.generateToken(user),
    };
  }
}
