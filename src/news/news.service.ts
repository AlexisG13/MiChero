import { Injectable } from '@nestjs/common';

@Injectable()
export class NewsService {
  async searchNews(search: string, provider?: string): Promise<void> {
    // let news: any[];
    // switch (provider) {
    //   case undefined:
    //     guardianSearch(search);
    //     nySearch(search);
    //     break;
    //   case 'guardian':
    //     guardianSearch(search);
    //     break;
    //   case 'ny':
    //     nySearch(search);
    //     break;
    //   default:
    //   // Error unknown news provider.
    // }
    return;
  }
}
