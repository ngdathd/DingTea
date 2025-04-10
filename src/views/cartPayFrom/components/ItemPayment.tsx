import React, {PureComponent} from 'react';
import {StyleSheet} from 'react-native';

import {
  COLOR,
  FONT_SIZE,
  LAYOUT,
  MARGIN,
  PADDING,
  RADIUS,
  setMargin,
  setPadding,
  setRadius
} from 'bases/styles/Core';
import {MyButtonShadow, MyText, MyImage, MyView} from 'bases/components';
import Utilities from 'utils/Utilities';
import {ICartPayModel} from 'models';

interface IProps {
  item: ICartPayModel;
  onPress: () => void;
}

export default class ItemPayment extends PureComponent<IProps, {}> {
  render() {
    const {onPress, item} = this.props;
    return (
      <MyButtonShadow style={styles.containerDetail} onPress={onPress}>
        <MyView transparent style={styles.viewImage}>
          <MyImage
            style={styles.imgIcon}
            width={LAYOUT.l_40}
            height={LAYOUT.l_40}
            source={Utilities.convertLinkImage(item.logo)}
            resizeMode="contain"
          />
          <MyText style={styles.titleDetail} fontStyle="Bold" numberOfLines={1}>
            {item.name}
          </MyText>
        </MyView>
        {/* <MyIcon
          iconFontType="MaterialCommunityIcons"
          name={isChoose ? 'checkbox-marked-circle' : 'checkbox-blank-circle-outline'}
          size={20}
          color={COLOR.TEXT.DA_CAM}
        /> */}
      </MyButtonShadow>
    );
  }
}

const styles = StyleSheet.create({
  containerDetail: {
    backgroundColor: COLOR.BG.WHITE,
    flexDirection: 'row',
    ...setPadding(PADDING.p_10, PADDING.p_10, PADDING.p_10, PADDING.p_10),
    ...setRadius(RADIUS.r_10, RADIUS.r_10, RADIUS.r_10, RADIUS.r_10),
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: LAYOUT.l_50
  },
  titleDetail: {
    fontSize: FONT_SIZE.s_14
  },
  viewImage: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  imgIcon: {
    ...setRadius(RADIUS.r_0, RADIUS.r_0, RADIUS.r_0, RADIUS.r_0),
    ...setMargin(MARGIN.m_0, MARGIN.m_0, MARGIN.m_0, MARGIN.m_26)
  }
});
