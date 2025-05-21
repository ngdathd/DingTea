import React from 'react';
import {StyleSheet, Image} from 'react-native';

import {RADIUS, setRadius} from '../../styles/Core';

export const MyImage = (props: any) => {
  const {children, style, width, height} = props;

  return (
    <Image
      resizeMode="contain"
      {...props}
      style={[styles.image, style, {width: width, height: height}]}>
      {children}
    </Image>
  );
};

const styles = StyleSheet.create({
  image: {
    ...setRadius(RADIUS.r_8, RADIUS.r_8, RADIUS.r_8, RADIUS.r_8)
  }
});
