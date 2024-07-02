import { Injectable } from '@nestjs/common';
import * as AWS from '@aws-sdk/client-s3';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class RecordingsService {
  constructor(private readonly prismaService: PrismaService) {}

  s3client = new AWS.S3({
    region: 'eu-west-2',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? '',
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? '',
    },
  });

  async createRecording(
    file: Express.Multer.File,
    transcript_enc: string,
    transcriptFormatted_enc: string,
    entryId: string,
    journalId: string,
    userId: string,
    length: number,
  ) {
    // First check if the journal entry exists
    const entry = await this.prismaService.journalEntry.findUnique({
      where: {
        id: entryId,
        journalId,
        journal: {
          userId,
        },
      },
    });

    if (!entry) {
      throw new Error('Journal entry not found');
    }

    // Create the recording
    const recording = await this.prismaService.recording.create({
      data: {
        transcript_enc,
        transcriptFormatted_enc,
        entryId,
        length,
      },
    });

    // Upload this file to s3
    await this.s3client.putObject({
      Bucket: process.env.AWS_BUCKET_NAME ?? '',
      Key: `recordings/${recording.id}.enc`,
      Body: file.buffer,
    });

    // Update the recording with isUploaded = true
    return this.prismaService.recording.update({
      where: {
        id: recording.id,
      },
      data: {
        isUploaded: true,
      },
    });
  }

  async deleteRecording(
    recordingId: string,
    entryId: string,
    journalId: string,
    userId: string,
  ) {
    // First check if the recording exists
    const recording = await this.prismaService.recording.findUnique({
      where: {
        id: recordingId,
        entryId,
        entry: {
          journalId,
          journal: {
            userId,
          },
        },
      },
    });

    if (!recording) {
      throw new Error('Recording not found');
    }

    // Delete the recording from s3
    await this.s3client.deleteObject({
      Bucket: process.env.AWS_BUCKET_NAME ?? '',
      Key: `recordings/${recording.id}.enc`,
    });

    // Delete the recording from the database
    return this.prismaService.recording.delete({
      where: {
        id: recording.id,
      },
    });
  }
}
