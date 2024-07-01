import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { JournalEntryDto } from '../types/journal-entry.dto';
import { RecordingsService } from 'src/recordings/recordings.service';

@Injectable()
export class JournalEntriesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly recordingsService: RecordingsService,
  ) {}

  async findAll(journalId: string, userId: string) {
    return this.prismaService.journalEntry.findMany({
      where: {
        journalId,
        journal: {
          userId,
        },
      },
    });
  }

  async findOne(id: string, journalId: string, userId: string) {
    return this.prismaService.journalEntry.findUnique({
      where: {
        id,
        journalId,
        journal: {
          userId,
        },
      },
      include: {
        recordings: true,
      },
    });
  }

  async create(data: JournalEntryDto, journalId: string, userId: string) {
    // First check if the journal exists
    const journal = await this.prismaService.journal.findUnique({
      where: {
        id: journalId,
        userId,
      },
    });

    if (!journal) {
      throw new Error('Journal not found');
    }

    return this.prismaService.journalEntry.create({
      data: {
        ...data,
        journalId,
      },
    });
  }

  async update(
    data: JournalEntryDto,
    id: string,
    journalId: string,
    userId: string,
  ) {
    return this.prismaService.journalEntry.update({
      where: {
        id,
        journalId,
        journal: {
          userId,
        },
      },
      data,
    });
  }

  async remove(id: string, journalId: string, userId: string) {
    // Grab the journal entry
    const journalEntry = await this.prismaService.journalEntry.findUnique({
      where: {
        id,
        journalId,
        journal: {
          userId,
        },
      },
      include: {
        recordings: true,
      },
    });

    // Delete all recordings associated with this journal entry
    for (const recording of journalEntry?.recordings ?? []) {
      await this.recordingsService.deleteRecording(
        recording.id,
        id,
        journalId,
        userId,
      );
    }

    // Delete the journal entry
    return this.prismaService.journalEntry.delete({
      where: {
        id,
        journalId,
        journal: {
          userId,
        },
      },
    });
  }
}
