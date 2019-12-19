import { Injectable, HttpService, BadRequestException } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable, forkJoin } from 'rxjs';
import { News } from './interfaces /news.interface';
import { NewsFilterDto } from './dto/get_news_filter.dto';
import { ProviderDto } from './dto/provider.dto';
import { guardianProvider } from './news_providers/guardian';
import { nyTimesProvider } from './news_providers/nytimes';

@Injectable()
export class NewsService {
  constructor(private readonly httpService: HttpService) {}

  availableProviders = new Map()
    .set('ny', nyTimesProvider)
    .set('guardian', guardianProvider);

  searchAllProviders(search: string): Observable<News[]> {
    const news: Array<Observable<News[]>> = [];
    this.availableProviders.forEach(provider => {
      news.push(this.searchSingleProvider(search, provider));
    });
    return forkJoin(...news);
  }

  searchSingleProvider<T>(search: string, provider: ProviderDto<T>): Observable<News[]> {
    const query = provider.url + `&q=${search}&api-key=${provider.apiKey}`;
    return this.httpService.get<T>(query).pipe(
      map(res => res.data),
      map(provider.parser),
    );
  }

  searchNews(newsFilterDto: NewsFilterDto): Observable<News[]> {
    if (!newsFilterDto.provider) {
      return this.searchAllProviders(newsFilterDto.search);
    }
    const newsProvider = this.availableProviders.get(newsFilterDto.provider);
    if (!newsProvider) {
      throw new BadRequestException('Unknown provider');
    }
    return this.searchSingleProvider(newsFilterDto.search, newsProvider);
  }
}
