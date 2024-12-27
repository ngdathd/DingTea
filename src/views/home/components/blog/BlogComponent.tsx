import React, {PureComponent} from 'react';
import {FlatList} from 'react-native';

import {ItemBlog} from 'views/app/components/ItemBlog';
import {blogStyles, listMenuComponent} from 'views/home/style/Home.Style';

import {ISettingState} from 'views/setting/redux';
import MyNavigator from 'utils/MyNavigator';
import {MyView, MyButton, MyIcon, MyText} from 'bases/components';
import {IBlogModel} from 'models';
import {getBlog} from 'services';
import MyI18n from 'utils/MyI18n';

interface defaultProps extends ISettingState {}

interface IStates {
  arrBlog: IBlogModel[] | undefined;
}

export default class BlogComponent extends PureComponent<defaultProps, IStates> {
  state = {arrBlog: []};

  showAll = () => {
    MyNavigator.navigate('Blog');
  };

  componentDidMount() {
    getBlog<IBlogModel>({skip: 0, limit: 5})
      .then(res => {
        if (!res?.code) {
          this.setState({
            arrBlog: res?.data
          });
        }
      })
      .catch(() => {});
  }

  keyExtractor = (_item: any, index: number) => {
    return index.toString();
  };

  renderItem = ({item}: {item: IBlogModel}) => {
    return <ItemBlog itemBlog={item} />;
  };

  renderItemSeparatorComponent = () => {
    return <MyView style={blogStyles.itemSeparator} />;
  };

  renderFooter = () => {
    return (
      <MyButton style={blogStyles.containerBtnAll} onPress={this.showAll}>
        <MyView style={listMenuComponent.containerBtn} transparent>
          <MyView style={listMenuComponent.contentBtn}>
            <MyIcon
              iconFontType="AntDesign"
              name="arrowright"
              size={listMenuComponent.icon.fontSize}
              color={listMenuComponent.icon.color}
              style={listMenuComponent.icon}
            />
          </MyView>
        </MyView>
        <MyText style={listMenuComponent.textAll} fontStyle="Bold" numberOfLines={1}>
          {MyI18n.trans.all}
        </MyText>
      </MyButton>
    );
  };

  render() {
    const {arrBlog} = this.state;
    return (
      <MyView style={blogStyles.container}>
        <MyText style={blogStyles.title} numberOfLines={1} fontStyle="Bold">
          {MyI18n.trans.dingtea_day}
        </MyText>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={blogStyles.containerList}
          data={arrBlog}
          extraData={arrBlog}
          initialNumToRender={12}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          ItemSeparatorComponent={this.renderItemSeparatorComponent}
          ListFooterComponent={this.renderFooter}
        />
      </MyView>
    );
  }
}
