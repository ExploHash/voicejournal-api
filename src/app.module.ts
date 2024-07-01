import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JournalsModule } from './journals/journals.module';
import { JournalEntriesModule } from './journal-entries/journal-entries.module';
import { RecordingsModule } from './recordings/recordings.module';
import { TranscribeModule } from './transcribe/transcribe.module';

@Module({
  imports: [
    AuthModule,
    JournalsModule,
    JournalEntriesModule,
    RecordingsModule,
    TranscribeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
