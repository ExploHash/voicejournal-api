import { IsNotEmpty } from 'class-validator';

export class CreateJournalDto {
  @IsNotEmpty()
  title_enc: string;
}
