import React, { useCallback, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  ListRenderItemInfo,
  Image,
} from 'react-native';
import { useMMKVString } from 'react-native-mmkv';
import BookDesign from '../../components/bookDesign/bookDesign';
import { keysStorage } from '../../constants/storage';
import { RootStackParamList, TFavoriteItem } from '../../routes/types';
import {
  getSearchBook,
  TSearchBookItems,
} from '../../service/api/book/getSearchBook';
import { BookIcon } from '../../assets/image';

import styles from './homeScreen.styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { storage } from '../../service/storage_service';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const [search, setSearch] = useState<TSearchBookItems[]>([]);
  const [page, setPage] = useState(20);
  const [inputValue, setInputValue] = useState('');
  const favorite = storage.getString(keysStorage.favorite.list);

  const favoriteList = JSON.parse(favorite || '[]') as Array<TFavoriteItem>;

  const changeInput = useCallback(async (keyword: string) => {
    try {
      setInputValue(keyword);
      const { items } = await getSearchBook({ keyword });

      setSearch(items);
    } catch (err) {
      setSearch([]);
    }
  }, []);

  const changePage = useCallback(async () => {
    try {
      const { items } = await getSearchBook({
        keyword: inputValue,
        config: {
          params: {
            startIndex: page,
          },
        },
      });

      setSearch([...search, ...items]);
      setPage(page + 10);
    } catch (err) {
      setSearch([...search]);
    }
  }, [inputValue, page, search]);

  const handleBookDetails = (item: TSearchBookItems) =>
    navigation.navigate('BookDetail', {
      id: item.id,
      title: item.volumeInfo.title,
    });

  const renderBookSearch = ({
    item,
    index,
  }: ListRenderItemInfo<TSearchBookItems>) => {
    return (
      <BookDesign
        testID={String(index)}
        image={item.volumeInfo.imageLinks?.thumbnail}
        name={item.volumeInfo.title}
        onPress={() => handleBookDetails(item)}
      />
    );
  };

  const handleFavoriteDetail = (item: TFavoriteItem) =>
    navigation.navigate('BookDetail', {
      id: item.id,
      title: item.title,
    });

  const renderBookFavorite = ({
    item,
    index,
  }: ListRenderItemInfo<TFavoriteItem>) => {
    return (
      <BookDesign
        testID={String(index)}
        image={item.image}
        name={item.title}
        onPress={() => handleFavoriteDetail(item)}
      />
    );
  };

  const clearSearch = () => {
    setSearch([]);
    setInputValue('');
    setPage(20);
  };

  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.headerView}>
        <View style={styles.userInfoView}>
          <View style={styles.safeView}>
            <View style={styles.welcomeView}>
              <Text style={styles.welcomeText}>Ol??,</Text>
              <Text style={styles.userText}>Ricardo</Text>
            </View>
          </View>
        </View>
      </View>

      <View>
        <TextInput
          testID="homeScreen__inputSearch"
          value={inputValue}
          placeholder="Busca"
          onChangeText={changeInput}
          style={styles.input}
        />
      </View>

      {!!search.length && (
        <View style={styles.searchView}>
          <View style={styles.searchInfoView}>
            <TouchableOpacity onPress={clearSearch}>
              <Text
                testID="homeScreen__clearSearch"
                style={styles.underlineText}>
                Limpar
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.searchResultView}>
            <FlatList
              testID="homeScreen__listItem"
              data={search}
              numColumns={2}
              renderItem={renderBookSearch}
              keyExtractor={item => `${item.id}`}
              onEndReachedThreshold={0.5}
              onEndReached={changePage}
            />
          </View>
        </View>
      )}
      {!search.length && favoriteList.length > 0 && (
        <View style={styles.favoriteContainer}>
          <View style={styles.favoriteView}>
            <Text style={styles.favoriteText}>Favoritos</Text>
          </View>

          <View style={styles.favoriteListView}>
            <FlatList
              data={favoriteList}
              renderItem={renderBookFavorite}
              keyExtractor={item => `${item.id}`}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
      )}
      {!search.length && !favoriteList.length && (
        <View style={styles.emptyStateView}>
          <Image source={BookIcon} style={styles.emptyStateImage} />
          <Text>Pesquise e encontre os melhores livros</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
