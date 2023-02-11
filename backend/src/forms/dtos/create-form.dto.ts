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
  readonly headerImgFileUploadId?: number;
}
