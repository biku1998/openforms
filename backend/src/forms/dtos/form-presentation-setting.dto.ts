import { IsBoolean, IsOptional } from 'class-validator';

export class FormPresentationSettingDto {
  @IsOptional()
  @IsBoolean()
  readonly showProgressBar: boolean;

  @IsOptional()
  @IsBoolean()
  readonly shuffleQuestion: boolean;
}
