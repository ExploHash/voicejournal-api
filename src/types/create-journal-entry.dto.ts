import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';


export enum JournalEntryEmotion {
  'HAPPY' = 'HAPPY',
  'SAD' = 'SAD',
  'ANGRY' = 'ANGRY',
  'NEUTRAL' = 'NEUTRAL',
  'OVERWHELMED' = 'OVERWHELMED',
  'FRUSTRATED' = 'FRUSTRATED',
  'DEPRESSED' = 'DEPRESSED',
  'ANXIOUS' = 'ANXIOUS',
  'EXCITED' = 'EXCITED',
  'GOOD' = 'GOOD',
  'TIRED' = 'TIRED',
}


export class CreateJournalEntryDto {
  @IsNotEmpty()
  @IsString()
  title_enc: string;

  @IsString()
  content_enc: string;

  @IsDateString()
  date: Date;

  @IsOptional()
  emotion: JournalEntryEmotion;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(10)
  dayScore: number;
}
