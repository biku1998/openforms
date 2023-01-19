import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateFormDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsOptional()
  @IsNumber()
  readonly header_img_file_upload_id?: number;
}
