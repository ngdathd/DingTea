import {FONT_FAMILY} from 'bases/styles/Core';
import React, {Component} from 'react';
import {View, StyleSheet, Text, Linking, ScrollView} from 'react-native';
import {ReactNativeModal} from 'react-native-modal';

interface IState {
  isOpenModal: boolean;
  content: string;
}
export default class BaoTriModal extends Component<{}, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isOpenModal: false,
      content: ''
    };
  }

  isShowModal(content?: string) {
    this.setState({
      isOpenModal: true,
      content: content || ''
    });
  }

  render() {
    return (
      <ReactNativeModal
        useNativeDriver
        hideModalContentWhileAnimating
        // onBackdropPress={() => this.isHideModal()}
        // onBackButtonPress={() => this.isHideModal()}
        isVisible={this.state.isOpenModal}
        animationIn="slideInDown"
        animationOut="slideOutDown"
        animationInTiming={500}
        style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.viewHeader}>
            <Text style={styles.txtTitle}>Bảo trì ứng dụng</Text>
          </View>
          <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
            <View style={styles.viewBody}>
              <Text style={styles.txt}>
                <Text style={styles.app_name}>DingTea</Text> đang tiến hành bảo trị hệ thống nhằm
                đáp ứng trải nghiệm mua sắm tốt hơn.
              </Text>
              {this.state.content ? (
                <Text style={styles.txtContent}>{this.state.content}</Text>
              ) : null}
            </View>
            <View style={styles.viewFooter}>
              <Text style={styles.txt}>Mọi ý kiến đóng góp vui lòng liên hệ:</Text>
              <Text style={styles.txt}>
                Hotline:{' '}
                <Text
                  style={{color: 'blue', textDecorationLine: 'underline'}}
                  onPress={() => {
                    Linking.openURL('tel: 19002003');
                  }}>
                  1900 2003
                </Text>
              </Text>
              <Text style={styles.txt}>
                Email:{' '}
                <Text
                  style={{color: 'blue', textDecorationLine: 'underline'}}
                  onPress={() => {
                    // Linking.openURL('mailto:cskh@cocolux.com');
                  }}
                />
              </Text>
            </View>
          </ScrollView>
        </View>
      </ReactNativeModal>
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    margin: 0,
    // flex: 1,
    backgroundColor: 'transparent'
    // justifyContent: 'center'
  },
  modalContent: {
    margin: 16,
    borderRadius: 16,
    backgroundColor: 'white',
    paddingHorizontal: 32
  },
  viewHeader: {marginTop: 24},
  viewBody: {marginVertical: 16},
  viewFooter: {marginBottom: 24},
  txtTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: FONT_FAMILY.Bold
  },
  txt: {
    fontSize: 14,
    fontFamily: FONT_FAMILY.Regular
  },
  txtContent: {
    fontSize: 14,
    fontFamily: FONT_FAMILY.Regular,
    marginTop: 10
  },
  app_name: {
    fontFamily: FONT_FAMILY.Bold,
    fontSize: 18,
    textTransform: 'uppercase'
  }
});