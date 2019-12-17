import { Controller, Get, Query } from '@nestjs/common';

@Controller('news')
export class NewsController {
  @Get()
  async getNews(
    @Query('query') query: string,
    @Query('provider') provider: string,
  ): Promise<void> {
    // searchNews(query,provider);
    return;
  }
}
