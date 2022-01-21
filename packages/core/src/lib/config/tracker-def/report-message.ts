import { IsString } from 'class-validator';

export class ReportMessageConfig {
  @IsString()
  msg!: string;
}
