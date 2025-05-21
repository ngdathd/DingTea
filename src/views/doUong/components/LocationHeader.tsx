import React, {PureComponent} from 'react';
import {StyleSheet} from 'react-native';

import {connect} from 'react-redux';
import MyI18n from 'utils/MyI18n';
import {RootState} from 'views/app/redux/App.Reducer';

import {MyText, MyIcon, MyButton, MyView} from 'bases/components';

import {
  FONT_SIZE,
  LAYOUT,
  MARGIN,
  PADDING,
  RADIUS,
  setMargin,
  setPadding,
  setRadius
} from 'bases/styles/Core';
import MyNavigator from 'utils/MyNavigator';
import {IChooseAddressUserState} from 'views/app/reduxChooseAddressUser';
import MyStaticLocal from 'utils/MyStaticLocal';
import MyTheme from 'utils/MyTheme';
import {IChooseAddressShopState} from 'views/app/reduxChooseAddressShop';
import {ICartShipModel} from 'models';

interface IProps extends IChooseAddressUserState, IChooseAddressShopState {
  shipping?: ICartShipModel;
}

class LocationHeader extends PureComponent<IProps> {
  onPress = async () => {
    const {shipping} = this.props;
    if (shipping) {
      /* Giao tan noi */
      if (shipping.id === 5) {
        // await this.getLocation();
      } else {
        /* tu den lay */
        MyNavigator.navigate('AddressShop');
      }
    }
  };

  render() {
    const {addressUserChoose, shipping, addressShopChoose} = this.props;
    if (shipping?.id === 5) {
      return (
        <MyButton style={styles.contentTitle} onPress={this.onPress}>
          <MyView style={styles.viewTitle} transparent>
            <MyIcon
              iconFontType={'MaterialIcons'}
              name="location-pin"
              size={styles.iconLocation.width}
              color={styles.iconLocation.color}
            />
            <MyText numberOfLines={2} style={styles.titleSmall} fontStyle="SemiBold">
              {addressUserChoose?.address || MyI18n.trans.your_address}
            </MyText>
          </MyView>
          <MyView style={styles.content}>
            <MyText style={styles.textChange} fontStyle="SemiBold">
              {MyI18n.trans.change}
            </MyText>
          </MyView>
        </MyButton>
      );
    } else {
      let shop = '';
      if (addressShopChoose) {
        shop = addressShopChoose?.name + ' (' + addressShopChoose?.address + ')';
      }
      return (
        <MyButton style={styles.contentTitle} onPress={this.onPress}>
          <MyView style={styles.viewTitle} transparent>
            <MyIcon
              iconFontType={'Entypo'}
              name="shop"
              size={styles.iconLocation.width}
              color={styles.iconLocation.color}
            />
            <MyText numberOfLines={2} style={styles.titleSmall} fontStyle="SemiBold">
              {shop || MyI18n.trans.noti_choose_shop}
            </MyText>
          </MyView>
          <MyView style={styles.content}>
            <MyText style={styles.textChange} fontStyle="SemiBold">
              {MyI18n.trans.change}
            </MyText>
          </MyView>
        </MyButton>
      );
    }
  }
}

const mapStateToProps = (state: RootState) => {
  const {iso, theme} = state.SettingReducer;
  const {addressUserChoose} = state.ChooseAddressUserReducer;
  const {addressShopChoose} = state.ChooseAddressShopReducer;
  const {shipping} = state.DoUongReducer;
  return {iso, theme, addressUserChoose, shipping, addressShopChoose};
};

export default connect(mapStateToProps, null)(LocationHeader);

const styles = StyleSheet.create({
  contentTitle: {
    backgroundColor: MyTheme.themes.BG.PRIMARY_LIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...setPadding(PADDING.p_8, PADDING.p_8, PADDING.p_10, PADDING.p_16),
    ...setMargin(MARGIN.m_8, MARGIN.m_16, MARGIN.m_16, MARGIN.m_16),
    ...setRadius(RADIUS.r_8, RADIUS.r_8, RADIUS.r_8, RADIUS.r_8)
  },
  viewTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    ...setMargin(MARGIN.m_0, MARGIN.m_0, MARGIN.m_0, MARGIN.m_16),
    flex: 1
  },
  iconLocation: {
    color: MyTheme.themes.BG.PRIMARY_DARK,
    width: LAYOUT.l_18
  },
  titleSmall: {
    fontSize: FONT_SIZE.s_12,
    textAlign: 'left',
    color: MyTheme.themes.TEXT.SECONDARY,
    ...setMargin(MARGIN.m_0, MARGIN.m_0, MARGIN.m_4, MARGIN.m_0),
    flex: 1
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    ...setRadius(RADIUS.r_4, RADIUS.r_4, RADIUS.r_4, RADIUS.r_4),
    height: LAYOUT.l_32,
    backgroundColor: MyTheme.themes.BG.PRIMARY_DARK
  },
  textChange: {
    fontSize: FONT_SIZE.s_12,
    color: MyTheme.themes.TEXT.WHITE,
    ...setMargin(MARGIN.m_0, MARGIN.m_0, MARGIN.m_16, MARGIN.m_16)
  }
});
