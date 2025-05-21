import React, {createRef, PureComponent} from 'react';

import {connect} from 'react-redux';
import MyI18n from 'utils/MyI18n';
import {RootState} from 'views/app/redux/App.Reducer';

import Utilities from 'utils/Utilities';
import {IPersonState, updateAvatar} from '../redux';
import {avatarStyles} from '../style/Person.Style';
import {MyButton, MyDialogInput, MyIcon, MyImage, MyView} from 'bases/components';
import {COLOR} from 'bases/styles/Core';
import {inforPersonStyle} from '../style/Person.Style';
import {uploadImage} from 'services/UpLoadImage.Api';
import {bindActionCreators} from 'redux';
import {IResponseImageModel} from 'models';

interface IProps extends IPersonState {
  updateAvatar: typeof updateAvatar;
}
interface IAppState {}
class AvatarComponent extends PureComponent<IProps, IAppState> {
  render() {
    const {avatar} = this.props;

    return (
      <MyButton transparent>
        <MyImage
          source={Utilities.convertLinkImage(avatar, 'MEDIUM')}
          style={inforPersonStyle.imgAvatar}
          width={inforPersonStyle.imageAvatar.width}
          height={inforPersonStyle.imageAvatar.width}
        />
      </MyButton>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {avatar} = state.PersonReducer;
  return {avatar};
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      updateAvatar
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AvatarComponent);
