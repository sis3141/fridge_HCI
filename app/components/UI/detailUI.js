import {FOODS} from '@_constants/dataConfig';
import {getDateString} from '@_utils/converters';
import {DoNothing} from '@_utils/handling';
import {isEmpty} from '@_utils/validation';
import {Horizon} from '@components/templates/defaultComps';
import {getW} from '@constants/appUnits';
import {COMMON_IC, FD_CATE_IMG} from '@constants/imageMap';
import {CALCS} from '@hooks/foodCalc';
import {_useNavFunctions} from '@hooks/navigationHook';
import {Image_local} from '@platformPackage/Image';
import {TextInput_P} from '@platformPackage/gestureComponent';
import COLORS from '@styles/colors';
import font from '@styles/textStyle';
import {
  PressCallback,
  PressGoBack,
  PressNavigate,
} from '@userInteraction/pressAction';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
const Desc = ({style, children}) => (
  <Text style={[font.semi16, {color: '#a0a0b1'}, style]}>{children}</Text>
);
const BigDesc = ({style, children}) => (
  <Text style={[font.semi16, style]}>{children}</Text>
);

const Bar = () => (
  <View
    style={{
      width: '100%',
      height: getW(1),

      backgroundColor: '#e6e8e9',
      alignSelf: 'center',
    }}
  />
);

const EditWrapper = ({children, foodId, style}) => (
  <PressNavigate routeName={'ItemAdd'} style={style} extraParam={{foodId}}>
    {children}
  </PressNavigate>
);

const AdjustAmount = ({
  curAmount,
  getNewAmount = DoNothing,
  isView = false,
  itemInfo,
  style,
}) => {
  const {_navigate} = _useNavFunctions();
  return (
    <Horizon
      style={{
        borderRadius: getW(4),
        borderWidth: getW(1),
        borderColor: COLORS.green,
        height: getW(30),
        ...style,
      }}>
      <PressCallback
        style={{
          width: getW(50),
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={
          isView
            ? () => _navigate('ItemAdd', {foodId: itemInfo.id})
            : () => getNewAmount(Math.max(curAmount - 1, 1))
        }>
        <Image_local
          tint={COLORS.green}
          source={COMMON_IC.minus}
          style={{width: getW(16), height: getW(16)}}
        />
      </PressCallback>
      <View
        style={{
          height: getW(29),
          width: getW(1),
          backgroundColor: COLORS.green,
        }}
      />
      <PressCallback
        style={{
          width: getW(50),
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={
          isView
            ? () => _navigate('ItemAdd', {foodId: itemInfo.id})
            : () => getNewAmount(curAmount + 1)
        }>
        <Image_local
          tint={COLORS.green}
          source={COMMON_IC.plus}
          style={{width: getW(16), height: getW(16)}}
        />
      </PressCallback>
    </Horizon>
  );
};

const Atoms = {
  edit: ({style, foodId}) => (
    <PressNavigate style={style} routeName={'ItemAdd'} extraParam={{foodId}}>
      <Image_local
        source={COMMON_IC.edit}
        style={{width: getW(24), height: getW(24)}}
      />
    </PressNavigate>
  ),
  delete: ({style, foodId}) => {
    return (
      <PressNavigate
        style={style}
        routeName={'DeleteConfirm'}
        extraParam={{foodId}}>
        <Image_local
          source={COMMON_IC.delete}
          style={{width: getW(24), height: getW(24)}}
        />
      </PressNavigate>
    );
  },
};

export const DetailTPL = {
  detailHeader: ({foodInfo, isDanger, style}) => (
    <Horizon
      style={{
        height: getW(50),
        alignItems: 'center',
        borderBottomWidth: getW(1),
        borderBottomColor: '#d1d1d1',
      }}>
      <PressGoBack style={{flex: 1, alignItems: 'flex-start'}}>
        <Image_local
          style={{
            width: getW(48),
            height: getW(48),
            transform: [{rotate: '180deg'}],
          }}
          source={COMMON_IC.rightArrow}
        />
      </PressGoBack>
      <Horizon
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={[
            font.semi18,
            {color: isDanger ? COLORS.red : COLORS.green, marginRight: getW(8)},
          ]}>
          {foodInfo.foodName}
        </Text>
        <Text style={[font.bold16, {color: COLORS.gray94}]}>
          {`${foodInfo.amount}개`}
        </Text>
      </Horizon>
      <Horizon
        style={{flex: 1, marginRight: getW(16), justifyContent: 'flex-end'}}>
        <Atoms.edit style={{marginRight: getW(10)}} foodId={foodInfo.id} />
        <Atoms.delete foodId={foodInfo.id} />
      </Horizon>
    </Horizon>
  ),
  detailInfo: ({
    foodInfo = {},
    isView = true,
    isAdding = false,
    editAmount = DoNothing,
    editExpireDate = DoNothing,
    editCategory = DoNothing,
    editMemo = DoNothing,
  }) => {
    const {foodName, addDate, expireDate, amount, memo} = foodInfo;
    const {cate} = FOODS[foodName] ?? {};
    const dday = CALCS.getDDay({expireDate});
    const fullRange = CALCS.getFullRange({addDate, expireDate});
    const isDanger = CALCS.isDanger({dday});
    return (
      <View
        style={{
          paddingHorizontal: getW(23),
        }}>
        <PressNavigate
          horizon
          style={{
            ...ST.descCard,
            justifyContent: 'space-between',
          }}
          routeName={isView ? 'ItemAdd' : 'CategorySelecter'}
          extraParam={
            isView ? {foodId: foodInfo.id} : {onCateSelect: editCategory}
          }>
          <Horizon
            style={{
              alignItems: 'center',
            }}>
            <Desc>카테고리</Desc>

            <View
              style={{
                marginLeft: getW(20),
                width: getW(18),
                height: getW(18),
                backgroundColor: 'rgba(133, 224, 163, 0.5)',
                opacity: 0.5,
                borderRadius: getW(18),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image_local
                style={{width: getW(12), height: getW(12)}}
                source={FD_CATE_IMG[cate]}
                tint={COLORS.green}
              />
            </View>
            <BigDesc style={{marginLeft: getW(10)}}>{cate}</BigDesc>
            <Image_local
              source={COMMON_IC.rightArrow}
              tint={'#f1f3f5'}
              style={{
                width: getW(24),
                height: getW(24),
                marginLeft: getW(30),
              }}
            />
            <BigDesc style={{marginLeft: getW(15)}}>{foodName}</BigDesc>
          </Horizon>
          {!isView ? (
            <Image_local
              tint={'#E6E8E9'}
              source={COMMON_IC.rightArrow}
              style={{width: getW(32), height: getW(32)}}
            />
          ) : null}
        </PressNavigate>
        <Bar />
        <Horizon style={ST.descCard} id="수량">
          <Desc>수량</Desc>
          <BigDesc style={{marginLeft: getW(88)}}>{amount}</BigDesc>
          <AdjustAmount
            curAmount={amount}
            getNewAmount={editAmount}
            style={{marginLeft: getW(87)}}
            itemInfo={foodInfo}
            isView={isView}
          />
        </Horizon>
        <Bar />
        <Horizon
          style={{...ST.descCard, justifyContent: 'space-between'}}
          id="소비기한">
          <Horizon style={{alignItems: 'center'}}>
            <Desc>소비기한</Desc>
            {isEmpty(expireDate) ? (
              <EditWrapper foodId={foodInfo.id}>
                <Text
                  style={[
                    font.semi12,
                    {color: COLORS.grayA6, marginLeft: getW(32)},
                  ]}>
                  날짜를 선택해 주세요
                </Text>
              </EditWrapper>
            ) : (
              <BigDesc style={{marginLeft: getW(18)}}>
                {getDateString(new Date(expireDate)) + ' 까지'}
              </BigDesc>
            )}
          </Horizon>
          {!isView ? (
            <PressNavigate
              routeName={isView ? 'ItemAdd' : 'CalendarPage'}
              extraParam={
                isView ? {foodId: foodInfo.id} : {onDaySelect: editExpireDate}
              }>
              <Image_local
                tint={'#E6E8E9'}
                source={COMMON_IC.rightArrow}
                style={{width: getW(32), height: getW(32)}}
              />
            </PressNavigate>
          ) : null}
        </Horizon>
        <Bar />
        <Horizon
          style={{
            ...ST.descCard,
            height: null,
            minHeight: getW(64),
            paddingVertical: getW(10),
          }}
          id="메모">
          <Desc style={{marginRight: getW(46)}}>메모</Desc>
          {isView ? (
            <EditWrapper style={{flex: 1}} foodId={foodInfo.id}>
              <Text
                style={[
                  font.semi16,
                  {
                    color: COLORS.gray94,
                    lineHeight: getW(20),
                  },
                ]}>
                {memo}
              </Text>
            </EditWrapper>
          ) : (
            <TextInput_P
              maxLength={60}
              style={{
                flex: 1,
                height: getW(100),
                backgroundColor: '#f0f0f0',
                padding: getW(10),
                borderRadius: getW(8),
                marginVertical: getW(10),
                lineHeight: getW(20),
                ...font.semi16,
                color: COLORS.gray94,
              }}
              multiline
              defaultValue={memo}
              editable={!isView}
              onChangeText={text => {
                editMemo(text);
              }}
            />
          )}
        </Horizon>
        <Bar />
      </View>
    );
  },
};

const ST = StyleSheet.create({
  descCard: {
    height: getW(63),
    alignItems: 'center',
  },
});
