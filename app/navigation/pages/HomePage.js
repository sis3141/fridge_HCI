import {HomeTPLs} from '@UI/homeUI';
import {FOODS} from '@_constants/dataConfig';
import {isEmpty} from '@_utils/validation';
import {getW} from '@constants/appUnits';
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
      const {foodName} = foodObj;
      const {cate, unit} = FOODS[foodName];
      if (isEmpty(cateDict[cate])) {
        cateDict[cate] = {
          cate,
          foods: [],
        };
      }
      cateDict[cate].foods.push(foodObj);
      return {cateDict};
    },
    {cateDict: []},
  );
  console.log('cate dict : ', cateDict);

  return (
    <FlatList_P
      ListHeaderComponent={
        <View>
          <HomeTPLs.header
            wholefoodNum={wholefoodNum}
            dangerFoodNum={dangerNum}
          />
          <HomeTPLs.dangerSwiper
            dangerItemList={dangerList}
            style={{marginVertical: getW(20)}}
          />
        </View>
      }
      data={Object.values(cateDict)}
      renderItem={({item}) =>
        HomeTPLs.renderMyItem({
          cateItem: item,
          style: {marginHorizontal: getW(20), marginBottom: getW(30)},
        })
      }
    />
  );
}

export default HomePage;
