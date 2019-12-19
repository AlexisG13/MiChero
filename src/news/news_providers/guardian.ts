import { ProviderDto} from '../dto/provider.dto';
import { Guardian, News } from '../interfaces /news.interface';

const url = 'https://content.guardianapis.com/search?&show-fields=byline';

function parser(res: Guardian): News[] {
  return res.response.results.map(gNew => {
    return {
      id: gNew.id,
      title: gNew.webTitle,
      sectionName: gNew.sectionName,
      author: gNew.fields.byline,
      documentType: gNew.type,
      publicationDate: gNew.webPublicationDate,
      webUrl: gNew.webUrl,
    };
  });
}
export const guardianProvider = new ProviderDto<Guardian>(url, parser);
