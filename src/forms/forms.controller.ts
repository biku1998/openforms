import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  Session as GetSession,
} from '@nestjs/common';
import { UserSession } from 'src/utils/types';
import { CreateFormDto } from './dtos/create-form.dto';
import { FormsService } from './forms.service';

@Controller({
  version: '1',
  path: 'forms',
})
export class FormsController {
  constructor(private readonly formService: FormsService) {}

  @Get()
  async getForms() {
    return {
      message: 'called /forms',
    };
  }

  @Post()
  async createForm(
    @GetSession() session: UserSession,
    @Body() createFormDto: CreateFormDto,
  ) {
    try {
      const newForm = await this.formService.createForm({
        createFormDto,
        loggedInUserId: session.user.userId,
      });

      return newForm;
    } catch (error) {
      throw new InternalServerErrorException(
        'Oops! Something went really wrong',
      );
    }
  }
}
