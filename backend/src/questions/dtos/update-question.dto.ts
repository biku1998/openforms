import { ChoiceType, FileType, InfoType, RatingType } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { QuestionType } from '../types/question';

export class UpdateQuestionDto {
  // common attributes
  @IsString()
  @IsOptional()
  readonly content?: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(QuestionType)
  readonly type: QuestionType;

  // ChoiceQuestion attributes
  @ValidateIf((obj) => obj.type === QuestionType.CHOICE)
  @Transform((params) =>
    params.obj.type === QuestionType.CHOICE ? params.value : undefined,
  )
  @IsOptional()
  @IsString()
  @IsEnum(ChoiceType)
  readonly choiceType: ChoiceType;

  // FileUploadQuestion attributes
  @ValidateIf((obj) => obj.type === QuestionType.FILE_UPLOAD)
  @Transform((params) =>
    params.obj.type === QuestionType.FILE_UPLOAD ? params.value : undefined,
  )
  @IsOptional()
  @IsNumber()
  readonly maxFileSize?: number;

  @ValidateIf((obj) => obj.type === QuestionType.FILE_UPLOAD)
  @Transform((params) =>
    params.obj.type === QuestionType.FILE_UPLOAD ? params.value : undefined,
  )
  @IsOptional()
  @IsNumber()
  readonly maxFiles?: number;

  @ValidateIf((obj) => obj.type === QuestionType.FILE_UPLOAD)
  @Transform((params) =>
    params.obj.type === QuestionType.FILE_UPLOAD ? params.value : undefined,
  )
  @IsOptional()
  @IsEnum(FileType, { each: true })
  readonly acceptedFileTypes?: FileType[];

  // InfoQuestion attributes
  @ValidateIf((obj) => obj.type === QuestionType.INFO)
  @Transform((params) =>
    params.obj.type === QuestionType.INFO ? params.value : undefined,
  )
  @IsOptional()
  @IsString()
  @IsEnum(InfoType)
  readonly infoType: InfoType;

  // RatingQuestion attribute
  @ValidateIf((obj) => obj.type === QuestionType.RATING)
  @Transform((params) =>
    params.obj.type === QuestionType.RATING ? params.value : undefined,
  )
  @IsOptional()
  @IsString()
  @IsEnum(RatingType)
  readonly ratingType: RatingType;

  // RatingQuestion & NpsQuestion common attributes
  @ValidateIf(
    (obj) => obj.type === QuestionType.RATING || obj.type === QuestionType.NPS,
  )
  @Transform((params) =>
    params.obj.type === QuestionType.RATING ||
    params.obj.type === QuestionType.NPS
      ? params.value
      : undefined,
  )
  @IsOptional()
  @IsNumber()
  readonly high?: number;

  @ValidateIf(
    (obj) => obj.type === QuestionType.RATING || obj.type === QuestionType.NPS,
  )
  @Transform((params) =>
    params.obj.type === QuestionType.RATING ||
    params.obj.type === QuestionType.NPS
      ? params.value
      : undefined,
  )
  @IsOptional()
  @IsNumber()
  readonly low?: number;

  @ValidateIf(
    (obj) => obj.type === QuestionType.RATING || obj.type === QuestionType.NPS,
  )
  @Transform((params) =>
    params.obj.type === QuestionType.RATING ||
    params.obj.type === QuestionType.NPS
      ? params.value
      : undefined,
  )
  @IsOptional()
  @IsString()
  readonly lowLabel?: string;

  @ValidateIf(
    (obj) => obj.type === QuestionType.RATING || obj.type === QuestionType.NPS,
  )
  @Transform((params) =>
    params.obj.type === QuestionType.RATING ||
    params.obj.type === QuestionType.NPS
      ? params.value
      : undefined,
  )
  @IsOptional()
  @IsString()
  readonly highLabel?: string;

  // DateQuestions attributes
  @ValidateIf((obj) => obj.type === QuestionType.DATE)
  @Transform((params) =>
    params.obj.type === QuestionType.DATE ? params.value : undefined,
  )
  @IsOptional()
  @IsBoolean()
  readonly includeYear?: boolean;

  @ValidateIf((obj) => obj.type === QuestionType.DATE)
  @Transform((params) =>
    params.obj.type === QuestionType.DATE ? params.value : undefined,
  )
  @IsOptional()
  @IsBoolean()
  readonly includeTime?: boolean;

  // TextQuestions attributes
  @ValidateIf((obj) => obj.type === QuestionType.TEXT)
  @Transform((params) =>
    params.obj.type === QuestionType.TEXT ? params.value : undefined,
  )
  @IsOptional()
  @IsBoolean()
  readonly paragraph?: boolean;
}
