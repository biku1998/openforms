import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateOptionDto {
  @IsOptional()
  @IsString()
  readonly content?: string;

  @IsOptional()
  @IsNumber()
  readonly imageFileId?: number;

  @IsOptional()
  @IsNumber()
  readonly position?: number;
}
