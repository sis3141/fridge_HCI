import {View_BottomModal} from '@templates/defaultComps';
import {_useNavFunctions} from '@hooks/navigationHook';
import {useRoute} from '@react-navigation/native';
import {isEmpty} from '@_utils/validation';
import React from 'react';
import {View} from 'react-native';
import ItemAddPage from '@pages/ItemAddPage';

function ItemAdd() {
  const route = useRoute();
  const {_getCurParam} = _useNavFunctions();
  const {itemInfo} = _getCurParam();
  console.log('itemINfo : ', itemInfo);

  if (isEmpty(itemInfo)) {
    return <View />;
  } else {
    return (
      <View_BottomModal>
        <ItemAddPage itemInfo={itemInfo} />
      </View_BottomModal>
    );
  }
}

export default ItemAdd;
