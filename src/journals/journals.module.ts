import { Module } from '@nestjs/common';
import { JournalsController } from './journals.controller';
import { JournalsService } from './journals.service';
import { PrismaModule } from 'nestjs-prisma';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PrismaModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [JournalsController],
  providers: [JournalsService],
})
export class JournalsModule {}
