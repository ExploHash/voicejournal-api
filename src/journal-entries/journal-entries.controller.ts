import {
  Body,
  Request,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { JournalEntriesService } from './journal-entries.service';
import { CreateJournalEntryDto } from '../types/create-journal-entry.dto';
import { UpdateJournalEntryDto } from 'src/types/update-journal-entry.dto';

@Controller('journals/:journalId/entries')
export class JournalEntriesController {
  constructor(private readonly journalEntriesService: JournalEntriesService) {}

  @Get()
  async findAll(
    @Param('journalId') journalId: string,
    @Request() request: { userId: string },
  ) {
    return this.journalEntriesService.findAll(journalId, request.userId);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Param('journalId') journalId: string,
    @Request() request: { userId: string },
  ) {
    const journalEntry = await this.journalEntriesService.findOne(
      id,
      journalId,
      request.userId,
    );

    if (!journalEntry) {
      throw new NotFoundException('Journal entry not found');
    }

    return journalEntry;
  }

  @Post()
  async create(
    @Body() journalEntryDto: CreateJournalEntryDto,
    @Param('journalId') journalId: string,
    @Request() request: { userId: string },
  ) {
    return this.journalEntriesService.create(
      journalEntryDto,
      journalId,
      request.userId,
    );
  }

  @Put(':id')
  async update(
    @Body() journalEntryDto: UpdateJournalEntryDto,
    @Param('id') id: string,
    @Param('journalId') journalId: string,
    @Request() request: { userId: string },
  ) {
    return this.journalEntriesService.update(
      journalEntryDto,
      id,
      journalId,
      request.userId,
    );
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Param('journalId') journalId: string,
    @Request() request: { userId: string },
  ) {
    return this.journalEntriesService.remove(id, journalId, request.userId);
  }
}
