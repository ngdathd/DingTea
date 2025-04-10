import React, {PureComponent} from 'react';
import {FlatList, RefreshControl} from 'react-native';

import {connect} from 'react-redux';
import MyI18n from 'utils/MyI18n';
import {bindActionCreators} from 'redux';
import {RootState} from 'views/app/redux/App.Reducer';

import {tabStyles} from '../../style/Order.Style';
import {ItemOrder} from 'views/app/components';
import {LoadingList, MyButtonText, MyText, MyView} from 'bases/components';
import {IOrderModel} from 'models';
import {ITabShippingState, getListOrdersShipping, showLoadmore, showRefreshShipping} from './redux';

interface IProps extends ITabShippingState {
  getListOrdersShipping: typeof getListOrdersShipping;
  showRefreshShipping: typeof showRefreshShipping;
  showLoadmore: typeof showLoadmore;
}

class TabShipping extends PureComponent<IProps> {
  componentDidMount() {
    // Tải lại mỗi lần chuyển tab
    this.props.getListOrdersShipping({
      skip: 0,
      limit: 10,
      statuses: 'processing',
      order_by: 'desc',
      sort_by: 'created_at'
    });
  }

  reload = () => {
    const {isFirstLoading, isLoadmore} = this.props;
    if (!isFirstLoading && !isLoadmore) {
      this.props.showRefreshShipping(true);
      this.props.getListOrdersShipping({
        skip: 0,
        limit: 10,
        statuses: 'processing',
        order_by: 'desc',
        sort_by: 'created_at'
      });
    }
  };

  keyExtractor = (item: IOrderModel) => {
    return item.id.toString();
  };

  renderItem = ({item}: {item: IOrderModel}) => {
    return <ItemOrder items={item} />;
  };

  renderItemSeparatorComponent = () => {
    return <MyView style={tabStyles.itemSeparator} />;
  };

  renderListEmptyComponent = () => {
    const {isError, isFirstLoading} = this.props;
    if (isFirstLoading) {
      return <LoadingList />;
    } else {
      if (isError) {
        return (
          <MyView style={tabStyles.containerError}>
            <MyText style={tabStyles.txtAgain}>{MyI18n.trans.error_message}</MyText>
            <MyButtonText
              onPress={this.reload}
              title={MyI18n.trans.try_again}
              style={tabStyles.btnAgain}
            />
          </MyView>
        );
      } else {
        return <MyText style={tabStyles.txtAgain}>{MyI18n.trans.data_empty}</MyText>;
      }
    }
  };

  renderListFooterComponent = () => {
    const {isLoadmore} = this.props;
    if (isLoadmore) {
      return <LoadingList />;
    } else {
      return null;
    }
  };

  onEndReached = () => {
    const {data, isLoadmore, isStop} = this.props;
    if (isLoadmore || isStop) {
      return;
    }
    this.props.showLoadmore(true);
    this.props.getListOrdersShipping({
      skip: data?.length || 0,
      limit: 10,
      statuses: 'processing',
      order_by: 'desc',
      sort_by: 'created_at'
    });
  };

  render() {
    const {data, isRefresh} = this.props;

    return (
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl onRefresh={this.reload} refreshing={isRefresh || false} />}
        style={tabStyles.list}
        contentContainerStyle={tabStyles.contentList}
        data={data}
        extraData={data}
        initialNumToRender={12}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
        ItemSeparatorComponent={this.renderItemSeparatorComponent}
        ListEmptyComponent={this.renderListEmptyComponent}
        ListFooterComponent={this.renderListFooterComponent}
        onEndReachedThreshold={0.5}
        onEndReached={this.onEndReached}
      />
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {theme, iso} = state.SettingReducer;
  const {isRefresh, data, isError, isFirstLoading, isLoadmore, isStop} = state.OrderShippingReducer;
  return {theme, iso, isRefresh, data, isError, isFirstLoading, isLoadmore, isStop};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      getListOrdersShipping,
      showRefreshShipping,
      showLoadmore
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TabShipping);
