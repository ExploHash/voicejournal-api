import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class JournalEntryDto {
  @IsNotEmpty()
  @IsString()
  title_enc: string;

  @IsString()
  content_enc: string;
}
