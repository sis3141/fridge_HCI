import React, {useCallback, useRef} from 'react';
import {View} from 'react-native';
import Swiper from 'react-native-web-swiper';
import {FlatList_P} from './gestureComponent';

export function CenterSwiper({
  inputkey,
  width,
  height,
  cardWidth,
  cardHeight,
  children,
  onIndexChanged,
}) {
  return (
    <View
      style={{
        width: '100%',
        height,
        alignItems: 'center',
      }}>
      <Swiper
        key={inputkey}
        loop={false}
        onIndexChanged={onIndexChanged}
        controlsEnabled={false}
        innerContainerStyle={{overflow: 'visible'}}
        style={{width: cardWidth, height: cardHeight}}
        containerStyle={{
          width: cardWidth,
          height: cardHeight,
        }}>
        {children}
      </Swiper>
    </View>
  );
}

export const HorizonCardSwiper = ({
  cardWidth,
  cardMargin,
  containerPadding,
  style,
  outRef,
  contentContainerStyle,
  onViewableItemsChangedCallback = () => {},
  viewabilityConfig,
  empty,
  dataList,
  getItemLayout = (data, index) => ({
    length: cardWidth + cardMargin,
    offset: containerPadding - cardMargin + index * (cardWidth + cardMargin),
    index,
  }),
  renderItem,
  ...props
}) => {
  const viewableConfigRef = useRef(viewabilityConfig);
  const onViewableItemsChanged = useCallback(
    onViewableItemsChangedCallback,
    [],
  );

  return (
    <FlatList_P
      {...props}
      style={style}
      horizontal
      pagingEnabled
      ref={outRef}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={viewabilityConfig}
      ListEmptyComponent={empty}
      showsHorizontalScrollIndicator={false}
      disableIntervalMomentum={true}
      snapToInterval={cardWidth + cardMargin}
      getItemLayout={getItemLayout}
      keyExtractor={(item, index) => index}
      data={dataList}
      renderItem={obj => {
        return (
          <View
            style={{
              marginLeft:
                cardMargin +
                (obj.index === 0 ? containerPadding - cardMargin : 0),
            }}>
            {renderItem(obj)}
          </View>
        );
      }}
      contentContainerStyle={{
        paddingRight: containerPadding,
        ...contentContainerStyle,
      }}
    />
  );
};

export function HorizonCardWithIndexResponse({
  style,
  cardWidth,
  contentContainerStyle,
  dataList,
  renderItem,
  onIndexChanged,
  springConfig = {speed: 12, bounciness: 2},
}) {
  return (
    <View style={{...style, ...contentContainerStyle}}>
      <Swiper
        onIndexChanged={onIndexChanged}
        springConfig={springConfig}
        controlsEnabled={false}
        innerContainerStyle={{
          overflow: 'visible',
        }}
        containerStyle={{
          width: cardWidth,
        }}>
        {dataList.map((item, index) => {
          return renderItem({item, index});
        })}
      </Swiper>
    </View>
  );
}
