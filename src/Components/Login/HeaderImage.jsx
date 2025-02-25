import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import images from '../../Theme/Image';
import { moderateScale, moderateScaleVertical } from '../../utils/ResponsiveSize';

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
    marginVertical: moderateScaleVertical(20),
    alignItems: 'center',
  },
  imageStyle: {
    height: moderateScale(150),
    width: moderateScale(115),
  },
});
