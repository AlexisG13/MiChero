import { Controller, Get, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { NewsService } from './news.service';
import { Observable } from 'rxjs';
import { News } from './interfaces /news.interface';
import { NewsFilterDto } from './dto/get_news_filter.dto';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  @UsePipes(ValidationPipe)
  getNews(@Query() newsFilterDto: NewsFilterDto): Observable<News[]> {
    return this.newsService.searchNews(newsFilterDto);
  }
}
