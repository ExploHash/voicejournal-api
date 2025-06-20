import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class CreateJournalDto {
  @IsNotEmpty()
  title_enc: string;

  @IsOptional()
  @IsBoolean()
  hasReminder: boolean;

  @IsOptional()
  @IsDateString()
  reminderTime: Date;
}
