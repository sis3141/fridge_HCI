import {HomeTPLs} from '@UI/homeUI';
import {FOODS} from '@_constants/dataConfig';
import {getW} from '@constants/appUnits';
import {UserDataContext} from '@hooks/userDataContext';
import {FlatList_P} from '@platformPackage/gestureComponent';
import React, {useContext} from 'react';
import {View} from 'react-native';

function ItemListPage({headerHeight, foodName}) {
  const {inited, foodList} = useContext(UserDataContext);
  if (inited) {
    const targetList = foodList
      .filter(value => value.foodName === foodName)
      .sort((a, b) => a.expireDate - b.expireDate);
    const length = targetList.length;

    return (
      <FlatList_P
        style={{backgroundColor: 'white'}}
        ListHeaderComponent={
          <View>
            <HomeTPLs.listHeader
              foodName={foodName}
              cate={FOODS[foodName].cate}
            />
          </View>
        }
        data={[targetList]}
        renderItem={({item, index}) =>
          HomeTPLs.renderInfoodList({
            foodList: item,
            style: {marginTop: getW(30)},
          })
        }
      />
    );
  } else {
    return <View />;
  }
}

export default ItemListPage;
