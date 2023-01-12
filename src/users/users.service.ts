import { Injectable } from '@nestjs/common';
import { User } from 'shared-ts';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  }

  async create(dto: CreateUserDto): Promise<User> {
    const user = await this.prismaService.user.create({
      data: dto,
    });

    return user;
  }
}
