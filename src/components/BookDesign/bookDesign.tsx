import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import styles from './bookDesign.styles';

interface IBookDesignProps {
  image?: string;
  name: string;
}

const imageDefault =
  'https://cdn.neemo.com.br/uploads/settings_webdelivery/logo/2609/image-not-found.jpg';

const BookDesign = ({ image = imageDefault, name }: IBookDesignProps) => {
  return (
    <TouchableOpacity style={styles.cardTouch}>
      <Image
        source={{
          uri: image,
        }}
        resizeMode="cover"
        style={styles.cardImage}
      />

      <View style={styles.cardTitleView}>
        <Text style={styles.cardTitleText}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default BookDesign;
