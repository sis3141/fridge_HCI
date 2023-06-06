import {View_BottomModal} from '@templates/defaultComps';
import {_useNavFunctions} from '@hooks/navigationHook';
import {useRoute} from '@react-navigation/native';
import React from 'react';
import ItemAddPage from '@pages/ItemAddPage';

function ItemAdd() {
  const route = useRoute();
  const {_getCurParam, _goBack} = _useNavFunctions();
  const {foodId} = _getCurParam();

  return (
    <View_BottomModal>
      <ItemAddPage foodId={foodId} />
    </View_BottomModal>
  );
}

export default ItemAdd;
