import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateJournalDto {
  @IsNotEmpty()
  @MaxLength(30)
  title_enc: string;
}
