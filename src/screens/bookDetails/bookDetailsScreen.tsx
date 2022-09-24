import React, { useCallback, useEffect, useState } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Alert,
  Pressable,
  Image,
  Linking,
} from 'react-native';
import { HeartIcon } from '../../assets/image';
import BookDesign from '../../components/BookDesign/bookDesign';
import {
  getDetailBook,
  IResponseGetDetailBook,
} from '../../service/api/book/getDetailBook';
import { dateFormat } from '../../util/date.utils';
import { tagsHtmlRegex } from '../../util/regex.utils';

import styles from './bookDetails.styles';

const BookDetailsScreen = ({ navigation, route: { params } }) => {
  const [bookResult, setBookResult] = useState<IResponseGetDetailBook>();

  const handleBuy = useCallback(async () => {
    await Linking.openURL(bookResult!.saleInfo.buyLink);
  }, [bookResult]);

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
          <Image source={HeartIcon} style={styles.favoriteImage} />

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
