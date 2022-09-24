import { GoogleService, GOOGLE_KEY } from '../../api_service';

type TContryItem = 'BR';

type TSaleInfoItem = {
  country: TContryItem;
  isEbook: boolean;
  saleability: string;
};

type TAcessInfoItem = {
  accessViewStatus: string;
  country: TContryItem;
  embeddable: false;
  epub: {
    isAvailable: boolean;
  };
  pdf: {
    isAvailable: boolean;
  };
  publicDomain: boolean;
  quoteSharingAllowed: boolean;
  textToSpeechPermission: string;
  viewability: string;
  webReaderLink: string;
};

type TVolumeInfo = {
  allowAnonLogging: false;
  canonicalVolumeLink: string;
  categories: string[];
  contentVersion: string;
  description?: string;
  authors?: string[];
  pageCount?: number;
  imageLinks: {
    smallThumbnail: string;
    thumbnail?: string;
  };
  industryIdentifiers: string[];
  infoLink: string;
  language: string;
  maturityRating: string;
  panelizationSummary: {
    containsEpubBubbles: boolean;
    containsImageBubbles: boolean;
  };
  previewLink: string;
  printType: string;
  publishedDate: string;
  readingModes: {
    image: boolean;
    text: boolean;
  };
  subtitle: string;
  title: string;
};

export type TSearchBookItems = {
  accessInfo: TAcessInfoItem;
  etag: string;
  id: string;
  kind: string;
  saleInfo: TSaleInfoItem;
  searchInfo: {
    textSnippet: string;
  };
  selfLink: string;
  volumeInfo: TVolumeInfo;
};

interface IResponseGetSearchBook {
  items: TSearchBookItems[];
  kind: string;
  totalItems: number;
}

interface IGetSearchBookProps {
  keyword: string;
}

export const getSearchBook = async ({ keyword }: IGetSearchBookProps) => {
  try {
    const { data } = await GoogleService.get<IResponseGetSearchBook>(
      `/books/v1/volumes?q='${keyword}&key=${GOOGLE_KEY}&maxResults=10`,
    );

    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};
