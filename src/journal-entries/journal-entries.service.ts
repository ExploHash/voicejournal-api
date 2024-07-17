import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateJournalEntryDto } from '../types/create-journal-entry.dto';
import { RecordingsService } from 'src/recordings/recordings.service';
import { UpdateJournalEntryDto } from 'src/types/update-journal-entry.dto';

@Injectable()
export class JournalEntriesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly recordingsService: RecordingsService,
  ) {}

  async findAll(journalId: string, userId: string) {
    return this.prismaService.journalEntry.findMany({
      select: {
        id: true,
        title_enc: true,
        createdAt: true,
        amountOfWords: true,
      },
      where: {
        journalId,
        journal: {
          userId,
        },
      },
      orderBy: {
        createdAt: 'desc',
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

  async create(data: CreateJournalEntryDto, journalId: string, userId: string) {
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

    const entry = this.prismaService.journalEntry.create({
      data: {
        ...data,
        amountOfWords: 0,
        journalId,
      },
    });

    // Update last entry date on journal
    await this.prismaService.journal.update({
      where: {
        id: journalId,
      },
      data: {
        lastEntryAt: new Date(),
      },
    });

    return entry;
  }

  async update(
    data: UpdateJournalEntryDto,
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
