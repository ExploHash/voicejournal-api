import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class JournalEntryDto {
  @IsNotEmpty()
  @MaxLength(30)
  title_enc: string;

  @IsString()
  content_enc: string;
}
