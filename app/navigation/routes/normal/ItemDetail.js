import {_useNavFunctions} from '@hooks/navigationHook';
import ItemDetailPage from '@pages/ItemDetailPage';
import React from 'react';

function ItemDetail() {
  const {_getCurParam, _goBack} = _useNavFunctions();
  const {foodId} = _getCurParam();

  return <ItemDetailPage foodId={foodId} />;
}

export default ItemDetail;
