import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/auth.guard';
import { TranscribeService } from './transcribe.service';
import { PremiumGuard } from 'src/subscriptions/premium.guard';

@Controller('transcribe')
export class TranscribeController {
  constructor(private readonly transcribeService: TranscribeService) {}

  @Post()
  @UseGuards(AuthGuard, PremiumGuard)
  @UseInterceptors(FileInterceptor('file'))
  transcribeAudio(@UploadedFile() file: Express.Multer.File) {
    // Check if m4a file
    if (file.mimetype !== 'audio/mp4') {
      throw new BadRequestException('Only m4a files are allowed');
    }

    return this.transcribeService.transcribeAudio(file);
  }
}
