import {RouteWrapper, View_BottomModal} from '@templates/defaultComps';
import {
  useCloseInteractionEvent,
  useModalHistoryControl,
  _useNavFunctions,
} from '@hooks/navigationHook';
import Modals, {modalCloseEventConfig} from '@organisms/modals';
import {useRoute} from '@react-navigation/native';
import {isEmpty} from '@_utils/validation';
import React from 'react';
import {View} from 'react-native';

function BottomModal() {
  const route = useRoute();
  const {_getCurParam} = _useNavFunctions();
  const {data = {}} = _getCurParam();
  const {type, property, option = {}} = data;
  const {preventCloseEvent} = useCloseInteractionEvent(
    modalCloseEventConfig?.[type] ?? {
      actionType: 'close-modal',
      actionName: 'close-bottom-modal',
    },
  );
  useModalHistoryControl({data, checkParam: 'type'});
  if (isEmpty(data) || typeof data !== 'object') {
    return <View />;
  } else {
    return (
      <RouteWrapper>
        <View_BottomModal
          noContainer={option?.noContainer}
          overflowVisible={option?.overflowVisible}>
          <Modals
            type={type}
            property={property}
            option={option}
            preventCloseEvent={preventCloseEvent}
          />
        </View_BottomModal>
      </RouteWrapper>
    );
  }
}

export default BottomModal;
