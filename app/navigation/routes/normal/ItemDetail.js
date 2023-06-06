import {_useNavFunctions} from '@hooks/navigationHook';
import ItemDetailPage from '@pages/ItemDetailPage';
import React from 'react';

function ItemDetail() {
  const {_getCurParam} = _useNavFunctions();
  const {itemInfo} = _getCurParam();
  return <ItemDetailPage itemInfo={itemInfo} />;
}

export default ItemDetail;
