import { AxiosRequestConfig } from 'axios';
import { GoogleService, GOOGLE_KEY } from '../../api_service';

import { TVolumeInfo, TSaleInfoItem, TAcessInfoItem } from './types';

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
  keyword?: string;
  config?: AxiosRequestConfig<any> | undefined;
}

export const getSearchBook = async ({
  keyword,
  config,
}: IGetSearchBookProps) => {
  try {
    const { data } = await GoogleService.get<IResponseGetSearchBook>(
      `/books/v1/volumes?q='${keyword}&key=${GOOGLE_KEY}&maxResults=10`,
      config,
    );

    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};
