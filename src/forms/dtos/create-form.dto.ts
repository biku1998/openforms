import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateFormDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly description: string;

  @IsOptional()
  @IsString()
  readonly iconUrl: string;
}
