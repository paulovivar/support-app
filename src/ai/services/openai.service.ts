import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

import { Env } from 'src/env.model';

@Injectable()
export class OpenaiService {
  private readonly openai: OpenAI;

  constructor(configService: ConfigService<Env>) {
    const apiKey = configService.get('OPENAI_API_KEY', { infer: true });
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY is not defined in environment variables');
    }
    this.openai = new OpenAI({ apiKey });
  }

  async generateSummary(content: string) {
    const response = await this.openai.responses.create({
      model: 'gpt-4o-mini',
      instructions: 'You are a helpful assistant that generates summaries for blog posts. Please provide a concise summary of the following content:',
      input: content,
    });

    return response.output_text;
  }

  async generateImage(description: string) {
    const prompt = `Create an image that represents the following description: ${description}`;
    const response = await this.openai.images.generate({
      model: 'dall-e-3',
      prompt,
      size: '1024x1024',
      response_format: 'url',
    });
    if (!response.data || response.data.length === 0) {
      throw new Error('No image URL returned from OpenAI');
    }

    return response.data[0].url;
  }
}
