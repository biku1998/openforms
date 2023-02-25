import { Module } from '@nestjs/common';
import { QuestionsService } from './services/questions.service';
import { QuestionsController } from './controllers/questions.controller';
import { FormsModule } from 'src/forms/forms.module';
import { OptionsController } from './controllers/options.controller';
import { OptionsService } from './services/options.service';

@Module({
  providers: [QuestionsService, OptionsService],
  controllers: [QuestionsController, OptionsController],
  imports: [FormsModule],
})
export class QuestionsModule {}
