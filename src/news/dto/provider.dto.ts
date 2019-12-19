import { News, NYTimes } from '../interfaces /news.interface';
import { guardianProvider } from '../news_providers/guardian';

export class ProviderDto<T> {
  apiKey: string;
  url: string;
  parser: (res: T) => News[];
  constructor(url: string, parser: (res: T) => News[]) {
    this.apiKey = '';
    this.url = url;
    this.parser = parser;
  }

  init(apiKey: string | undefined) {
    this.apiKey = apiKey ? apiKey : '';
    return this;
  }
}
