import {DetailTPL} from '@UI/detailUI';
import {isEmpty} from '@_utils/validation';
import {getH, getW} from '@constants/appUnits';
import {_useNavFunctions} from '@hooks/navigationHook';
import {UserDataContext} from '@hooks/userDataContext';
import font from '@styles/textStyle';
import {PressAsync} from '@userInteraction/pressAction';
import React, {useContext, useState} from 'react';
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

function ItemAddPage({headerHeight, foodId = null, isEdit = true}) {
  const {getFoodWithId, edit, add} = useContext(UserDataContext);
  const [newInfo, setNewInfo] = useState(isEdit ? getFoodWithId({foodId}) : {});
  console.log('item add info : ', foodId, newInfo);
  const {_goBack} = _useNavFunctions();
  const completeEdit = async () => {
    isEdit
      ? await edit({foodId: foodId, newObj: newInfo})
      : await add({
          newObj: {...newInfo, id: newInfo.foodName + newInfo.expireDate},
        });
    _goBack();
  };
  const editAmount = newNumber => {
    console.log('edit amount .... : ', newNumber);
    setNewInfo(prev => ({...prev, amount: newNumber}));
  };
  const editExpireDate = newTimeStamp => {
    console.log('onday select .... : ', newTimeStamp);
    setNewInfo(prev => ({...prev, expireDate: newTimeStamp}));
  };
  const editCategory = foodName => {
    setNewInfo(prev => ({...prev, foodName}));
  };

  if (isEmpty(newInfo) && isEdit) {
    return <View />;
  } else {
    return (
      <View style={{}}>
        <View style={{marginBottom: getH(160)}}>
          <Handle style={{alignSelf: 'center', marginVertical: getW(16)}} />
          <DetailTPL.detailInfo
            foodInfo={newInfo}
            isEdit
            editAmount={editAmount}
            editExpireDate={editExpireDate}
            editCategory={editCategory}
          />
        </View>
        <PressAsync
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
        </PressAsync>
      </View>
    );
  }
}

export default ItemAddPage;
