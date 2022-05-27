import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtAuthGuand } from './guard/jwt-auth.guard';
import { LocalAuthGuand } from './guard/local-auth.guard';
import { Public } from './public.key';
import { Role } from './roles/role.enum';
import { Roles } from './roles/roles.decorator';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @UseGuards(LocalAuthGuand)
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuand)
  @Get('profile')
  getProfile(@Request() req) {    
    return req.user;
  }

  @Public()
  @Roles(Role.Admin)
  @Get('/')
  findAll() {
    return [];
  }
}
