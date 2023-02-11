import { IsBoolean, IsOptional } from 'class-validator';

export class FormResponseSettingDto {
  @IsOptional()
  @IsBoolean()
  readonly allQuestionsRequired: boolean;

  @IsOptional()
  @IsBoolean()
  readonly singleResponse: boolean;
}
