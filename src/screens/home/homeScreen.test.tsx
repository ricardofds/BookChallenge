import { RouteProp } from '@react-navigation/native';
import {
  render,
  screen,
  waitFor,
  act,
  fireEvent,
  cleanup,
} from '@testing-library/react-native';
import React from 'react';
import { RootStackParamList } from '../../routes/types';
import { GoogleService } from '../../service/api_service';
import HomeScreen from './homeScreen';
import { useMMKVString } from 'react-native-mmkv';
import { storage } from '../../service/storage_service';
import { keysStorage } from '../../constants/storage';

jest.mock('../../service/api_service');

const mockSuccessEndpoint = {
  kind: 'books#volumes',
  totalItems: 565,
  items: [
    {
      kind: 'books#volume',
      id: 'EF_jESQMqTgC',
      etag: 'TYzTrvdMGbY',
      selfLink: 'https://www.googleapis.com/books/v1/volumes/EF_jESQMqTgC',
      volumeInfo: {
        title: 'Kapil Dev',
        subtitle: 'Triumph of the Spirit',
        authors: ['Romi Dev'],
        publisher: 'Allied Publishers',
        publishedDate: '1994',
        description:
          'Contributed articles on Kapil Dev, b. 1959, Indian cricket player.',
        industryIdentifiers: [
          {
            type: 'ISBN_13',
            identifier: '9788170234029',
          },
          {
            type: 'ISBN_10',
            identifier: '8170234026',
          },
        ],
        readingModes: {
          text: false,
          image: true,
        },
        pageCount: 154,
        printType: 'BOOK',
        categories: ['Cricket players'],
        averageRating: 4.5,
        ratingsCount: 2,
        maturityRating: 'NOT_MATURE',
        allowAnonLogging: false,
        contentVersion: '1.1.1.0.preview.1',
        imageLinks: {
          smallThumbnail:
            'http://books.google.com/books/content?id=EF_jESQMqTgC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
          thumbnail:
            'http://books.google.com/books/content?id=EF_jESQMqTgC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
        },
        language: 'en',
        previewLink:
          'http://books.google.com.br/books?id=EF_jESQMqTgC&pg=PA76&dq=%27dev&hl=&cd=1&source=gbs_api',
        infoLink:
          'http://books.google.com.br/books?id=EF_jESQMqTgC&dq=%27dev&hl=&source=gbs_api',
        canonicalVolumeLink:
          'https://books.google.com/books/about/Kapil_Dev.html?hl=&id=EF_jESQMqTgC',
      },
      saleInfo: {
        country: 'BR',
        saleability: 'NOT_FOR_SALE',
        isEbook: false,
      },
      accessInfo: {
        country: 'BR',
        viewability: 'PARTIAL',
        embeddable: true,
        publicDomain: false,
        textToSpeechPermission: 'ALLOWED',
        epub: {
          isAvailable: false,
        },
        pdf: {
          isAvailable: false,
        },
        webReaderLink:
          'http://play.google.com/books/reader?id=EF_jESQMqTgC&hl=&printsec=frontcover&source=gbs_api',
        accessViewStatus: 'SAMPLE',
        quoteSharingAllowed: false,
      },
      searchInfo: {
        textSnippet:
          'My heartiest congratulations to Kapil <b>Dev</b> tor surpassing the milestone of 431 wickets. It is a truly remarkable achievement because I don&#39;t think people yet appreciate the enormous effort and unflinching motivation that has gone into&nbsp;...',
      },
    },
    {
      kind: 'books#volume',
      id: '3FkOAAAAYAAJ',
      etag: 'RftxMC5MVcw',
      selfLink: 'https://www.googleapis.com/books/v1/volumes/3FkOAAAAYAAJ',
      volumeInfo: {
        title: 'Kesava Dev',
        authors: ['Ke. Pi Śaśidharan'],
        publishedDate: '1990',
        industryIdentifiers: [
          {
            type: 'OTHER',
            identifier: 'UVA:X001972270',
          },
        ],
        readingModes: {
          text: false,
          image: false,
        },
        pageCount: 91,
        printType: 'BOOK',
        maturityRating: 'NOT_MATURE',
        allowAnonLogging: false,
        contentVersion: '2.4.3.0.preview.0',
        panelizationSummary: {
          containsEpubBubbles: false,
          containsImageBubbles: false,
        },
        imageLinks: {
          smallThumbnail:
            'http://books.google.com/books/content?id=3FkOAAAAYAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api',
          thumbnail:
            'http://books.google.com/books/content?id=3FkOAAAAYAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
        },
        language: 'en',
        previewLink:
          'http://books.google.com.br/books?id=3FkOAAAAYAAJ&q=%27dev&dq=%27dev&hl=&cd=2&source=gbs_api',
        infoLink:
          'http://books.google.com.br/books?id=3FkOAAAAYAAJ&dq=%27dev&hl=&source=gbs_api',
        canonicalVolumeLink:
          'https://books.google.com/books/about/Kesava_Dev.html?hl=&id=3FkOAAAAYAAJ',
      },
      saleInfo: {
        country: 'BR',
        saleability: 'NOT_FOR_SALE',
        isEbook: false,
      },
      accessInfo: {
        country: 'BR',
        viewability: 'NO_PAGES',
        embeddable: false,
        publicDomain: false,
        textToSpeechPermission: 'ALLOWED',
        epub: {
          isAvailable: false,
        },
        pdf: {
          isAvailable: false,
        },
        webReaderLink:
          'http://play.google.com/books/reader?id=3FkOAAAAYAAJ&hl=&printsec=frontcover&source=gbs_api',
        accessViewStatus: 'NONE',
        quoteSharingAllowed: false,
      },
      searchInfo: {
        textSnippet:
          'Kesava <b>Dev</b> (1904-83), primarily a socialist and a realist, was a novelist, short story writer, playwright, critic and social reformer. Identified himself with the lower strata of society, he held revolutionary ideas.',
      },
    },
    {
      kind: 'books#volume',
      id: '5fQ_AAAAIAAJ',
      etag: '0jEh4s5kydQ',
      selfLink: 'https://www.googleapis.com/books/v1/volumes/5fQ_AAAAIAAJ',
      volumeInfo: {
        title: 'Doctor Dev',
        authors: ['Amrita Pritam'],
        publishedDate: '1968',
        description: 'Novel.',
        industryIdentifiers: [
          {
            type: 'OTHER',
            identifier: 'UCAL:$B123591',
          },
        ],
        readingModes: {
          text: false,
          image: false,
        },
        pageCount: 114,
        printType: 'BOOK',
        maturityRating: 'NOT_MATURE',
        allowAnonLogging: false,
        contentVersion: '0.5.6.0.preview.0',
        panelizationSummary: {
          containsEpubBubbles: false,
          containsImageBubbles: false,
        },
        imageLinks: {
          smallThumbnail:
            'http://books.google.com/books/content?id=5fQ_AAAAIAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api',
          thumbnail:
            'http://books.google.com/books/content?id=5fQ_AAAAIAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
        },
        language: 'en',
        previewLink:
          'http://books.google.com.br/books?id=5fQ_AAAAIAAJ&q=%27dev&dq=%27dev&hl=&cd=3&source=gbs_api',
        infoLink:
          'http://books.google.com.br/books?id=5fQ_AAAAIAAJ&dq=%27dev&hl=&source=gbs_api',
        canonicalVolumeLink:
          'https://books.google.com/books/about/Doctor_Dev.html?hl=&id=5fQ_AAAAIAAJ',
      },
      saleInfo: {
        country: 'BR',
        saleability: 'NOT_FOR_SALE',
        isEbook: false,
      },
      accessInfo: {
        country: 'BR',
        viewability: 'NO_PAGES',
        embeddable: false,
        publicDomain: false,
        textToSpeechPermission: 'ALLOWED',
        epub: {
          isAvailable: false,
        },
        pdf: {
          isAvailable: false,
        },
        webReaderLink:
          'http://play.google.com/books/reader?id=5fQ_AAAAIAAJ&hl=&printsec=frontcover&source=gbs_api',
        accessViewStatus: 'NONE',
        quoteSharingAllowed: false,
      },
    },
    {
      kind: 'books#volume',
      id: 'PCQaSH_29i4C',
      etag: 'VSG9NGGm+Oc',
      selfLink: 'https://www.googleapis.com/books/v1/volumes/PCQaSH_29i4C',
      volumeInfo: {
        title: 'Guru Arjan Dev',
        authors: ['Mahindara Siṅgha Joshī'],
        publisher: 'Sahitya Akademi',
        publishedDate: '1994',
        description:
          'On the life and works of Guru Arjun, 1563-1606, Panjabi saint poet of India.',
        industryIdentifiers: [
          {
            type: 'ISBN_10',
            identifier: '8172017693',
          },
          {
            type: 'ISBN_13',
            identifier: '9788172017699',
          },
        ],
        readingModes: {
          text: false,
          image: true,
        },
        pageCount: 118,
        printType: 'BOOK',
        maturityRating: 'NOT_MATURE',
        allowAnonLogging: false,
        contentVersion: '0.4.2.0.preview.1',
        panelizationSummary: {
          containsEpubBubbles: false,
          containsImageBubbles: false,
        },
        imageLinks: {
          smallThumbnail:
            'http://books.google.com/books/content?id=PCQaSH_29i4C&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
          thumbnail:
            'http://books.google.com/books/content?id=PCQaSH_29i4C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
        },
        language: 'en',
        previewLink:
          'http://books.google.com.br/books?id=PCQaSH_29i4C&pg=PA69&dq=%27dev&hl=&cd=4&source=gbs_api',
        infoLink:
          'http://books.google.com.br/books?id=PCQaSH_29i4C&dq=%27dev&hl=&source=gbs_api',
        canonicalVolumeLink:
          'https://books.google.com/books/about/Guru_Arjan_Dev.html?hl=&id=PCQaSH_29i4C',
      },
      saleInfo: {
        country: 'BR',
        saleability: 'NOT_FOR_SALE',
        isEbook: false,
      },
      accessInfo: {
        country: 'BR',
        viewability: 'PARTIAL',
        embeddable: true,
        publicDomain: false,
        textToSpeechPermission: 'ALLOWED',
        epub: {
          isAvailable: false,
        },
        pdf: {
          isAvailable: false,
        },
        webReaderLink:
          'http://play.google.com/books/reader?id=PCQaSH_29i4C&hl=&printsec=frontcover&source=gbs_api',
        accessViewStatus: 'SAMPLE',
        quoteSharingAllowed: false,
      },
      searchInfo: {
        textSnippet:
          'In one of his moods Guru Arjan <b>Dev</b> took up the task of remembering the Lord by various names current among His Hindu devotees , but when on completion of the usual forty - eight lines he felt the job had not been done adequately&nbsp;...',
      },
    },
  ],
};

describe('Home Screen', () => {
  beforeEach(cleanup);

  it('should render correctly', async () => {
    const navigation: any = {
      navigate: jest.fn(),
    };

    const route: RouteProp<RootStackParamList, 'Home'> = {
      params: undefined,
      key: '',
      name: 'Home',
    };

    render(<HomeScreen navigation={navigation} route={route} />);

    await waitFor(async () => expect(screen.toJSON()).toMatchSnapshot());
  });

  it('should change value and send request', async () => {
    const navigation: any = {
      navigate: jest.fn(),
    };

    (GoogleService.get as jest.Mock).mockImplementation(() =>
      Promise.resolve({
        status: 200,
        data: mockSuccessEndpoint,
      }),
    );

    const route: RouteProp<RootStackParamList, 'Home'> = {
      params: undefined,
      key: '',
      name: 'Home',
    };

    render(<HomeScreen navigation={navigation} route={route} />);

    const input = screen.getByTestId('homeScreen__inputSearch');

    await act(async () => {
      fireEvent.changeText(input, 'IBM');
    });

    await waitFor(async () => expect(screen.toJSON()).toMatchSnapshot());

    expect(input.props.value).toBe('IBM');
  });

  it('should click in the book and redirect by details', async () => {
    const mockNavigate = jest.fn();

    const navigation: any = {
      navigate: mockNavigate,
    };

    (GoogleService.get as jest.Mock).mockImplementation(() =>
      Promise.resolve({
        status: 200,
        data: mockSuccessEndpoint,
      }),
    );

    const route: RouteProp<RootStackParamList, 'Home'> = {
      params: undefined,
      key: '',
      name: 'Home',
    };

    render(<HomeScreen navigation={navigation} route={route} />);

    const input = screen.getByTestId('homeScreen__inputSearch');

    await act(async () => {
      fireEvent.changeText(input, 'IBM');
    });

    const cardFrist = screen.getByTestId('book_design__action__0');

    await act(async () => {
      fireEvent.press(cardFrist);
    });

    expect(mockNavigate).toBeCalledWith('BookDetail', {
      id: 'EF_jESQMqTgC',
      title: 'Kapil Dev',
    });
  });

  it('should clear search', async () => {
    const mockNavigate = jest.fn();

    const navigation: any = {
      navigate: mockNavigate,
    };

    (GoogleService.get as jest.Mock).mockImplementation(() =>
      Promise.resolve({
        status: 200,
        data: mockSuccessEndpoint,
      }),
    );

    const route: RouteProp<RootStackParamList, 'Home'> = {
      params: undefined,
      key: '',
      name: 'Home',
    };

    render(<HomeScreen navigation={navigation} route={route} />);

    const input = screen.getByTestId('homeScreen__inputSearch');

    await act(async () => {
      fireEvent.changeText(input, 'TESTE');
    });

    const buttonClear = screen.getByTestId('homeScreen__clearSearch');

    await act(async () => {
      fireEvent.press(buttonClear);
    });

    expect(input.props.value).toBe('');
  });

  it('should next page in list search', async () => {
    const navigation: any = {
      navigate: jest.fn(),
    };

    (GoogleService.get as jest.Mock).mockImplementation(() =>
      Promise.resolve({
        status: 200,
        data: mockSuccessEndpoint,
      }),
    );

    const route: RouteProp<RootStackParamList, 'Home'> = {
      params: undefined,
      key: '',
      name: 'Home',
    };

    render(<HomeScreen navigation={navigation} route={route} />);

    const input = screen.getByTestId('homeScreen__inputSearch');

    await act(async () => {
      fireEvent.changeText(input, 'TESTE');
    });

    const listItem = screen.getByTestId('homeScreen__listItem');

    expect(listItem.props.data.length).toBe(4);

    const eventData = {
      nativeEvent: {
        contentOffset: {
          y: 500,
        },
        contentSize: {
          // Dimensions of the scrollable content
          height: 500,
          width: 100,
        },
        layoutMeasurement: {
          // Dimensions of the device
          height: 100,
          width: 100,
        },
      },
    };

    await act(async () => {
      fireEvent.scroll(listItem, eventData);
    });

    expect(listItem.props.data.length).toBe(8);
  });

  it('should error in endpoint', async () => {
    const mockNavigate = jest.fn();

    const navigation: any = {
      navigate: mockNavigate,
    };

    (GoogleService.get as jest.Mock).mockRejectedValueOnce({
      response: {
        status: 422,
        data: {},
      },
    });

    const route: RouteProp<RootStackParamList, 'Home'> = {
      params: undefined,
      key: '',
      name: 'Home',
    };

    render(<HomeScreen navigation={navigation} route={route} />);

    const input = screen.getByTestId('homeScreen__inputSearch');

    await act(async () => {
      fireEvent.changeText(input, 'IBM');
    });

    await waitFor(async () =>
      expect(
        screen.getByText('Pesquise e encontre os melhores livros'),
      ).toBeTruthy(),
    );
  });

  it('should render favorite and redirect from details', async () => {
    const dataFavorite = {
      id: 'teste',
      title: 'Livro teste unitário',
      image: '',
    };

    storage.set(keysStorage.favorite.list, JSON.stringify([dataFavorite]));

    const mockNavigate = jest.fn();

    const navigation: any = {
      navigate: mockNavigate,
    };

    const route: RouteProp<RootStackParamList, 'Home'> = {
      params: undefined,
      key: '',
      name: 'Home',
    };

    render(<HomeScreen navigation={navigation} route={route} />);

    const cardFrist = screen.getByTestId('book_design__action__0');

    await act(async () => {
      fireEvent.press(cardFrist);
    });

    expect(mockNavigate).toBeCalledWith('BookDetail', {
      id: 'teste',
      title: 'Livro teste unitário',
    });
  });

  it('should next page in list search and enpoint return error', async () => {
    const navigation: any = {
      navigate: jest.fn(),
    };

    (GoogleService.get as jest.Mock).mockImplementation(() =>
      Promise.resolve({
        status: 200,
        data: mockSuccessEndpoint,
      }),
    );

    const route: RouteProp<RootStackParamList, 'Home'> = {
      params: undefined,
      key: '',
      name: 'Home',
    };

    render(<HomeScreen navigation={navigation} route={route} />);

    const input = screen.getByTestId('homeScreen__inputSearch');

    await act(async () => {
      fireEvent.changeText(input, 'TESTE');
    });

    const listItem = screen.getByTestId('homeScreen__listItem');

    expect(listItem.props.data.length).toBe(4);

    (GoogleService.get as jest.Mock).mockRejectedValueOnce({
      response: {
        status: 422,
        data: {},
      },
    });

    const eventData = {
      nativeEvent: {
        contentOffset: {
          y: 500,
        },
        contentSize: {
          // Dimensions of the scrollable content
          height: 500,
          width: 100,
        },
        layoutMeasurement: {
          // Dimensions of the device
          height: 100,
          width: 100,
        },
      },
    };

    await act(async () => {
      fireEvent.scroll(listItem, eventData);
    });

    expect(listItem.props.data.length).toBe(4);
  });
});
