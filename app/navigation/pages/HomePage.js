import {HomeTPLs} from '@UI/homeUI';
import {FOODS} from '@_constants/dataConfig';
import {isEmpty} from '@_utils/validation';
import {WINDOW_HEIGHT, WINDOW_WIDTH, getW} from '@constants/appUnits';
import {CALCS} from '@hooks/foodCalc';
import {UserDataContext} from '@hooks/userDataContext';
import {FlatList_P} from '@platformPackage/gestureComponent';
import COLORS from '@styles/colors';
import font from '@styles/textStyle';
import {PressCallback} from '@userInteraction/pressAction';
import React, {useContext} from 'react';
import {Text, View} from 'react-native';

function HomePage({headerHeight}) {
  const {foodList, dangerList, dangerNum, getTestData, reset} =
    useContext(UserDataContext);
  const wholefoodNum = foodList.length;
  const {cateDict} = foodList.reduce(
    (out, foodObj) => {
      const {cateDict} = out;
      const {foodName, addDate, expireDate, amount} = foodObj;
      const dday = CALCS.getDDay({inputDate: addDate, expireDate});
      const {cate, unit} = FOODS[foodName];
      if (isEmpty(cateDict[cate])) {
        cateDict[cate] = {
          cate,
          foods: {},
        };
      }
      if (isEmpty(cateDict[cate].foods[foodName])) {
        cateDict[cate].foods[foodName] = {dday, variants: 1, ...foodObj};
      } else {
        let curFood = cateDict[cate].foods[foodName];
        if (curFood.dday > dday) {
          curFood.dday = dday;
        }
        curFood.amount += amount;
        curFood.variants++;
      }

      return {cateDict};
    },
    {cateDict: []},
  );
  console.log('cate dict : ', cateDict);

  return (
    <FlatList_P
      style={{backgroundColor: 'white'}}
      ListHeaderComponent={
        <View>
          <HomeTPLs.header
            wholefoodNum={wholefoodNum}
            dangerFoodNum={dangerNum}
          />
          <HomeTPLs.dangerSwiper
            dangerItemList={dangerList}
            style={{marginTop: getW(20)}}
          />
        </View>
      }
      ListEmptyComponent={
        <View
          style={{
            width: WINDOW_WIDTH,
            height: (WINDOW_HEIGHT * 2) / 3,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={[font.semi26, {color: COLORS.gray94}]}>
            냉장고안에 아무것도 없네요
          </Text>
        </View>
      }
      data={Object.values(cateDict)}
      renderItem={({item}) =>
        HomeTPLs.renderMyItem({
          cateItem: item,
          style: {marginBottom: getW(30)},
        })
      }
      ListFooterComponent={
        <View
          style={{
            width: WINDOW_WIDTH,
            paddingVetical: getW(30),
            alignItems: 'center',
          }}>
          <PressCallback
            onPress={() => {
              getTestData();
            }}>
            <Text style={[font.semi12]}>테스트 데이터 불러오기</Text>
          </PressCallback>
          <PressCallback
            onPress={() => {
              reset();
            }}>
            <Text style={[font.semi12]}>초기화</Text>
          </PressCallback>
        </View>
      }
    />
  );
}

export default HomePage;
