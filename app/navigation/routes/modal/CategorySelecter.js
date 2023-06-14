import {FOODS, FOOD_CATES} from '@_constants/dataConfig';
import {View_CenterModal} from '@components/templates/defaultComps';
import {_useNavFunctions} from '@hooks/navigationHook';
import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {PressCallback} from '@userInteraction/pressAction';
import {Image_local} from '@platformPackage/Image';
import font from '@styles/textStyle';
import {FD_CATE_IMG} from '@constants/imageMap';
import {WINDOW_HEIGHT, WINDOW_WIDTH, getW} from '@constants/appUnits';
import {ScrollView_P} from '@platformPackage/gestureComponent';
import {isExist} from '@_utils/validation';

const CateSelecter = ({onSelect}) => {
  return (
    <View>
      <Text style={[font.semi14, {marginTop: getW(16), alignSelf: 'center'}]}>
        카테고리 선택
      </Text>

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
              style={{alignItems: 'center'}}
              onPress={() => {
                onSelect(cateName);
              }}>
              <Image_local
                style={{
                  width: getW(60),
                  height: getW(60),
                  marginHorizontal: getW(32),
                  marginTop: getW(32),
                  marginBottom: getW(16),
                }}
                source={FD_CATE_IMG[cateName]}
              />
              <Text style={[font.semi16]}>{cateName}</Text>
            </PressCallback>
          );
        })}
      </View>
    </View>
  );
};

const FoodSelecter = ({onSelect, cate}) => {
  const foodList = Object.keys(FOODS).filter(
    foodName => FOODS[foodName].cate === cate,
  );
  return (
    <View>
      <Text
        style={[
          font.semi14,
          {marginTop: getW(16), marginBottom: getW(32), alignSelf: 'center'},
        ]}>
        음식 선택
      </Text>
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
    <View_CenterModal>
      <View
        style={{
          width: (WINDOW_WIDTH * 2) / 3,
          height: WINDOW_HEIGHT / 2,
          backgroundColor: 'white',
        }}>
        <ScrollView_P>
          {isExist(selState.cate) ? (
            <FoodSelecter
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
        </ScrollView_P>
      </View>
    </View_CenterModal>
  );
}

export default CategorySelecter;
