import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useMMKVString } from 'react-native-mmkv';
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Alert,
  Pressable,
  Image,
  Linking,
  ToastAndroid,
} from 'react-native';
import { HeartIcon, HeartRedIcon } from '../../assets/image';
import BookDesign from '../../components/BookDesign/bookDesign';
import { keysStorage } from '../../constants/storage';
import {
  getDetailBook,
  IResponseGetDetailBook,
} from '../../service/api/book/getDetailBook';
import { dateFormat } from '../../util/date.utils';
import { tagsHtmlRegex } from '../../util/regex.utils';

import styles from './bookDetails.styles';

type TFavoriteItem = {
  id: string;
  title: string;
  image: string;
};

const BookDetailsScreen = ({ navigation, route: { params } }) => {
  const [bookResult, setBookResult] = useState<IResponseGetDetailBook>();
  const [favorite, setFavorite] = useMMKVString(keysStorage.favorite.list);

  const favoriteList = JSON.parse(favorite || '[]') as Array<TFavoriteItem>;

  const isFavorite = useMemo(
    () => favoriteList.some(({ id }) => id === params.id),
    [favoriteList, params.id],
  );

  const handleBuy = useCallback(async () => {
    await Linking.openURL(bookResult!.saleInfo.buyLink);
  }, [bookResult]);

  const handleFavorite = useCallback(() => {
    const data = {
      id: params.id,
      title: bookResult?.volumeInfo.title,
      image: bookResult?.volumeInfo.imageLinks.thumbnail,
    };

    const filterFavorite = favoriteList.find(({ id }) => id === params.id);

    if (!filterFavorite) {
      setFavorite(JSON.stringify([...favoriteList, data]));

      ToastAndroid.showWithGravity(
        'Adicionado como favorito',
        ToastAndroid.TOP,
        ToastAndroid.CENTER,
      );
    } else {
      const filterActive = favoriteList.filter(({ id }) => id !== params.id);

      setFavorite(JSON.stringify([...filterActive]));

      ToastAndroid.showWithGravity(
        'Removido com sucesso',
        ToastAndroid.TOP,
        ToastAndroid.CENTER,
      );
    }
  }, [
    bookResult?.volumeInfo.imageLinks.thumbnail,
    bookResult?.volumeInfo.title,
    favoriteList,
    params.id,
    setFavorite,
  ]);

  const getDetail = useCallback(async () => {
    try {
      const data = await getDetailBook({ id: params.id });

      setBookResult(data);
    } catch (err) {
      navigation.pop();
      Alert.alert('Livro não encontrado');
    }
  }, [navigation, params.id]);

  useEffect(() => {
    getDetail();
  }, [getDetail]);

  return (
    <SafeAreaView style={styles.safeView}>
      <ScrollView>
        <View style={styles.bookView}>
          <BookDesign
            image={bookResult?.volumeInfo.imageLinks.thumbnail}
            name={bookResult?.volumeInfo.title}
            onPress={() => {}}
          />
        </View>

        <View style={styles.favoriteAndBuyView}>
          <Pressable onPress={handleFavorite}>
            {isFavorite ? (
              <Image source={HeartRedIcon} style={styles.favoriteImageTrue} />
            ) : (
              <Image source={HeartIcon} style={styles.favoriteImage} />
            )}
          </Pressable>

          {!!bookResult?.saleInfo.buyLink && (
            <Pressable onPress={handleBuy}>
              <Text>Comprar</Text>
            </Pressable>
          )}
        </View>

        <View style={styles.aboutView}>
          {!!bookResult?.volumeInfo.description && (
            <View style={styles.aboutTextView}>
              <Text style={styles.aboutTitleText}>
                Descrição:{' '}
                <Text style={styles.aboutDescriptionText}>
                  {bookResult?.volumeInfo.description.replace(
                    tagsHtmlRegex,
                    '',
                  )}
                </Text>
              </Text>
            </View>
          )}

          {!!bookResult?.volumeInfo.authors && (
            <View style={styles.aboutTextView}>
              <Text style={styles.aboutTitleText}>
                Autor:{' '}
                <Text style={styles.aboutDescriptionText}>
                  {bookResult?.volumeInfo.authors}
                </Text>
              </Text>
            </View>
          )}

          {!!bookResult?.volumeInfo.publishedDate && (
            <View style={styles.aboutTextView}>
              <Text style={styles.aboutTitleText}>
                Publicado em:{' '}
                <Text style={styles.aboutDescriptionText}>
                  {dateFormat(new Date(bookResult?.volumeInfo.publishedDate))}
                </Text>
              </Text>
            </View>
          )}

          {!!bookResult?.volumeInfo.pageCount && (
            <View style={styles.aboutTextView}>
              <Text style={styles.aboutTitleText}>
                Num. págs:{' '}
                <Text style={styles.aboutDescriptionText}>
                  {bookResult?.volumeInfo.pageCount} páginas
                </Text>
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BookDetailsScreen;
