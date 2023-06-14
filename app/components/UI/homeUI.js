import React, {useRef} from 'react';
import {getW} from '@constants/appUnits';
import {COMMON_IC, FD_CATE_IMG} from '@constants/imageMap';
import {Image_local} from '@platformPackage/Image';
import {
  PressCallback,
  PressGoBack,
  PressNavigate,
} from '@userInteraction/pressAction';
import {Horizon} from '@components/templates/defaultComps';
import {Text, View} from 'react-native';
import SHADOW from '@styles/shadow';
import font from '@styles/textStyle';
import COLORS from '@styles/colors';
import {isExist} from '@_utils/validation';
import {FOODS} from '@_constants/dataConfig';
import {CALCS} from '@hooks/foodCalc';
import {HorizonCardSwiper} from '@platformPackage/Swiper';
import {SwipeRow} from 'react-native-swipe-list-view';
import {_useNavFunctions} from '@hooks/navigationHook';

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
  add: ({style, foodId}) => (
    <PressNavigate
      routeName={'ItemAdd'}
      extraParam={{foodId, isAdding: true, isView: false}}
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
  FoodLabel: ({foodObj, style}) => {
    const {
      foodName,
      id,
      foodIds,
      addDate,
      amount,
      expireDate,
      dday,
      variants = 0,
    } = foodObj;
    const {unit, unitAmount} = FOODS[foodName];
    const isDanger = CALCS.isDanger({dday});
    const isMultiple = variants > 1;
    const swipeRowRef = useRef(null);
    const {_navigate} = _useNavFunctions();
    return (
      <SwipeRow
        ref={swipeRowRef}
        stopRightSwipe={-getW(60)}
        disableRightSwipe
        rightOpenValue={-getW(60)}>
        <View
          style={{
            width: '100%',
            height: '100%',
            ...style,
            alignItems: 'flex-end',
            paddingRight: 0,
            paddingVertical: 0,
          }}>
          <PressCallback
            onPress={() => {
              swipeRowRef?.current?.closeRow();
              _navigate(
                'DeleteConfirm',
                variants > 1
                  ? {isMultiple: true, foodId: foodIds}
                  : {isMultiple: false, foodId: id},
              );
            }}
            style={{
              width: getW(60),
              height: '100%',
              backgroundColor: 'red',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image_local
              style={{width: getW(30), height: getW(30)}}
              tint={'white'}
              source={COMMON_IC.delete}
            />
          </PressCallback>
        </View>
        <PressNavigate
          horizon
          routeName={isMultiple ? 'ItemList' : 'ItemDetail'}
          extraParam={isMultiple ? {foodName} : {foodId: id}}
          style={{
            ...style,
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'white',
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
              {amount * unitAmount + unit}
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
      </SwipeRow>
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
  listHeader: ({cate, foodName, style}) => (
    <Horizon
      style={{
        justifyContent: 'space-between',
        alignItems: 'center',
        ...style,
      }}>
      <PressGoBack>
        <Image_local
          source={COMMON_IC.rightArrow}
          style={{
            width: getW(48),
            height: getW(48),
            transform: [{rotate: '180deg'}],
          }}
        />
      </PressGoBack>
      <Horizon>
        <Image_local
          source={FD_CATE_IMG[cate]}
          style={{width: getW(26), height: getW(26)}}
        />
        <Text style={[font.semi20]}>{foodName}</Text>
      </Horizon>
      <Horizon style={{marginRight: getW(12)}}>
        <Atoms.search style={{marginRight: getW(8)}} />
        <Atoms.add />
      </Horizon>
    </Horizon>
  ),
  dangerSwiper: ({dangerItemList = [], style}) => {
    if (isExist(dangerItemList)) {
      return (
        <View style={{width: '100%', ...style}}>
          <Text style={[font.semi14, {marginLeft: getW(30)}]}>
            폐기 임박!!!
          </Text>
          <HorizonCardSwiper
            cardWidth={getW(60)}
            cardMargin={getW(16)}
            containerPadding={getW(16)}
            contentContainerStyle={{
              alignItems: 'center',
              paddingTop: getW(16),
              paddingBottom: getW(30),
            }}
            dataList={dangerItemList}
            keyExtractor={(item, index) => item.foodName}
            renderItem={({item, index}) => {
              const {foodName, addDate, expireDate, id} = item;
              const dday = CALCS.getDDay({inputDate: addDate, expireDate});
              const ddayText = dday <= 0 ? '오늘까지' : `${dday}일 남음`;
              const {cate} = FOODS[foodName];
              return (
                <PressNavigate
                  horizon
                  routeName={'ItemDetail'}
                  extraParam={{foodId: id}}
                  style={{
                    width: getW(113),
                    height: getW(43),
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

                  <Text
                    style={[
                      font.semi12,
                      {marginLeft: getW(10)},
                    ]}>{`${foodName}\n${ddayText}`}</Text>
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
            alignItems: 'center',
          }}>
          {/* <Text>no trashes</Text> */}
        </View>
      );
    }
  },
  renderMyItem: ({cateItem, style}) => {
    const {cate, foods} = cateItem;
    const sortedVals = Object.values(foods).sort((a, b) => a.dday - b.dday);
    return (
      <View style={style}>
        <Horizon
          style={{
            alignItems: 'center',
            marginBottom: getW(7),
            marginLeft: getW(24),
          }}>
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
            backgroundColor: 'white',
            ...SHADOW.homeCard,
          }}>
          {sortedVals.map((foodInfo, index) => (
            <View>
              <Atoms.FoodLabel
                foodObj={foodInfo}
                style={{
                  paddingHorizontal: getW(30),
                  paddingVertical: getW(12),
                }}
              />
              {sortedVals.length - 1 !== index ? (
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
  renderInfoodList: ({foodList, style}) => (
    <View
      style={{
        backgroundColor: 'white',
        ...SHADOW.homeCard,
        ...style,
      }}>
      {foodList.map((foodInfo, index) => (
        <View key={foodInfo.id}>
          <Atoms.FoodLabel
            style={{
              paddingVertical: getW(10),
              paddingHorizontal: getW(30),
            }}
            foodObj={{
              ...foodInfo,
              dday: CALCS.getDDay({
                inputDate: foodInfo.addDate,
                expireDate: foodInfo.expireDate,
              }),
            }}
          />
          {foodList.length - 1 !== index ? (
            <View
              style={{width: '100%', height: 1, backgroundColor: '#F1F3F5'}}
            />
          ) : null}
        </View>
      ))}
    </View>
  ),
};
