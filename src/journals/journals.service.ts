import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateJournalDto } from 'src/types/create-journal.dto';

@Injectable()
export class JournalsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(userId: string) {
    return this.prismaService.journal.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string, userId: string) {
    return this.prismaService.journal.findFirst({
      where: {
        id,
        userId,
      },
    });
  }

  async create(createJournalDto: CreateJournalDto, userId: string) {
    return this.prismaService.journal.create({
      data: {
        ...createJournalDto,
        userId,
      },
    });
  }
}
