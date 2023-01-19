import { Injectable } from '@nestjs/common';
import { Form, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FormsService {
  constructor(private readonly prismaService: PrismaService) {}

  async createForm({ data }: { data: Prisma.FormCreateInput }): Promise<Form> {
    const newForm = await this.prismaService.form.create({
      data,
    });
    return newForm;
  }

  async getForms(
    params: {
      where?: Prisma.FormWhereInput;
      orderBy?: Prisma.FormOrderByWithRelationInput[];
    } = {},
  ): Promise<Form[]> {
    const { where, orderBy } = params;
    const forms = await this.prismaService.form.findMany({
      where,
      orderBy,
    });

    return forms;
  }

  async updateForm(params: {
    where: Prisma.FormWhereUniqueInput;
    data: Prisma.FormUpdateInput;
  }): Promise<Form> {
    const { where, data } = params;
    const updatedForm = await this.prismaService.form.update({
      where,
      data,
    });
    return updatedForm;
  }
}
