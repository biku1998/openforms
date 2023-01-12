import { Injectable } from '@nestjs/common';
import { Form } from 'shared-ts';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFormDto } from './dtos/create-form.dto';

@Injectable()
export class FormsService {
  constructor(private readonly prismaService: PrismaService) {}

  async createForm({
    loggedInUserId,
    createFormDto,
  }: {
    createFormDto: CreateFormDto;
    loggedInUserId: number;
  }): Promise<Form> {
    const newForm = await this.prismaService.form.create({
      data: {
        ...createFormDto,
        user_id: loggedInUserId,
      },
    });
    return newForm;
  }
}
