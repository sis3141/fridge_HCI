import {FOODS, FOOD_CATES} from '@_constants/dataConfig';
import {View_BottomModal} from '@components/templates/defaultComps';
import {_useNavFunctions} from '@hooks/navigationHook';
import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {PressCallback, PressGoBack} from '@userInteraction/pressAction';
import {Image_local} from '@platformPackage/Image';
import font from '@styles/textStyle';
import {FD_CATE_IMG} from '@constants/imageMap';
import {getW} from '@constants/appUnits';
import {isExist} from '@_utils/validation';
import {Handle} from '@pages/ItemAddPage';
import SHADOW from '@styles/shadow';

const CateSelecter = ({onSelect}) => {
  return (
    <View>
      <View
        style={{
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
        }}>
        {FOOD_CATES.map(cateName => {
          return (
            <PressCallback
              key={cateName}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: getW(60),
                height: getW(60),
                marginHorizontal: getW(12),
                marginVertical: getW(12),
                borderRadius: getW(15),
                ...SHADOW.basic,
              }}
              onPress={() => {
                onSelect(cateName);
              }}>
              <Image_local
                style={{
                  width: getW(30),
                  height: getW(30),
                }}
                source={FD_CATE_IMG[cateName]}
              />
              <Text style={[font.semi12]}>{cateName}</Text>
            </PressCallback>
          );
        })}
        <PressGoBack
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
          <Text style={[font.semi18, {color: 'white'}]}>뒤로가기</Text>
        </PressGoBack>
      </View>
    </View>
  );
};

const FoodSelecter = ({onSelect, onCancel, cate}) => {
  const foodList = Object.keys(FOODS).filter(
    foodName => FOODS[foodName].cate === cate,
  );
  return (
    <View>
      <View style={{marginBottom: getW(16)}}>
        {foodList.map(foodName => {
          return (
            <PressCallback
              key={foodName}
              style={{marginVertical: getW(16), alignSelf: 'center'}}
              onPress={() => {
                onSelect(foodName);
              }}>
              <Text style={[font.semi18]}>{foodName}</Text>
            </PressCallback>
          );
        })}
      </View>
      <PressCallback
        onPress={() => {
          onCancel();
        }}
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
        <Text style={[font.semi18, {color: 'white'}]}>뒤로가기</Text>
      </PressCallback>
    </View>
  );
};

function CategorySelecter() {
  const {_getCurParam, _goBack} = _useNavFunctions();
  const {onCateSelect} = _getCurParam();
  const [selState, setSelState] = useState({
    cate: null,
    food: null,
  });

  return (
    <View_BottomModal>
      <Handle style={{alignSelf: 'center', marginVertical: getW(16)}} />
      <View
        style={{
          backgroundColor: 'white',
        }}>
        {isExist(selState.cate) ? (
          <FoodSelecter
            onCancel={() => setSelState({cate: null, food: null})}
            cate={selState.cate}
            onSelect={foodName => {
              onCateSelect(foodName);
              _goBack();
            }}
          />
        ) : (
          <CateSelecter
            onSelect={cate => {
              setSelState({cate, food: null});
            }}
          />
        )}
      </View>
    </View_BottomModal>
  );
}

export default CategorySelecter;
