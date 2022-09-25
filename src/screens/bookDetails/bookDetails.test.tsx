import {
  render,
  screen,
  waitFor,
  fireEvent,
  cleanup,
} from '@testing-library/react-native';
import BookDetailsScreen from './bookDetailsScreen';
import React from 'react';
import { GoogleService } from '../../service/api_service';
import Toast from 'react-native-toast-message';
import { Linking } from 'react-native';

jest.mock('../../service/api_service');
jest.mock('react-native-toast-message');

const mockEndpointSuccess = {
  kind: 'books#volume',
  id: 'rDA4EAAAQBAJ',
  etag: 'ivT26ux/pp4',
  selfLink: 'https://www.googleapis.com/books/v1/volumes/rDA4EAAAQBAJ',
  volumeInfo: {
    title: 'A cabana do Pai Tomás',
    subtitle: 'ou a vida entre os humildes',
    authors: ['Harriet Beecher Stowe'],
    publisher: 'Carambaia',
    publishedDate: '2021-07-15',
    description:
      '<p> <b> Um romance abolicionista, fenômeno literário do século XIX, que vem acompanhado de extenso dossiê crítico sobre a obra. </b> </p> <p> <i>A cabana do pai Tomás </i>(1852) chegou aos nossos dias um pouco obscurecido, sendo mais comum encontrá-lo em versões adaptadas para o público infantojuvenil do que em seu texto original. No entanto, o romance da americana Harriet Beecher Stowe (1811-1896), publicado inicialmente em forma serializada na imprensa, não economiza esforços em produzir emoções, mesmo para os leitores de hoje. Com a história do escravo Tom – ou Tomás, como se consagrou traduzir no Brasil – se entrelaçam episódios de ação, humor e sentimentalismo, além do mais importante, sérias discussões sobre a escravidão. Foi afinal como marco do abolicionismo que <i>A cabana do pai Tomás</i> ganhou fama e proeminência, a ponto de alguns historiadores o apontarem como um dos deflagradores da Guerra Civil Americana (1861-1865), pelo papel de libelo que exerceu. </p> <p>Para atualizar a obra e refletir criticamente sobre ela, a edição da CARAMBAIA traz, nos apêndices, um vasto material composto por artigos publicados na imprensa estrangeira e brasileira destacando a repercussão da obra. O dossiê foi organizado pelo historiador Danilo José Zioni Ferretti, professor da Universidade Federal de São João del Rei (MG), e é fruto de uma pesquisa desenvolvida em arquivos no Brasil, na França e em Portugal. O pesquisador também assina o posfácio da edição, na qual descreve o imenso impacto de <i>A cabana do pai Tomás</i>. Nos Estados Unidos e também na Europa e América do Sul, o romance chegou a provocar uma espécie de fenômeno de massa, com a proliferação de versões teatrais e circenses e produtos como pinturas, bibelôs e jogos infantis. O posfácio aborda a reação negativa imediata de escritores escravistas ao romance de Harriet Beecher Stowe e as diferentes estratégias antiescravistas que alimentaram o debate em torno dele. Nas críticas recebidas pelo livro no Brasil, não faltam comparações entre as condições de vida dos escravos norte-americanos e a realidade brasileira, de um cativeiro supostamente mais benévolo e humanitário. </p> <p>Com o passar do tempo, em particular no auge da luta pelos direitos civis nos Estados Unidos, em meados do século XX, <i>A cabana do pai Tomás</i> passou a sofrer duras críticas dos líderes negros, por eleger como símbolo do abolicionismo um personagem submisso, passivo e idealizado ao ponto da santificação. Outros personagens também foram identificados com estereótipos da população negra. Dessa forma, o símbolo do abolicionismo do século XIX ficou, um século depois, marcado como um romance de traços racistas.</p>',
    industryIdentifiers: [
      {
        type: 'ISBN_10',
        identifier: '6586398339',
      },
      {
        type: 'ISBN_13',
        identifier: '9786586398335',
      },
    ],
    readingModes: {
      text: true,
      image: true,
    },
    pageCount: 704,
    printedPageCount: 735,
    printType: 'BOOK',
    categories: ['Fiction / Classics', 'Fiction / Romance / General'],
    maturityRating: 'NOT_MATURE',
    allowAnonLogging: false,
    contentVersion: '1.3.3.0.preview.3',
    panelizationSummary: {
      containsEpubBubbles: false,
      containsImageBubbles: false,
    },
    imageLinks: {
      smallThumbnail:
        'http://books.google.com/books/publisher/content?id=rDA4EAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE70PjhPqvI9uFJcNQUhkXeYEDWd9-j8Ns1SoTIf1gjllo9XLmE4_h9X7QtemIEQYosjprghdqvUMz-d3iMWKvikj3Lhsk356HKbMWaQ40aNbhkjvyM05aT-609lrYfsJEquRvsr6&source=gbs_api',
      thumbnail:
        'http://books.google.com/books/publisher/content?id=rDA4EAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE73oTF6zE50y18PzI4ockbkq5E8lupqEo3Cyolh9_QHSBtpa-p8SZ0c2iD3qPrHsfb-fIYGc6fwG5JrN31LqkcOILqWgaHeriOh_oCkQr3vYVNDZFsuSIXeOZSKMaGiLp7UPcVKT&source=gbs_api',
      small:
        'http://books.google.com/books/publisher/content?id=rDA4EAAAQBAJ&printsec=frontcover&img=1&zoom=2&edge=curl&imgtk=AFLRE70hk9YPJVEkjdyC9TIcLeCiEmGt2ww5GlyMDs6GxxoK_UUwNiwzGRKnpNAvOAQS2XaVf3EvELB0oPog41Xo0MhTvBSTjxcWkJKqu3nrkrkXRuz2EOCNrZCKAUZhpmGpuV4LR7Nv&source=gbs_api',
      medium:
        'http://books.google.com/books/publisher/content?id=rDA4EAAAQBAJ&printsec=frontcover&img=1&zoom=3&edge=curl&imgtk=AFLRE72Q14UHs9HDa1dUvhRBEiTeFVmxOaw_hBXIxF9e76sHYvvNnZd7XaML5VZ4PZSsCTD2aO1-5zJjp7xefzsjb8aBKHk0jC3Vc5uyPsh-pdS2OC1eVVgkAzY28bhC_wMUGImD-a46&source=gbs_api',
      large:
        'http://books.google.com/books/publisher/content?id=rDA4EAAAQBAJ&printsec=frontcover&img=1&zoom=4&edge=curl&imgtk=AFLRE737gLyU0weEhkI6QRRr6nldeOflAjg__HRpEk-8O1xNX9GmZ0WnCkB4dGtme7I-BfYoBcwD4Oz9lVeHNzMYSinkOPiRFtjG8mvF9ES-Y9z2sD3zpTv2UfFt-ay2uDNuS5nya7jj&source=gbs_api',
      extraLarge:
        'http://books.google.com/books/publisher/content?id=rDA4EAAAQBAJ&printsec=frontcover&img=1&zoom=6&edge=curl&imgtk=AFLRE724IfROJfXLxeKRlw30TcWZ2EqqfgLOK0uE9XUn6RsRJ57gLb1Vbh5LWEtkt_dQOwTCVI0ILNFom3DuRJwewL9Jqd3yaJryhOLS-KU7Ri4mKIXWHEdhxaAjkDvTjPWI7LinWJ6k&source=gbs_api',
    },
    language: 'pt-BR',
    previewLink:
      'http://books.google.com.br/books?id=rDA4EAAAQBAJ&hl=&source=gbs_api',
    infoLink:
      'https://play.google.com/store/books/details?id=rDA4EAAAQBAJ&source=gbs_api',
    canonicalVolumeLink:
      'https://play.google.com/store/books/details?id=rDA4EAAAQBAJ',
  },
  layerInfo: {
    layers: [
      {
        layerId: 'geo',
        volumeAnnotationsVersion: '4',
      },
    ],
  },
  saleInfo: {
    country: 'BR',
    saleability: 'FOR_SALE',
    isEbook: true,
    listPrice: {
      amount: 39.9,
      currencyCode: 'BRL',
    },
    retailPrice: {
      amount: 39.9,
      currencyCode: 'BRL',
    },
    buyLink:
      'https://play.google.com/store/books/details?id=rDA4EAAAQBAJ&rdid=book-rDA4EAAAQBAJ&rdot=1&source=gbs_api',
    offers: [
      {
        finskyOfferType: 1,
        listPrice: {
          amountInMicros: 39900000,
          currencyCode: 'BRL',
        },
        retailPrice: {
          amountInMicros: 39900000,
          currencyCode: 'BRL',
        },
        giftable: true,
      },
    ],
  },
  accessInfo: {
    country: 'BR',
    viewability: 'PARTIAL',
    embeddable: true,
    publicDomain: false,
    textToSpeechPermission: 'ALLOWED',
    epub: {
      isAvailable: true,
      acsTokenLink:
        'http://books.google.com.br/books/download/A_cabana_do_Pai_Tom%C3%A1s-sample-epub.acsm?id=rDA4EAAAQBAJ&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api',
    },
    pdf: {
      isAvailable: true,
      acsTokenLink:
        'http://books.google.com.br/books/download/A_cabana_do_Pai_Tom%C3%A1s-sample-pdf.acsm?id=rDA4EAAAQBAJ&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api',
    },
    webReaderLink:
      'http://play.google.com/books/reader?id=rDA4EAAAQBAJ&hl=&printsec=frontcover&source=gbs_api',
    accessViewStatus: 'SAMPLE',
    quoteSharingAllowed: false,
  },
};

describe('Book Details screen', () => {
  beforeEach(cleanup);

  it('should render correctly', async () => {
    const navigation = {};

    const route = {
      params: {},
    };

    render(<BookDetailsScreen navigation={navigation} route={route} />);

    await waitFor(() => {
      expect(screen.toJSON()).toMatchSnapshot();
    });
  });

  it('should render correctly and endpoint return success', async () => {
    const navigation = {};

    const route = {
      params: {
        id: '102030',
      },
    };

    (GoogleService.get as jest.Mock).mockImplementation(() =>
      Promise.resolve({
        status: 200,
        data: mockEndpointSuccess,
      }),
    );

    render(<BookDetailsScreen navigation={navigation} route={route} />);

    await waitFor(() => {
      expect(screen.toJSON()).toMatchSnapshot();
    });
  });

  it('should render correctly and endpoint return error', async () => {
    const mockPop = jest.fn();

    const navigation = {
      pop: mockPop,
    };

    const route = {
      params: {
        id: '102030',
      },
    };

    (GoogleService.get as jest.Mock).mockRejectedValueOnce({
      response: {
        status: 422,
        data: {},
      },
    });

    render(<BookDetailsScreen navigation={navigation} route={route} />);

    await waitFor(() => {
      expect(mockPop).toBeCalled();
    });
  });

  it('should click in button favorite', async () => {
    const mockPop = jest.fn();

    const navigation = {
      pop: mockPop,
    };

    const route = {
      params: {
        id: '102030',
      },
    };

    (GoogleService.get as jest.Mock).mockImplementation(() =>
      Promise.resolve({
        status: 200,
        data: mockEndpointSuccess,
      }),
    );

    render(<BookDetailsScreen navigation={navigation} route={route} />);

    await waitFor(async () => {
      const buttonFavorite = screen.getByTestId('bookDetails_button_favorite');

      fireEvent.press(buttonFavorite);

      expect(Toast.show).toBeCalledWith({
        text1: 'Adicionado como favorito',
        type: 'success',
      });
    });

    await waitFor(async () => {
      const buttonFavorite = await screen.getByTestId(
        'bookDetails_button_favorite',
      );

      fireEvent.press(buttonFavorite);

      expect(Toast.show).toBeCalledWith({
        text1: 'Removido com sucesso',
        type: 'success',
      });
    });
  });

  it('should click in buy book', async () => {
    const mockPop = jest.fn();

    const navigation = {
      pop: mockPop,
    };

    const route = {
      params: {
        id: '102030',
      },
    };

    (GoogleService.get as jest.Mock).mockImplementation(() =>
      Promise.resolve({
        status: 200,
        data: mockEndpointSuccess,
      }),
    );

    render(<BookDetailsScreen navigation={navigation} route={route} />);

    await waitFor(async () => {
      const buttonFavorite = await screen.getByTestId(
        'bookDetails_button_buyBook',
      );

      fireEvent.press(buttonFavorite);
    });

    await waitFor(async () => {
      expect(Linking.openURL).toBeCalledWith(
        'https://play.google.com/store/books/details?id=rDA4EAAAQBAJ&rdid=book-rDA4EAAAQBAJ&rdot=1&source=gbs_api',
      );
    });
  });
});
