import { ProviderDto, newsProviders } from '../dto/provider.dto';
import { Guardian, News } from '../interfaces /news.interface';

const apiKey = 'b104419d-7770-4fff-bd3e-a3489810e322';
const url = 'https://content.guardianapis.com/search?';

function parser(res: Guardian): News[] {
  return res.response.results.map(gNew => {
    return {
      id: gNew.id,
      title: gNew.webTitle,
      sectionName: gNew.sectionName,
      documentType: gNew.type,
      publicationDate: gNew.webPublicationDate,
      webUrl: gNew.webUrl,
    };
  });
}
export const guardianProvider = new ProviderDto<Guardian>(apiKey, url, parser);

newsProviders.set('guardian', guardianProvider);
