import {HomeTPLs} from '@UI/homeUI';
import {FOODS} from '@_constants/dataConfig';
import {isEmpty} from '@_utils/validation';
import {getW} from '@constants/appUnits';
import {CALCS} from '@hooks/foodCalc';
import {UserDataContext} from '@hooks/userDataContext';
import {FlatList_P} from '@platformPackage/gestureComponent';
import React, {useContext} from 'react';
import {View} from 'react-native';

function HomePage({headerHeight}) {
  const {foodList, dangerList, dangerNum} = useContext(UserDataContext);
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
      data={Object.values(cateDict)}
      renderItem={({item}) =>
        HomeTPLs.renderMyItem({
          cateItem: item,
          style: {marginBottom: getW(30)},
        })
      }
    />
  );
}

export default HomePage;
