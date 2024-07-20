import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateJournalEntryDto {
  @IsNotEmpty()
  @IsString()
  title_enc: string;

  @IsString()
  content_enc: string;

  @IsDate()
  date: Date;
}
