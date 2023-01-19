import { IsString, IsOptional, IsNumber, IsBoolean } from 'class-validator';

export class UpdateFormDto {
  @IsOptional()
  @IsString()
  readonly title?: string;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsOptional()
  @IsNumber()
  readonly header_img_file_upload_id?: number;

  @IsOptional()
  @IsBoolean()
  readonly is_active?: boolean;
}
