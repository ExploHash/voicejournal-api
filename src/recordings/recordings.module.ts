import { Module } from '@nestjs/common';
import { RecordingsService } from './recordings.service';
import { RecordingsController } from './recordings.controller';
import { PrismaModule } from 'nestjs-prisma';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PrismaModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  providers: [RecordingsService],
  controllers: [RecordingsController],
  exports: [RecordingsService],
})
export class RecordingsModule {}
