export interface News {
  id: string;
  title: string;
  sectionName: string;
  documentType: string;
  author: string;
  publicationDate: Date | string;
  webUrl: string;
}

export interface NYTimes {
  response: {
    docs: [
      {
        headline: { main: string };
        section_name: string;
        document_type: string;
        byline: {
          original: string;
        };
        _id: string;
        pub_date: string;
        web_url: string;
      },
    ];
  };
}

export interface Guardian {
  response: {
    results: [
      {
        webTitle: string;
        sectionName: string;
        type: string;
        id: string;
        webPublicationDate: string;
        webUrl: string;
        fields: {
          byline: string;
        };
      },
    ];
  };
}
