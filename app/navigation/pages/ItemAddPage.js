import {DetailTPL} from '@UI/detailUI';
import {getH, getW} from '@constants/appUnits';
import {_useNavFunctions} from '@hooks/navigationHook';
import font from '@styles/textStyle';
import {PressCallback} from '@userInteraction/pressAction';
import React, {useState} from 'react';
import {Text, View} from 'react-native';
const Handle = ({style}) => (
  <View
    style={{
      width: getW(56),
      height: getW(3),
      backgroundColor: '#686868',
      borderRadius: getW(4),
      ...style,
    }}
  />
);

function ItemAddPage({headerHeight, itemInfo}) {
  const [newInfo, setNewInfo] = useState(itemInfo);
  const {_goBack} = _useNavFunctions();
  const completeEdit = () => {
    _goBack();
  };
  const editAmount = newNumber => {
    setNewInfo(prev => ({...prev, amount: newNumber}));
  };
  const editExpireDate = newTimeStamp => {
    setNewInfo(prev => ({...prev, expireDate: newTimeStamp}));
  };
  const editCategory = foodName => {
    setNewInfo(prev => ({...prev, foodName}));
  };

  return (
    <View style={{}}>
      <View style={{marginBottom: getH(160)}}>
        <Handle style={{alignSelf: 'center', marginVertical: getW(16)}} />
        <DetailTPL.detailInfo
          foodInfo={itemInfo}
          isEdit
          editAmount={editAmount}
          editExpireDate={editExpireDate}
          editCategory={editCategory}
        />
      </View>
      <PressCallback
        onPress={completeEdit}
        style={{
          width: getW(343),
          alignSelf: 'center',
          marginBottom: getW(30),
          borderRadius: getW(10),
          backgroundColor: '#62E38C',
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: getW(15),
        }}>
        <Text style={[font.semi18, {color: 'white'}]}>수정 완료</Text>
      </PressCallback>
    </View>
  );
}

export default ItemAddPage;
