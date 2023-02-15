import { Controller, Delete, Patch, Post } from '@nestjs/common';

@Controller('forms/:formId/questions/:questionId/options')
export class OptionsController {
  @Post()
  async createOption() {}

  @Patch()
  async updateOption() {}

  @Delete()
  async deleteOption() {}
}
