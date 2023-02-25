import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { QuestionType } from '../types/question';

export class CreateOptionDto {
  @IsNotEmpty()
  @IsString()
  readonly content: string;

  @IsOptional()
  @IsNumber()
  readonly imageFileId?: number;

  @IsNotEmpty()
  @IsNumber()
  readonly position: number;

  @IsNotEmpty()
  @IsEnum(QuestionType)
  readonly questionType: QuestionType;
}
