import {_useNavFunctions} from '@hooks/navigationHook';
import ItemListPage from '@pages/ItemListPage';
import React from 'react';

function ItemList() {
  const {_getCurParam} = _useNavFunctions();
  const {foodName} = _getCurParam();
  return <ItemListPage foodName={foodName} />;
}

export default ItemList;
