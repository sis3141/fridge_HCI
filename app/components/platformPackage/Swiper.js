import COLORS from 'app/assets/styles/colors';
import {CONTAINER} from 'app/assets/styles/containers';
import {getW} from '@constants/appUnits';
import React, {useCallback, useRef} from 'react';
import {View} from 'react-native';
import Swiper from 'react-native-swiper';
import {Tmedium28} from 'app/assets/styles/textStyle';
import {FlatList_P} from './gestureComponent';

const PagenationComps = {
  BANNER: BannerPagination,
};

export function AutoPlaySwiper({
  showPagenation = false,
  autoplayTime = 10,
  height,
  children,
  onIndexChanged,
  style,
}) {
  return (
    <Swiper
      style={style}
      height={height}
      renderPagination={BannerPagination}
      removeClippedSubviews={true}
      autoplay={true}
      onIndexChanged={onIndexChanged}
      loop
      autoplayTimeout={autoplayTime}
      paginationStyle={{bottom: 0, position: 'absolute'}}>
      {children}
    </Swiper>
  );
}
export function StaticSwiper({
  showPagenation = false,
  height,
  children,
  style,
  loop = false,
  onIndexChanged,
  pagenationType = 'BANNER',
}) {
  return (
    <View style={style}>
      <Swiper
        height={height}
        loop={loop}
        onIndexChanged={onIndexChanged}
        renderPagination={PagenationComps[pagenationType]}
        removeClippedSubviews={false}
        showsPagination={showPagenation}
        paginationStyle={{bottom: 0, position: 'absolute'}}>
        {children}
      </Swiper>
    </View>
  );
}

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

function BannerPagination(index, total, context) {
  // console.log('index : ', index, total);
  return (
    <View
      style={{
        ...CONTAINER.bannerPagination,
        position: 'absolute',
        bottom: getW(36),
        right: getW(32),
      }}>
      <Tmedium28 style={{color: COLORS.white}}>{`${
        index + 1
      } / ${total}`}</Tmedium28>
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
