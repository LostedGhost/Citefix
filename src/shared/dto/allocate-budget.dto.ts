import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class AllocateBudgetDto {
  @IsString()
  @IsNotEmpty()
  zone: string;

  @IsNumber()
  @Min(0)
  budget: number;
}
