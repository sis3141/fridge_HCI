import {DetailTPL} from '@UI/detailUI';
import {FOODS} from '@_constants/dataConfig';
import {getDateString} from '@_utils/converters';
import {isEmpty, isExist} from '@_utils/validation';
import {Horizon} from '@components/templates/defaultComps';
import {getW} from '@constants/appUnits';
import {CALCS} from '@hooks/foodCalc';
import {_useNavFunctions} from '@hooks/navigationHook';
import {UserDataContext} from '@hooks/userDataContext';
import {ScrollView_P} from '@platformPackage/gestureComponent';
import {useIsFocused} from '@react-navigation/native';
import COLORS from '@styles/colors';
import SHADOW from '@styles/shadow';
import font from '@styles/textStyle';
import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

function ItemDetailPage({headerHeight, foodId}) {
  const {getFoodWithId, inited} = useContext(UserDataContext);
  const [itemInfo, setItemInfo] = useState({});
  const {_goBack} = _useNavFunctions();
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused && inited) {
      const newFoodObj = getFoodWithId({foodId});
      console.log('new food obj : ', foodId, newFoodObj);
      if (isEmpty(newFoodObj)) {
        console.log('no!', newFoodObj);
        _goBack();
      } else {
        console.log('item detail update : ', newFoodObj);
        setItemInfo(newFoodObj);
      }
    }
  }, [isFocused, inited]);
  if (!(isExist(itemInfo) && inited)) {
    return <View />;
  } else {
    const {foodName, addDate, expireDate} = itemInfo;
    const {cate} = FOODS[foodName];
    const dday = CALCS.getDDay({expireDate});
    const fullRange = CALCS.getFullRange({addDate, expireDate});
    const isDanger = CALCS.isDanger({dday});
    const indiColor = isDanger ? COLORS.red : COLORS.green;
    const dangerRate = dday >= 0 ? 1 - (fullRange - dday) / fullRange : 1;
    return (
      <ScrollView_P style={{backgroundColor: 'white'}}>
        <DetailTPL.detailHeader foodInfo={itemInfo} isDanger={isDanger} />
        <Text
          style={[
            font.semi32,
            {
              color: indiColor,
              alignSelf: 'center',
              marginTop: getW(15),
              marginBottom: getW(12),
            },
          ]}>
          {`D-Day${dday <= 0 ? '' : ' ' + dday}`}
        </Text>
        <View style={[ST.barCard, {marginBottom: getW(10)}]}>
          <Text
            style={[font.semi14, {color: '#a6a6a6', alignSelf: 'flex-start'}]}>
            소비기한
          </Text>
          <View
            style={{
              width: getW(280),
              height: getW(14),
              marginVertical: getW(8),
              backgroundColor: '#e6e8e9',
              borderRadius: getW(20),
              alignItems: 'flex-start',
              alignSelf: 'center',
            }}>
            <View
              style={{
                width: getW(280) * dangerRate,
                backgroundColor: indiColor,
                height: getW(14),
                borderRadius: getW(20),
              }}
            />
          </View>
          <Horizon style={{width: '100%', justifyContent: 'space-between'}}>
            <Text style={[font.semi14, {color: '#a6a6a6'}]}>
              {getDateString(new Date(expireDate))}
            </Text>
            <Text style={[font.semi14, {color: '#a6a6a6'}]}>
              {getDateString(new Date(addDate))}
            </Text>
          </Horizon>
        </View>
        <DetailTPL.detailInfo foodInfo={itemInfo} />
      </ScrollView_P>
    );
  }
}

const ST = StyleSheet.create({
  barCard: {
    marginHorizontal: getW(23),
    borderRadius: getW(15),
    paddingVertical: getW(10),
    paddingHorizontal: getW(8),
    ...SHADOW.basic,
  },
  descCard: {
    paddingHorizontal: getW(23),
    paddingVertical: getW(22),
    alignItems: 'center',
  },
});

export default ItemDetailPage;
