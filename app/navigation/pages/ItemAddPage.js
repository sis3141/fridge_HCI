import {DetailTPL} from '@UI/detailUI';
import {isEmpty, isExist} from '@_utils/validation';
import {getH, getW} from '@constants/appUnits';
import {_useNavFunctions} from '@hooks/navigationHook';
import {UserDataContext} from '@hooks/userDataContext';
import COLORS from '@styles/colors';
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

function ItemAddPage({
  headerHeight,
  foodId = null,
  isView = true,
  isAdding = false,
}) {
  const {getFoodWithId, edit, add} = useContext(UserDataContext);
  const [newInfo, setNewInfo] = useState(
    isAdding
      ? {
          amount: 1,
        }
      : getFoodWithId({foodId}),
  );
  const isValid =
    newInfo.amount >= 1 &&
    isExist(newInfo.expireDate) &&
    isExist(newInfo.foodName);
  const {_goBack} = _useNavFunctions();
  const completeEdit = async () => {
    isAdding
      ? await add({
          foodObj: {
            ...newInfo,
            id: newInfo.foodName + newInfo.expireDate,
            addDate: new Date().getTime(),
          },
        })
      : await edit({foodId: foodId, newObj: newInfo});
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

  if (isEmpty(newInfo) && !isAdding) {
    return <View />;
  } else {
    return (
      <View style={{}}>
        <View style={{marginBottom: getH(160)}}>
          <Handle style={{alignSelf: 'center', marginVertical: getW(16)}} />
          <DetailTPL.detailInfo
            foodInfo={newInfo}
            isView={isView}
            isAdding={isAdding}
            editAmount={editAmount}
            editExpireDate={editExpireDate}
            editCategory={editCategory}
          />
        </View>
        <PressAsync
          disable={!isValid}
          onPress={completeEdit}
          style={{
            width: getW(343),
            alignSelf: 'center',
            marginBottom: getW(30),
            borderRadius: getW(10),
            backgroundColor: isValid ? '#62E38C' : COLORS.grayA6,
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: getW(15),
          }}>
          <Text style={[font.semi18, {color: 'white'}]}>
            {isAdding ? '추가 완료' : '수정 완료'}
          </Text>
        </PressAsync>
      </View>
    );
  }
}

export default ItemAddPage;
