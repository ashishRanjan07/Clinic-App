import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import images from '../../Theme/Image';
import {responsivePadding} from '../../Theme/Responsive';

const HeaderImage = () => {
  return (
    <View style={styles.imageHolder}>
      <Image
        source={images.login}
        resizeMode="contain"
        style={styles.imageStyle}
      />
    </View>
  );
};

export default HeaderImage;

const styles = StyleSheet.create({
  imageHolder: {
    marginVertical: responsivePadding(20),
    alignItems: 'center',
  },
  imageStyle: {
    height: responsivePadding(150),
    width: responsivePadding(115),
  },
});
