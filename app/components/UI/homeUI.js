import React from 'react';
import {getW} from '@constants/appUnits';
import {COMMON_IC, FD_CATE_IMG} from '@constants/imageMap';
import {Image_local} from '@platformPackage/Image';
import {PressNavigate} from '@userInteraction/pressAction';
import {Horizon} from '@components/templates/defaultComps';
import {Text, View} from 'react-native';
import SHADOW from '@styles/shadow';
import font from '@styles/textStyle';
import COLORS from '@styles/colors';
import {isExist} from '@_utils/validation';
import {FOODS} from '@_constants/dataConfig';
import {CALCS} from '@hooks/foodCalc';
import {HorizonCardSwiper} from '@platformPackage/Swiper';

const Atoms = {
  search: ({style}) => (
    <PressNavigate
      routeName={'Search'}
      style={{
        borderRadius: getW(40),
        backgroundColor: 'white',
        ...SHADOW.basic,
        ...style,
      }}>
      <Image_local
        style={{width: getW(40), height: getW(40)}}
        source={COMMON_IC.search}
      />
    </PressNavigate>
  ),
  add: ({style}) => (
    <PressNavigate
      routeName={'ItemAdd'}
      style={{
        borderRadius: getW(40),
        backgroundColor: 'white',
        ...SHADOW.basic,
        ...style,
      }}>
      <Image_local
        style={{width: getW(40), height: getW(40)}}
        source={COMMON_IC.add}
      />
    </PressNavigate>
  ),
  foodLabel: ({foodObj}) => {
    const {foodName, addDate, amount, expireDate} = foodObj;
    const {unit} = FOODS[foodName];
    const dday = CALCS.getDDay({inputDate: addDate, expireDate});
    const isDanger = CALCS.isDanger({inputDate: addDate, expireDate});
    return (
      <PressNavigate
        horizon
        routeName={'ItemDetail'}
        extraParam={{foodName}}
        style={{
          justifyContent: 'space-between',
          height: getW(30),
          marginVertical: getW(6),
          alignItems: 'center',
        }}>
        <Horizon style={{alignItems: 'center'}}>
          <Text
            style={[
              font.semi18,
              {
                color: isDanger ? COLORS.red : COLORS.green,
                marginRight: getW(8),
              },
            ]}>
            {foodName}
          </Text>
          <Text style={[font.bold16, {color: COLORS.gray94}]}>
            {amount + unit}
          </Text>
        </Horizon>
        <Horizon style={{alignItems: 'center'}}>
          <Text
            style={[
              font.semi16,
              {color: isDanger ? COLORS.red : COLORS.grayA6},
            ]}>
            {dday > 0 ? `D-${dday}` : dday === 0 ? 'D-DAY' : '상했어'}
          </Text>
          <Image_local
            style={{width: getW(30), height: getW(30)}}
            source={COMMON_IC.rightArrow}
          />
        </Horizon>
      </PressNavigate>
    );
  },
};

export const HomeTPLs = {
  header: ({wholefoodNum = 0, dangerFoodNum = 0, style}) => (
    <Horizon
      style={{
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: getW(20),
        marginTop: getW(20),
      }}>
      <Horizon>
        <Image_local
          style={{
            width: getW(28),
            height: getW(28),
            marginRight: getW(4),
          }}
          source={COMMON_IC.fridge}
        />
        <Text style={font.semi26}>
          {`전체 : ${wholefoodNum} 임박 : `}
          <Text style={{color: COLORS.red}}>{dangerFoodNum}</Text>
        </Text>
      </Horizon>
      <Horizon>
        <Atoms.search style={{marginRight: getW(8)}} />
        <Atoms.add />
      </Horizon>
    </Horizon>
  ),
  dangerSwiper: ({dangerItemList = [], style}) => {
    if (isExist(dangerItemList)) {
      return (
        <View style={{width: '100%', ...style}}>
          <Text style={{marginLeft: getW(20)}}>폐기 임박!!!</Text>
          <HorizonCardSwiper
            cardWidth={getW(60)}
            cardMargin={getW(16)}
            containerPadding={getW(16)}
            contentContainerStyle={{
              alignItems: 'center',
              paddingVertical: getW(30),
            }}
            dataList={dangerItemList}
            keyExtractor={(item, index) => item.foodName}
            renderItem={({item, index}) => {
              const {foodName} = item;
              const {cate} = FOODS[foodName];
              return (
                <PressNavigate
                  routeName={'ItemDetail'}
                  extraParam={{foodName}}
                  style={{
                    width: getW(60),
                    height: getW(60),
                    borderRadius: getW(15),
                    alignItems: 'center',
                    justifyContent: 'center',
                    ...SHADOW.basic,
                  }}>
                  <Image_local
                    source={FD_CATE_IMG[cate]}
                    style={{
                      width: getW(30),
                      height: getW(30),
                      marginBottom: getW(6),
                    }}
                  />
                  <Text style={[font.semi12]}>{foodName}</Text>
                </PressNavigate>
              );
            }}
          />
        </View>
      );
    } else {
      return (
        <View
          style={{
            width: '100%',
            height: getW(100),
            backgroundColor: 'gray',
            alignItems: 'center',
          }}>
          <Text>no trashes</Text>
        </View>
      );
    }
  },
  renderMyItem: ({cateItem, style}) => {
    const {cate, foods} = cateItem;

    return (
      <View style={style}>
        <Horizon style={{alignItems: 'center', marginBottom: getW(7)}}>
          <Image_local
            source={FD_CATE_IMG[cate]}
            style={{
              width: getW(24),
              height: getW(24),
              marginRight: getW(4),
            }}
          />
          <Text style={[font.semi20]}>{cate}</Text>
        </Horizon>
        <View
          style={{
            paddingHorizontal: getW(12),
            paddingVertical: getW(13),
            backgroundColor: 'white',
            borderRadius: getW(15),
            ...SHADOW.homeCard,
          }}>
          {foods.map((foodInfo, index) => (
            <View>
              <Atoms.foodLabel foodObj={foodInfo} />
              {foods.length - 1 !== index ? (
                <View
                  style={{width: '100%', height: 1, backgroundColor: '#F1F3F5'}}
                />
              ) : null}
            </View>
          ))}
        </View>
      </View>
    );
  },
};
