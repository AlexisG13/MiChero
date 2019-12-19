import {
  Injectable,
  HttpService,
  BadRequestException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { map, catchError } from 'rxjs/operators';
import { Observable, forkJoin } from 'rxjs';
import { News } from './interfaces /news.interface';
import { NewsFilterDto } from './dto/get_news_filter.dto';
import { ProviderDto } from './dto/provider.dto';
import { guardianProvider } from './news_providers/guardian';
import { nyTimesProvider } from './news_providers/nytimes';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NewsService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}
  availableProviders = new Map()
    .set(
      'ny',
      nyTimesProvider.init(this.configService.get<string>('NY_API_KEY')),
    )
    .set(
      'guardian',
      guardianProvider.init(this.configService.get<string>('GUARDIAN_API_KEY')),
    );

  searchAllProviders(search: string): Observable<News[]> {
    const news: Array<Observable<News[]>> = [];
    this.availableProviders.forEach(provider => {
      news.push(this.searchSingleProvider(search, provider));
    });
    return forkJoin(...news);
  }

  searchSingleProvider<T>(
    search: string,
    provider: ProviderDto<T>,
  ): Observable<News[]> {
    const query = provider.url + `&q=${search}&api-key=${provider.apiKey}`;
    return this.httpService.get<T>(query).pipe(
      map(res => res.data),
      catchError(err => {
        throw new UnprocessableEntityException(
          'An error ocurred with the provider API',
        );
      }),
      map(provider.parser),
    );
  }

  searchNews(newsFilterDto: NewsFilterDto): Observable<News[]> {
    if (!newsFilterDto.provider) {
      return this.searchAllProviders(newsFilterDto.search);
    }
    const newsProvider = this.availableProviders.get(newsFilterDto.provider);
    if (!newsProvider) {
      throw new BadRequestException('An unknown provider was given');
    }
    return this.searchSingleProvider(newsFilterDto.search, newsProvider);
  }
}
