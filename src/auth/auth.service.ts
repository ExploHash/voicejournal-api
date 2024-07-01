import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { LoginDto } from 'src/types/login-dto';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from 'src/types/register-dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  async login(loginDto: LoginDto) {
    const currentTime = new Date();
    // Find the user
    const user = await this.prismaService.user.findUnique({
      where: { email: loginDto.email },
    });

    // Check if user exists
    if (user) {
      const passwordValid = await argon2.verify(
        user.password,
        loginDto.password,
      );

      // Check if the password is correct
      if (passwordValid) {
        // Update the last login time
        await this.prismaService.user.update({
          where: { id: user.id },
          data: { lastLogin: currentTime },
        });

        // Generate a JWT token
        const token = this.jwtService.sign({
          sub: user.id,
          plan: user.plan,
        });

        return { token };
      }
    }

    // Wait till 1 second has passed to prevent timing attacks
    const timePassed = new Date().getTime() - currentTime.getTime();
    if (timePassed < 1000) {
      await new Promise((resolve) => setTimeout(resolve, 1000 - timePassed));
    }

    return false;
  }

  async register(registerDto: RegisterDto) {
    // Check if the user already exists
    const userExists = await this.prismaService.user.findUnique({
      where: { email: registerDto.email },
    });

    if (userExists) {
      return false;
    }
    console.log('Checked if user exists');

    // Hash and store the password
    console.log('Hashing password');
    const hashedPassword = await argon2.hash(registerDto.password);
    console.log('Hashed password');
    console.log('Creating user');
    const user = await this.prismaService.user.create({
      data: {
        email: registerDto.email,
        password: hashedPassword,
      },
    });
    console.log('Created user');

    user.password = '';

    return user;
  }

  async me(userId: string) {
    return await this.prismaService.user.findUnique({
      where: { id: userId },
      select: { email: true },
    });
  }
}
