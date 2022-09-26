export type TContryItem = 'BR';

export type TSaleInfoItem = {
  country: TContryItem;
  isEbook: boolean;
  saleability: string;
  buyLink: string;
};

export type TAcessInfoItem = {
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

export type TVolumeInfo = {
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
