import { Module } from '@nestjs/common';
import { QuestionsService } from './services/questions.service';
import { QuestionsController } from './controllers/questions.controller';
import { FormsModule } from 'src/forms/forms.module';

@Module({
  providers: [QuestionsService],
  controllers: [QuestionsController],
  imports: [FormsModule],
})
export class QuestionsModule {}
