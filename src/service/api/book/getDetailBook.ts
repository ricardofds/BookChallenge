import { GoogleService, GOOGLE_KEY } from '../../api_service';
import { TAcessInfoItem, TSaleInfoItem, TVolumeInfo } from './types';

export interface IResponseGetDetailBook {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: TVolumeInfo;
  saleInfo: TSaleInfoItem;
  accessInfo: TAcessInfoItem;
}

interface IgetDetailBookProps {
  id: string;
}

export const getDetailBook = async ({ id }: IgetDetailBookProps) => {
  try {
    const { data } = await GoogleService.get<IResponseGetDetailBook>(
      `books/v1/volumes/${id}?&key=${GOOGLE_KEY}`,
    );

    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};
