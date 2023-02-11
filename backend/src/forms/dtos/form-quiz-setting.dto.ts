import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class FormQuizSettingDto {
  @IsOptional()
  @IsNumber()
  readonly defaultPointValue: number;

  @IsOptional()
  @IsBoolean()
  readonly releaseScoreImmediately: boolean;

  @IsOptional()
  @IsBoolean()
  readonly viewMissedQuestions: boolean;

  @IsOptional()
  @IsBoolean()
  readonly viewCorrectAnswers: boolean;

  @IsOptional()
  @IsBoolean()
  readonly viewPointValues: boolean;
}
