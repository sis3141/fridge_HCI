import React, {useCallback, useRef} from 'react';
import {View} from 'react-native';
import Swiper from 'react-native-swiper';
import {FlatList_P} from './gestureComponent';

export function CenterSwiper({
  // inputkey,
  width,
  height,
  cardWidth,
  cardHeight,
  cardPadding = 0,
  children,
  onIndexChanged,
}) {
  // console.log('key : ', inputkey);
  return (
    <View
      style={{
        width: '100%',
        height,
        alignItems: 'center',
      }}>
      <Swiper
        scrollEnabled={true}
        loop={false}
        scrollViewStyle={{overflow: 'visible'}}
        removeClippedSubviews={false}
        showsPagination={false}
        onIndexChanged={onIndexChanged}
        width={cardWidth}
        height={height}>
        {children}
      </Swiper>
    </View>
  );
}

export const HorizonCardSwiper = ({
  cardWidth,
  cardMargin = 0,
  containerPadding,
  outRef,
  style,
  contentContainerStyle,
  onViewableItemsChangedCallback = () => {},
  viewabilityConfig,
  keyExtractor = (item, index) => index,
  empty,
  dataList,
  getItemLayout = (data, index) => ({
    length: cardWidth + cardMargin,
    offset: containerPadding + index * (cardWidth + cardMargin),
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
      ref={outRef}
      horizontal
      pagingEnabled
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={viewabilityConfig}
      ListEmptyComponent={empty}
      showsHorizontalScrollIndicator={false}
      disableIntervalMomentum={true}
      snapToInterval={cardWidth + cardMargin}
      keyExtractor={keyExtractor}
      getItemLayout={getItemLayout}
      data={dataList}
      renderItem={obj => {
        return <View style={{marginRight: cardMargin}}>{renderItem(obj)}</View>;
      }}
      contentContainerStyle={{
        paddingHorizontal: containerPadding,
        ...contentContainerStyle,
      }}
    />
  );
};
