import { Module } from '@nestjs/common';
import { TranscribeService } from './transcribe.service';
import { TranscribeController } from './transcribe.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  providers: [TranscribeService],
  controllers: [TranscribeController],
})
export class TranscribeModule {}
