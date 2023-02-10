import { ChoiceType, FileType } from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { QuestionType } from '../types/question';

export class CreateQuestionDto {
  // common attributes
  @IsString()
  readonly content?: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(QuestionType)
  readonly type: QuestionType;

  // ChoiceQuestion attributes
  @ValidateIf((obj) => obj.type === QuestionType.CHOICE)
  @IsString()
  @IsNotEmpty()
  @IsEnum(ChoiceType)
  readonly choiceType: ChoiceType;

  // FileUploadQuestion attributes
  @ValidateIf((obj) => obj.type === QuestionType.FILE_UPLOAD)
  @IsOptional()
  @IsNumber()
  readonly maxFileSize?: number;

  @ValidateIf((obj) => obj.type === QuestionType.FILE_UPLOAD)
  @IsOptional()
  @IsNumber()
  readonly maxFiles?: number;

  @ValidateIf((obj) => obj.type === QuestionType.FILE_UPLOAD)
  @IsOptional()
  @IsEnum(FileType, { each: true })
  readonly acceptedFileTypes?: FileType[];
}
