import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class FormQuizSettingDto {
  @IsOptional()
  @IsNumber()
  readonly default_point_value: number;

  @IsOptional()
  @IsBoolean()
  readonly release_score_immediately: boolean;

  @IsOptional()
  @IsBoolean()
  readonly view_missed_questions: boolean;

  @IsOptional()
  @IsBoolean()
  readonly view_correct_answers: boolean;

  @IsOptional()
  @IsBoolean()
  readonly view_point_values: boolean;
}
