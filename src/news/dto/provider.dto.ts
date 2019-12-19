import { News, NYTimes } from '../interfaces /news.interface';

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
