import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateJournalEntryDto {
  @IsNotEmpty()
  @IsString()
  title_enc: string;

  @IsString()
  content_enc: string;

  @IsOptional()
  @IsInt()
  amountOfWords?: number;

  @IsOptional()
  @IsDateString()
  date?: Date;
}
