import React from 'react';
import {View} from 'react-native';
import {
  AntDesign,
  Entypo,
  EvilIcons,
  Feather,
  FontAwesome,
  FontAwesome5,
  Fontisto,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
  SimpleLineIcons,
  Zocial
} from '@expo/vector-icons';

import type {IconProps} from '@expo/vector-icons/build/createIconSet';

export type FontType =
  | 'Ionicons'
  | 'AntDesign'
  | 'Entypo'
  | 'EvilIcons'
  | 'Feather'
  | 'FontAwesome'
  | 'FontAwesome5'
  | 'Fontisto'
  | 'Foundation'
  | 'MaterialCommunityIcons'
  | 'MaterialIcons'
  | 'Octicons'
  | 'SimpleLineIcons'
  | 'Zocial';

interface IProps extends IconProps<any> {
  iconFontType: FontType;
}

export const MyIcon = (props: IProps) => {
  const { iconFontType } = props;
  switch (iconFontType) {
    case 'Ionicons':
      return <Ionicons {...props} />;
    case 'AntDesign':
      return <AntDesign {...props} />;
    case 'Entypo':
      return <Entypo {...props} />;
    case 'EvilIcons':
      return <EvilIcons {...props} />;
    case 'Feather':
      return <Feather {...props} />;
    case 'FontAwesome':
      return <FontAwesome {...props} />;
    case 'FontAwesome5':
      return <FontAwesome5 {...props} />;
    case 'Fontisto':
      return <Fontisto {...props} />;
    case 'Foundation':
      return <Foundation {...props} />;
    case 'MaterialCommunityIcons':
      return <MaterialCommunityIcons {...props} />;
    case 'MaterialIcons':
      return <MaterialIcons {...props} />;
    case 'Octicons':
      return <Octicons {...props} />;
    case 'SimpleLineIcons':
      return <SimpleLineIcons {...props} />;
    case 'Zocial':
      return <Zocial {...props} />;
    default:
      return <View />;
  }
};