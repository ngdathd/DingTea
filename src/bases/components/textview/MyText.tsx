import React from 'react';
import {StyleSheet, Text, TextProps} from 'react-native';
import {FONT_FAMILY, FONT_SIZE} from 'bases/styles/Core';
import MyTheme from 'utils/MyTheme';

export interface IPropsMyText extends TextProps {
  children?: any | null;
  fontStyle?: 'Regular' | 'Medium' | 'Bold' | 'SemiBold';
}
/**
 ** TextSize default '14'
 ** FontFamily default 'Medium'
 *
 */
export const MyText = (props: IPropsMyText) => {
  const {children, fontStyle} = props;
  let textStyle = {};
  if (fontStyle) {
    textStyle = {
      fontFamily: FONT_FAMILY[fontStyle]
    };
  } else {
    textStyle = {
      fontFamily: FONT_FAMILY.Medium
    };
  }

  return (
    <Text {...props} style={[styles.text, props.style, textStyle]} allowFontScaling={false}>
      {children}
    </Text>
  );
};

interface IPropsMask {
  text: number | 0;
  currency?: 'VND' | 'USD';
}

interface MyTextPriceMaskProps extends TextProps, IPropsMask {}

const formatMoney = (value: number, currency: 'VND' | 'USD' = 'VND') => {
  return new Intl.NumberFormat(currency === 'VND' ? 'vi-VN' : 'en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0
  }).format(value);
};

/**
 ** TextSize default '14'
 ** FontFamily default 'Medium'
 ** currency default 'VND'
 */
export const MyTextPriceMask: React.FC<MyTextPriceMaskProps> = ({
  text,
  currency = 'VND',
  ...props
}) => {
  return (
    <Text {...props}>
      {formatMoney(text, currency)}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    color: MyTheme.themes.TEXT.PRIMARY,
    fontSize: FONT_SIZE.s_14
  }
});
