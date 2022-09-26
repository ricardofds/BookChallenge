export type TFavoriteItem = {
  id: string;
  title: string;
  image: string;
};

export type RootStackParamList = {
  Home: undefined;
  Welcome: undefined;
  BookDetail: { id: string; title: string };
};
