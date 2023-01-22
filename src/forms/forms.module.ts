import { Module } from '@nestjs/common';
import { FormsService } from './forms.service';
import { FormsController } from './forms.controller';
import { FormCreatedListener } from './listeners/form-created.listener';

@Module({
  providers: [FormsService, FormCreatedListener],
  controllers: [FormsController],
})
export class FormsModule {}
