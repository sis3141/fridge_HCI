import {View_BottomModal} from '@templates/defaultComps';
import {useModalHistoryControl, _useNavFunctions} from '@hooks/navigationHook';
import {useRoute} from '@react-navigation/native';
import {isEmpty} from '@_utils/validation';
import React from 'react';
import {View} from 'react-native';

function BottomModal() {
  const route = useRoute();
  const {_getCurParam} = _useNavFunctions();
  const {data = {}} = _getCurParam();
  const {type, property, option = {}} = data;

  useModalHistoryControl({data, checkParam: 'type'});
  if (isEmpty(data) || typeof data !== 'object') {
    return <View />;
  } else {
    return (
      <View_BottomModal
        noContainer={option?.noContainer}
        overflowVisible={option?.overflowVisible}>
        <View />
      </View_BottomModal>
    );
  }
}

export default BottomModal;
