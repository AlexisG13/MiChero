import { News, NYTimes } from '../interfaces /news.interface';
import { guardianProvider } from '../news_providers/guardian';

export class ProviderDto<T> {
  apiKey: string;
  url: string;
  parser: (res: T) => News[];
  constructor(apiKey: string, url: string, parser: (res: T) => News[]) {
    this.apiKey = apiKey;
    this.url = url;
    this.parser = parser;
  }
}

export const newsProviders = new Map();
