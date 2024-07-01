import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Request,
  NotFoundException,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateJournalDto } from 'src/types/create-journal.dto';
import { JournalsService } from './journals.service';

@Controller('journals')
export class JournalsController {
  constructor(private readonly journalsService: JournalsService) {}

  @Get()
  @UseGuards(AuthGuard)
  async findAll(@Request() request: { userId: string }) {
    return this.journalsService.findAll(request.userId);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findOne(
    @Param('id') id: string,
    @Request() request: { userId: string },
  ) {
    const journal = await this.journalsService.findOne(id, request.userId);

    if (!journal) {
      throw new NotFoundException('Journal not found');
    }

    return journal;
  }

  @Post()
  @UseGuards(AuthGuard)
  async create(
    @Body() createJournalDto: CreateJournalDto,
    @Request() request: { userId: string },
  ) {
    return this.journalsService.create(createJournalDto, request.userId);
  }
}
