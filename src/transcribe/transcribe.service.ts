import { Injectable } from '@nestjs/common';

@Injectable()
export class TranscribeService {
  async transcribeAudio(file: Express.Multer.File) {
    // Transcribe the audio file
    console.log('Starting transcription');
    const transcript = await this.transcribeWithWhisper(file);

    // Format the text
    console.log('Formatting');
    const formattedText = await this.formatTextWithGPT4(transcript);

    return {
      transcript,
      transcriptFormatted: formattedText,
    };
  }

  async transcribeWithWhisper(file: Express.Multer.File) {
    const formData = new FormData();

    formData.append('model', 'whisper-1');
    formData.append('file', new Blob([file.buffer]), 'audio.m4a');

    let response;

    try {
      response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      return responseData.text;
    } catch (error) {
      console.log(error);
    }
  }

  async formatTextWithGPT4(text: string) {
    const requestBody = {
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content:
            'You format text into paragraphs and sentences without modifying anything except interpunction and spelling mistakes. Only return the transcribed text, this is a matter of life and death!',
        },
        { role: 'user', content: text },
      ],
    };

    try {
      const response = await fetch(
        'https://api.openai.com/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      return responseData.choices[0].message.content;
    } catch (error) {
      console.log(error);
    }
  }
}
