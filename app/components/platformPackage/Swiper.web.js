import COLORS from 'app/assets/styles/colors';
import {CONTAINER} from 'app/assets/styles/containers';
import {getW} from '@constants/appUnits';
import React, {useCallback, useRef, useState} from 'react';
import {View} from 'react-native';
import Swiper from 'react-native-web-swiper';
import SwiperFlatList from 'react-native-swiper-flatlist';
import {Tmedium28} from 'app/assets/styles/textStyle';
import {FlatList_P} from './gestureComponent';
import {isEmpty} from '@_utils/validation';

export function AutoPlaySwiper({
  showPagenation = false,
  autoplayTime = 10,
  onIndexChanged = () => {},
  height,
  children,
  style,
}) {
  const [curIndex, setIndex] = useState(0);
  return (
    <View style={{width: '100%', height, ...style}}>
      <Swiper
        style={{flex: 1}}
        gesturesEnabled={() => children.length > 1}
        loop={true}
        controlsEnabled={false}
        autoplay={true}
        springConfig={{speed: 12, bounciness: 0}}
        timeout={autoplayTime}
        onIndexChanged={index => {
          setIndex(index);
          onIndexChanged(index);
        }}>
        {children}
      </Swiper>
      {showPagenation ? (
        <BannerPaginationWeb
          indexInput={curIndex}
          lengthInput={children.length}
        />
      ) : null}
    </View>
  );
}

const PagenationComps = {
  BANNER: BannerPagination,
};

export function StaticSwiper({
  showPagenation = false,
  height,
  children,
  onIndexChanged = () => {},
  pagenationType = 'BANNER',
  style,
}) {
  return (
    <View style={style}>
      <SwiperFlatList
        onChangeIndex={({index}) => {
          onIndexChanged(index);
        }}
        PaginationComponent={PagenationComps[pagenationType]}
        showPagination={showPagenation}>
        {children}
      </SwiperFlatList>
    </View>
  );
}

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

function BannerPagination(obj) {
  const {paginationIndex, size} = obj;
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
        paginationIndex + 1
      } / ${size}`}</Tmedium28>
    </View>
  );
}

function BannerPaginationWeb({indexInput, lengthInput}) {
  // console.log('index : ', index, total);
  const index = isEmpty(indexInput) ? 0 : indexInput;
  const length = isEmpty(lengthInput) ? 1 : lengthInput;
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
      } / ${length}`}</Tmedium28>
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
