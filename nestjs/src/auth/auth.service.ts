import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto, signInDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable({})
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
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
      throw error;
    }
  }

  async signin(dto: signInDto) {
    try {
      // Check if user exist or not
      const matchedUser = await this.prismaService.User.findUnique({
        where: {
          email: dto.email,
        },
      });

      // If User doen not exist throw error
      if (!matchedUser) {
        throw new ForbiddenException('Invalid Credentials !!!');
      }

      // If User exist then match password
      const passwordFlag = await argon.verify(
        matchedUser.password,
        dto.password,
      );

      if (!passwordFlag) {
        throw new ForbiddenException('Invalid Credentials !!!');
      }

      return this.signToken(matchedUser.id, matchedUser.email);
    } catch (error) {
      throw error;
    }
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ accessToken: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const accessToken = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: this.config.get('JWT_SECRET'),
    });
    return { accessToken };
  }
}
