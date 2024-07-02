import {
  BadRequestException,
  Request,
  Body,
  Controller,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { RecordingsService } from './recordings.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { PremiumGuard } from 'src/subscriptions/premium.guard';

@Controller('journals/:journalId/entries/:entryId/recordings')
export class RecordingsController {
  constructor(private readonly recordingsService: RecordingsService) {}

  @Post()
  @UseGuards(AuthGuard, PremiumGuard)
  @UseInterceptors(FileInterceptor('file_enc'))
  async createRecording(
    @UploadedFile() file_enc: Express.Multer.File,
    @Body('transcript_enc') transcript_enc: string,
    @Body('transcriptFormatted_enc') transcriptFormatted_enc: string,
    @Body('length') length: number,
    @Param('entryId') entryId: string,
    @Param('journalId') journalId: string,
    @Request() request: { userId: string },
  ) {
    if (file_enc.size > 10000000) {
      throw new BadRequestException('File too large');
    }

    return this.recordingsService.createRecording(
      file_enc,
      transcript_enc,
      transcriptFormatted_enc,
      entryId,
      journalId,
      request.userId,
      length,
    );
  }

  @Delete(':recordingId')
  @UseGuards(AuthGuard)
  async deleteRecording(
    @Param('recordingId') recordingId: string,
    @Param('entryId') entryId: string,
    @Param('journalId') journalId: string,
    @Request() request: { userId: string },
  ) {
    return this.recordingsService.deleteRecording(
      recordingId,
      entryId,
      journalId,
      request.userId,
    );
  }
}
