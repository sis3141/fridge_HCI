import {FOODS} from '@_constants/dataConfig';
import {isEmpty, isExist} from '@_utils/validation';
import {Horizon} from '@components/templates/defaultComps';
import {getW} from '@constants/appUnits';
import {COMMON_IC, FD_CATE_IMG} from '@constants/imageMap';
import {CALCS} from '@hooks/foodCalc';
import {UserDataContext} from '@hooks/userDataContext';
import {Image_local} from '@platformPackage/Image';
import {FlatList_P, TextInput_P} from '@platformPackage/gestureComponent';
import font from '@styles/textStyle';
import {PressGoBack, PressNavigate} from '@userInteraction/pressAction';
import React, {useState, useContext} from 'react';
import {View, Text} from 'react-native';

const SearchHeader = ({onKeywordChange}) => {
  return (
    <Horizon
      style={{
        paddingHorizontal: getW(25),
        paddingVertical: getW(12),
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <Horizon
        style={{
          height: getW(36),
          borderRadius: getW(10),
          width: getW(265),
          backgroundColor: 'rgba(142, 142, 147, 0.12)',
          alignItems: 'center',
        }}>
        <Image_local
          style={{width: getW(14), height: getW(14), marginHorizontal: getW(8)}}
          source={COMMON_IC.searchBar}
        />
        <TextInput_P
          placeholder="카테고리 명, 재료 명"
          placeholderTextColor="#8E8E93"
          style={{...font.regular, fontSize: getW(16)}}
          onChangeText={text => {
            if (isExist(text)) {
              onKeywordChange(text);
            }
          }}
        />
      </Horizon>
      <PressGoBack>
        <Text style={[font.regular, {fontSize: getW(16), color: '#62E38C'}]}>
          취소
        </Text>
      </PressGoBack>
    </Horizon>
  );
};

const renderItem = ({item}) => {
  const {foodName, id, addDate, expireDate, amount} = item;
  console.log('item : ', item);
  const {unit, cate, unitAmount} = FOODS[foodName];
  const dday = CALCS.getDDay({expireDate});
  const isDanger = CALCS.isDanger({dday});
  const dangerColor = isDanger ? '#FF7F63' : '#62E38C';
  return (
    <PressNavigate
      routeName={'ItemDetail'}
      extraParam={{foodId: id}}
      horizon
      style={{
        paddingVertical: getW(24),
        marginHorizontal: getW(20),
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: getW(1),
        borderBottomColor: 'rgba(196, 196, 196, 0.31)',
      }}>
      <Horizon style={{alignItems: 'center'}}>
        <View
          style={{
            width: getW(38),
            height: getW(38),
            borderRadius: getW(30),
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: dangerColor,
            marginRight: getW(11),
          }}>
          <Image_local
            tint={'black'}
            style={{width: getW(24), height: getW(24)}}
            source={FD_CATE_IMG[cate]}
          />
        </View>
        <View>
          <Horizon style={{alignItems: 'center'}}>
            <Text style={[font.med14, {color: '#38393D'}]}>{cate}</Text>
            <Image_local
              tint={'#F1F3F5'}
              source={COMMON_IC.rightArrow}
              style={{width: getW(24), height: getW(24)}}
            />
            <Text style={[font.med14, {color: '#38393D'}]}>{foodName}</Text>
          </Horizon>
          <Text style={[font.medium, {fontSize: getW(12), color: '#808186'}]}>
            {amount * unitAmount + unit}
          </Text>
        </View>
      </Horizon>
      <Text style={[font.regular, {fontSize: getW(16), color: dangerColor}]}>
        {dday > 0 ? `D-${dday}` : dday === 0 ? 'D-Day' : '상했어요'}
      </Text>
    </PressNavigate>
  );
};

function SearchPage({headerHeight}) {
  const {foodList, inited} = useContext(UserDataContext);
  const [searchedFoods, setSearchedFoods] = useState([]);
  const [listHash, setListHash] = useState('');

  const onKeywordChange = keyword => {
    let foodObjs = {};
    let newlistHash = '';
    foodList.map(foodInfo => {
      const {foodName, id} = foodInfo;
      const cate = FOODS[foodName].cate;
      if (foodName.includes(keyword) || cate.includes(keyword)) {
        console.log('something found !', keyword);
        if (isEmpty(foodObjs[id])) {
          foodObjs[id] = foodInfo;
          newlistHash += id;
        }
      }
    });
    if (newlistHash !== listHash) {
      console.log('search res : ', listHash);
      setListHash(newlistHash);
      setSearchedFoods(Object.values(foodObjs));
    }
  };

  return (
    <View>
      <FlatList_P
        stickyHeaderIndices={[0]}
        ListHeaderComponent={<SearchHeader onKeywordChange={onKeywordChange} />}
        data={searchedFoods}
        renderItem={renderItem}
      />
    </View>
  );
}

export default SearchPage;
