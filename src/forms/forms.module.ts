import { Module } from '@nestjs/common';
import { FormsController, FormsSettingsController } from './controllers';
import { FormCreatedListener } from './listeners/form-created.listener';
import { FormsService, FormsSettingsService } from './services';

@Module({
  providers: [FormsService, FormsSettingsService, FormCreatedListener],
  controllers: [FormsController, FormsSettingsController],
  exports: [FormsService],
})
export class FormsModule {}
