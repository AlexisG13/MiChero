import { Controller, Get, Query, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { NewsService } from './news.service';
import { Observable } from 'rxjs';
import { News } from './interfaces /news.interface';
import { NewsFilterDto } from './dto/get_news_filter.dto';
import { ValidationJWTGuard } from 'src/guards/validationjwt.guard';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  @UseGuards(ValidationJWTGuard)
  @UsePipes(ValidationPipe)
  getNews(@Query() newsFilterDto: NewsFilterDto): Observable<News[]> {
    return this.newsService.searchNews(newsFilterDto);
  }
}
