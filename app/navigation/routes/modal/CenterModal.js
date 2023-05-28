import {View_CenterModal} from '@templates/defaultComps';
import {_useNavFunctions} from '@hooks/navigationHook';
import {useRoute} from '@react-navigation/native';
import {isEmpty} from '@_utils/validation';
import React from 'react';
import {View} from 'react-native';

function CenterModal() {
  const route = useRoute();
  const {_getCurParam} = _useNavFunctions();
  const {data = {}} = _getCurParam();
  const {type, property, option} = data;

  if (isEmpty(data) || typeof data !== 'object') {
    return <View />;
  } else {
    return (
      <View_CenterModal>
        <View />
      </View_CenterModal>
    );
  }
}

export default CenterModal;
