import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { LoginDto } from 'src/types/login-dto';
import { AuthService } from './auth.service';
import { RegisterDto } from 'src/types/register-dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const response = await this.authService.login(loginDto);

    if (response) {
      return response;
    } else {
      // Throw a 401 error if the login failed
      throw new UnauthorizedException('Invalid email or password');
    }
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const response = await this.authService.register(registerDto);

    if (response) {
      return response;
    } else {
      // Throw a 400 error if the user already exists
      throw new BadRequestException('User already exists');
    }
  }

  @Get('me')
  @UseGuards(AuthGuard)
  async me(@Request() request: { userId: string }) {
    return this.authService.me(request.userId);
  }
}
