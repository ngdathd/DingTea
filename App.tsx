import React from 'react';
import {StyleSheet, StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import store from 'views/app';
import {SafeAreaView} from 'react-native-safe-area-context';
import FlashMessage from 'react-native-flash-message';
import {RootLoading} from 'bases/components';
import {COLOR} from 'bases/styles/Core';
import {enableScreens} from 'react-native-screens';
import Router from 'views/router/Router';

enableScreens();

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container} edges={['left', 'right']}>
        <StatusBar barStyle="dark-content" backgroundColor={COLOR.BG.WHITE} />
        <Router />
        <FlashMessage position="top" />
        <RootLoading />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.BG.WHITE
  }
});