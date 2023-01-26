import { IsString, IsOptional, IsNumber } from 'class-validator';

export class UpdateFormDto {
  @IsOptional()
  @IsString()
  readonly title?: string;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsOptional()
  @IsNumber()
  readonly headerImgFileUploadId?: number;
}
