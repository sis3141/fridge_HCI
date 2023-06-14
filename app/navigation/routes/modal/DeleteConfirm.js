import {Horizon, View_BottomModal} from '@templates/defaultComps';
import {_useNavFunctions} from '@hooks/navigationHook';
import {useRoute} from '@react-navigation/native';
import React, {useContext} from 'react';
import {Text} from 'react-native';
import {PressAsync, PressCallback} from '@userInteraction/pressAction';
import {getW} from '@constants/appUnits';
import font from '@styles/textStyle';
import {UserDataContext} from '@hooks/userDataContext';

function DeleteConfirm() {
  const route = useRoute();
  const {_getCurParam, _goBack} = _useNavFunctions();
  const {foodId, isMultiple = false} = _getCurParam();
  const {deleteFood, deleteMultiple} = useContext(UserDataContext);

  return (
    <View_BottomModal>
      <Text
        style={[font.semi18, {alignSelf: 'center', marginVertical: getW(24)}]}>
        {'정말 삭제 하시겠어요?'}
      </Text>
      <Horizon>
        <PressAsync
          style={{
            flex: 1,
            margin: getW(12),
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: getW(6),
            paddingVertical: getW(12),
            backgroundColor: 'black',
          }}
          onPress={async () => {
            isMultiple
              ? await deleteMultiple({foodIds: foodId})
              : await deleteFood({foodId});
            _goBack();
          }}>
          <Text style={[font.semi20, {color: 'white'}]}>확인</Text>
        </PressAsync>
        <PressCallback
          style={{
            flex: 1,
            margin: getW(12),
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: getW(6),
            borderColor: 'black',
            borderWidth: 1,
            paddingVertical: getW(12),
          }}
          onPress={() => {
            _goBack();
          }}>
          <Text style={[font.semi20]}>취소</Text>
        </PressCallback>
      </Horizon>
    </View_BottomModal>
  );
}

export default DeleteConfirm;
