import { Injectable, HttpService, BadRequestException } from '@nestjs/common';
import { map, reduce } from 'rxjs/operators';
import { Observable, merge } from 'rxjs';
import { News } from './interfaces /news.interface';
import { NewsFilterDto } from './dto/get_news_filter.dto';
import { ProviderDto } from './dto/provider.dto';
import { guardianProvider } from './news_providers/guardian';
import { nyTimesProvider } from './news_providers/nytimes';

@Injectable()
export class NewsService {
  constructor(private readonly httpService: HttpService) {}

  searchNews(newsFilterDto: NewsFilterDto): Observable<News[]> {
    switch (newsFilterDto.provider) {
      case undefined:
        const guardian = this.search(newsFilterDto.search, guardianProvider);
        const ny = this.search(newsFilterDto.search, nyTimesProvider);
        return merge(guardian, ny).pipe(
          reduce((acc, value) => [...acc, ...value]),
        );
      case 'guardian':
        return this.search(newsFilterDto.search, guardianProvider);
      case 'ny':
        return this.search(newsFilterDto.search, nyTimesProvider);
      default:
        throw new BadRequestException('Unsupported provider');
    }
  }

  search<T>(search: string, provider: ProviderDto<T>): Observable<News[]> {
    const query = provider.url + `&q=${search}&api-key=${provider.apiKey}`;
    return this.httpService.get<T>(query).pipe(
      map(res => res.data),
      map(provider.parser),
    );
  }
}

