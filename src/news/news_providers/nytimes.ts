import { NYTimes, News } from '../interfaces /news.interface';
import { ProviderDto, newsProviders } from '../dto/provider.dto';

const apiKey = '9TAwfpEOCD4BeAFyywWv0vjzm9Udwt0O';
const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?&fl=headline,section_name,
   document_type,_id,pub_date,web_url`;

function parser(res: NYTimes): News[] {
  return res.response.docs.map(nyNew => {
    return {
      id: nyNew._id,
      title: nyNew.headline.main,
      sectionName: nyNew.section_name,
      documentType: nyNew.document_type,
      publicationDate: nyNew.pub_date,
      webUrl: nyNew.web_url,
    };
  });
}

export const nyTimesProvider = new ProviderDto<NYTimes>(apiKey, url, parser);

newsProviders.set('ny', nyTimesProvider);
