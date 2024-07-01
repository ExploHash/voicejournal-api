import { Module } from '@nestjs/common';
import { JournalEntriesService } from './journal-entries.service';
import { JournalEntriesController } from './journal-entries.controller';
import { PrismaModule } from 'nestjs-prisma';
import { RecordingsModule } from 'src/recordings/recordings.module';

@Module({
  imports: [PrismaModule.forRoot(), RecordingsModule],
  providers: [JournalEntriesService],
  controllers: [JournalEntriesController],
})
export class JournalEntriesModule {}
