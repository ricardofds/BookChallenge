import React, { useCallback, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  ListRenderItemInfo,
} from 'react-native';
import BookDesign from '../../components/BookDesign/bookDesign';
import { COLORS, SIZES } from '../../constants/theme';
import {
  getSearchBook,
  TSearchBookItems,
} from '../../service/api/book/getSearchBook';

import styles from './homeScreen.styles';

const Home = () => {
  const [search, setSearch] = useState<TSearchBookItems[]>([]);
  const [inputValue, setInputValue] = useState('');

  const changeInput = useCallback(async (keyword: string) => {
    setInputValue(keyword);
    const { items } = await getSearchBook({ keyword });

    setSearch(items);
  }, []);

  const renderBookSearch = ({ item }: ListRenderItemInfo<TSearchBookItems>) => {
    return (
      <BookDesign
        image={item.volumeInfo.imageLinks?.thumbnail}
        name={item.volumeInfo.title}
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
            <View style={{ marginRight: SIZES.padding }}>
              <Text style={{ color: COLORS.black }}>Olá,</Text>
              <Text style={{ color: COLORS.black }}>Ricardo</Text>
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
                <Text style={styles.clearText}>Limpar</Text>
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
    </SafeAreaView>
  );
};

export default Home;
