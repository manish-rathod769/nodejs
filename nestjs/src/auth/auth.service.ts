import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable({})
export class AuthService {
  constructor(private prismaService: PrismaService) {}
  async signup(dto: AuthDto) {
    try {
      //  Create hashed password
      const hashedPassword = await argon.hash(dto.password);
      const savedUser = await this.prismaService.User.create({
        data: {
          firstName: dto.firstName,
          lastName: dto.lastName,
          email: dto.email,
          password: hashedPassword,
        },
      });
      delete savedUser.password;
      return savedUser;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        // Check if email is unique or not
        if (error.code === 'P2002') {
          throw new ForbiddenException('Email already taken !!!');
        }
      }
      return error.json();
    }
  }
  signin() {
    return 'Signin method from AuthService';
  }
}
