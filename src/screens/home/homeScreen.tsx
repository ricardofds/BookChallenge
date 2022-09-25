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
import { TFavoriteItem } from '../../routes/types';
import {
  getSearchBook,
  TSearchBookItems,
} from '../../service/api/book/getSearchBook';
import { BookIcon } from '../../assets/image';

import styles from './homeScreen.styles';

const HomeScreen = ({ navigation }) => {
  const [search, setSearch] = useState<TSearchBookItems[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [favorite] = useMMKVString(keysStorage.favorite.list);

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

  const handleBookDetails = (item: TSearchBookItems) =>
    navigation.navigate('BookDetail', {
      id: item.id,
      title: item.volumeInfo.title,
    });

  const renderBookSearch = ({ item }: ListRenderItemInfo<TSearchBookItems>) => {
    return (
      <BookDesign
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

  const renderBookFavorite = ({ item }: ListRenderItemInfo<TFavoriteItem>) => {
    return (
      <BookDesign
        image={item.image}
        name={item.title}
        onPress={() => handleFavoriteDetail(item)}
      />
    );
  };

  const clearSearch = () => {
    setSearch([]);
    setInputValue('');
  };

  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.headerView}>
        <View style={styles.userInfoView}>
          <View style={styles.safeView}>
            <View style={styles.welcomeView}>
              <Text style={styles.welcomeText}>Olá,</Text>
              <Text style={styles.userText}>Ricardo</Text>
            </View>
          </View>
        </View>
      </View>

      <View>
        <TextInput
          value={inputValue}
          placeholder="Busca"
          onChangeText={changeInput}
          style={styles.input}
        />
      </View>

      {!!search.length && (
        <>
          <View style={styles.searchView}>
            <View style={styles.searchInfoView}>
              <TouchableOpacity onPress={clearSearch}>
                <Text style={styles.underlineText}>Limpar</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.searchResultView}>
              <FlatList
                data={search}
                numColumns={2}
                renderItem={renderBookSearch}
                keyExtractor={item => `${item.id}`}
              />
            </View>
          </View>
        </>
      )}
      {!search.length && favoriteList.length > 0 && (
        <View style={styles.favoriteContainer}>
          <View style={styles.favoriteView}>
            <Text style={styles.favoriteText}>Favoritos</Text>

            <TouchableOpacity onPress={() => console.log('')}>
              <Text style={styles.underlineText}>Veja mais</Text>
            </TouchableOpacity>
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
