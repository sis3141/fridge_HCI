import {getW, IS_WEB} from '@constants/appUnits';
import React, {useEffect, useState, useRef} from 'react';
import {View, Platform, SectionList} from 'react-native';
import {
  FlatList_P,
  ScrollView_P,
  TextInput_P,
} from '@platformPackage/gestureComponent';

import {_useNavFunctions} from '@hooks/navigationHook';
import {isEmpty} from '@_utils/validation';
import {CONTAINER} from '@styles/containers';
import COLORS from '@styles/colors';
import font from '@styles/textStyle';
import {PressCallback, PressGoBack} from '@userInteraction/pressAction';

//정렬, 마진등 스타일을 wrapping 해주는 컴포넌트

export const Horizon = ({style, children, ...rest}) => (
  <View style={[{flexDirection: 'row'}, style]} {...rest}>
    {children}
  </View>
);

export const View_defaultPage = ({
  style,
  children,
  headerHeight = 0,
  ...rest
}) => {
  return (
    <View
      style={[
        {paddingTop: Platform.OS === 'web' ? headerHeight : 0, flex: 1},
        {
          backgroundColor: COLORS.white,
        },
        style,
      ]}
      {...rest}>
      {children}
    </View>
  );
};
export const ScrollView_defaultPage = ({
  eventLocationInfo,
  TopAbsoluteComponent,
  BottomAbsoluteComponent,

  style,
  viewStyle,
  outRef,
  hasTabbar = false,
  stickyHideOffset = 0,
  contentContainerStyle,
  children,
  keyboardShouldPersistTaps,
  keyboardDismissMode,
  removeClippedSubviews = true,
  headerHeight = 0,
  onScroll: externalOnScroll = null,
  ...rest
}) => {
  const defaultRef = useRef(null);
  const routeName = _useNavFunctions()._getFocusedRouteName();
  const FixedRouteName = React.useMemo(() => routeName, []);

  const hasOnScroll = externalOnScroll;
  const onScroll = e => {
    externalOnScroll && externalOnScroll(e);
  };
  return (
    <View
      style={[
        // WEB_MOBILE_OS !== 'ios' && {flex: 1},
        {flex: 1},
        viewStyle,
      ]}>
      <ScrollView_P
        removeClippedSubviews={removeClippedSubviews}
        keyboardDismissMode={keyboardDismissMode}
        scrollEventThrottle={16}
        keyboardShouldPersistTaps={keyboardShouldPersistTaps}
        {...(hasOnScroll ? {onScroll} : {})}
        ref={outRef ?? defaultRef}
        style={[
          {
            backgroundColor: 'white',
            paddingTop:
              Platform.OS === 'web' ? headerHeight - stickyHideOffset : 0,
          },
          style,
        ]}
        contentContainerStyle={[
          {paddingTop: Platform.OS === 'web' ? stickyHideOffset : 0},
          contentContainerStyle,
        ]}
        {...rest}>
        {children}
      </ScrollView_P>
      {TopAbsoluteComponent ? (
        <View
          pointerEvents="box-none"
          style={{
            position: IS_WEB ? 'fixed' : 'absolute',
            top: IS_WEB ? headerHeight - stickyHideOffset : 0,
            left: 0,
            right: 0,
          }}>
          {TopAbsoluteComponent}
        </View>
      ) : null}
      {BottomAbsoluteComponent ? (
        <View
          pointerEvents="box-none"
          style={{
            position: IS_WEB ? 'fixed' : 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
          }}>
          {BottomAbsoluteComponent}
        </View>
      ) : null}
    </View>
  );
};

export const SectionList_defaultPage = ({
  TopAbsoluteComponent,
  eventLocationInfo,
  BottomAbsoluteComponent,
  stickyHideOffset = 0,
  headerHeight,
  style,
  viewStyle,
  contentContainerStyle,
  sections,
  hasTabbar = false,
  ListHeaderComponent,
  ListEmptyComponent,
  ListFooterComponent,
  data,
  renderItem,
  onEndReached,
  renderSectionHeader,
  eventInfo,
  onScroll: externalOnScroll = null,
  removeClippedSubviews = true,
  keyExtractor = (item, index) => index,
  ...rest
}) => {
  useEffect(() => {
    if (isEmpty(eventInfo?.inited)) {
      return;
    }
    const {type, value, callBack, switcher} = eventInfo;
    switch (type) {
      case 'SCROLL_TO_TOP':
        defaultRef.current.scrollToLocation({
          animated: true,
          sectionIndex: 0,
          itemIndex: 0,
          viewPosition: getW(500),
        });
    }
  }, [eventInfo?.switcher]);
  const defaultRef = useRef();
  const routeName = _useNavFunctions()._getFocusedRouteName();
  const FixedRouteName = React.useMemo(() => routeName, []);

  const hasOnScroll = externalOnScroll;
  const onScroll = e => {
    externalOnScroll && externalOnScroll(e);
  };
  return (
    <View
      style={[
        // WEB_MOBILE_OS !== 'ios' && {flex: 1},
        {flex: 1},
        viewStyle,
      ]}>
      <SectionList
        onScrollToIndexFailed={() => {}}
        removeClippedSubviews={removeClippedSubviews}
        keyExtractor={keyExtractor}
        sections={sections}
        scrollEventThrottle={16}
        ListHeaderComponent={ListHeaderComponent}
        ListEmptyComponent={ListEmptyComponent}
        ListFooterComponent={ListFooterComponent}
        renderSectionHeader={renderSectionHeader}
        {...(hasOnScroll ? {onScroll} : {})}
        ref={defaultRef}
        data={data}
        renderItem={renderItem}
        onEndReached={onEndReached}
        style={[
          {
            backgroundColor: 'white',
            paddingTop: Platform.OS === 'web' ? headerHeight : 0,
          },
          style,
        ]}
        contentContainerStyle={contentContainerStyle}
        {...rest}
      />
      {TopAbsoluteComponent ? (
        <View
          pointerEvents="box-none"
          style={{
            position: IS_WEB ? 'fixed' : 'absolute',
            top: IS_WEB ? headerHeight - stickyHideOffset : 0,
            left: 0,
            right: 0,
          }}>
          {TopAbsoluteComponent}
        </View>
      ) : null}
      {BottomAbsoluteComponent ? (
        <View
          pointerEvents="box-none"
          style={{
            position: IS_WEB ? 'fixed' : 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
          }}>
          {BottomAbsoluteComponent}
        </View>
      ) : null}
    </View>
  );
};
export const FlatList_defaultPage = ({
  TopAbsoluteComponent,
  eventLocationInfo,
  BottomAbsoluteComponent,
  onViewableItemsChanged,
  headerHeight,
  stickyHideOffset = 0,
  style,
  viewabilityConfig,
  keyboardShouldPersistTaps,
  viewStyle,
  outRef,
  hasTabbar = false,
  contentContainerStyle,
  ListHeaderComponent,
  ListEmptyComponent,
  ListFooterComponent,
  stickyHeaderIndices,
  keyExtractor = (item, index) => index,
  data,
  renderItem,
  onScroll: externalOnScroll = null,
  onEndReached,
  removeClippedSubviews = true,
  ...rest
}) => {
  const defaultRef = useRef(null);
  const routeName = _useNavFunctions()._getFocusedRouteName();
  const FixedRouteName = React.useMemo(() => routeName, []);

  const onScroll = e => {
    externalOnScroll && externalOnScroll(e);
  };
  return (
    <View
      style={[
        // WEB_MOBILE_OS !== 'ios' && {flex: 1},
        {flex: 1},
        viewStyle,
      ]}>
      <FlatList_P
        keyboardShouldPersistTaps={keyboardShouldPersistTaps}
        stickyHeaderIndices={stickyHeaderIndices}
        viewabilityConfig={viewabilityConfig}
        onViewableItemsChanged={onViewableItemsChanged}
        removeClippedSubviews={removeClippedSubviews}
        ListHeaderComponent={ListHeaderComponent}
        ListEmptyComponent={ListEmptyComponent}
        ListFooterComponent={ListFooterComponent}
        ref={outRef ?? defaultRef}
        data={data}
        renderItem={renderItem}
        onEndReached={onEndReached}
        keyExtractor={keyExtractor}
        style={[
          {
            backgroundColor: 'white',
            paddingTop:
              Platform.OS === 'web' ? headerHeight - stickyHideOffset : 0,
          },
          style,
        ]}
        contentContainerStyle={[
          {paddingTop: Platform.OS === 'web' ? stickyHideOffset : 0},
          contentContainerStyle,
        ]}
        {...rest}
      />
      {TopAbsoluteComponent ? (
        <View
          pointerEvents="box-none"
          style={{
            position: IS_WEB ? 'fixed' : 'absolute',
            top: IS_WEB ? headerHeight - stickyHideOffset : 0,
            left: 0,
            right: 0,
          }}>
          {TopAbsoluteComponent}
        </View>
      ) : null}
      {BottomAbsoluteComponent ? (
        <View
          pointerEvents="box-none"
          style={{
            position: IS_WEB ? 'fixed' : 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
          }}>
          {BottomAbsoluteComponent}
        </View>
      ) : null}
    </View>
  );
};

export const View_BottomModal = ({
  style,
  children,
  noContainer = false,
  overflowVisible = false,
  headerHeight,

  ...rest
}) => {
  return (
    <PressGoBack onPress={() => console.log('hello')} style={{flex: 1}}>
      <View
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          backdropFilter: 'blur(5px)',

          ...style,
        }}>
        <PressCallback
          style={
            noContainer
              ? {justifyContent: 'flex-end', overflow: 'visible'}
              : {
                  ...CONTAINER.bottomModal,
                  overflow: overflowVisible ? 'visible' : 'hidden',
                }
          }>
          {children}
        </PressCallback>
      </View>
    </PressGoBack>
  );
};

export const View_CenterModal = ({style = {}, ...props}) => (
  <PressGoBack onPress={() => console.log('hello')} style={{flex: 1}}>
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(5px)',
        ...style,
      }}>
      <PressCallback>{props.children}</PressCallback>
    </View>
  </PressGoBack>
);

export const HorizonSpaceBetween = props => (
  <View
    {...props}
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      ...props.style,
    }}>
    {props.children}
  </View>
);

export const TextInput_defalt = ({
  style,
  placeholder,
  onChange,
  focusState = false,
  multiline = false,
  maxLength,
  keyboardType,
  autoFocus = false,
  ...props
}) => {
  const myRef = useRef(null);
  useEffect(() => {
    if (focusState) {
      myRef?.current?.focus();
    }
  }, [focusState]);

  return (
    <TextInput_P
      keyboardType={keyboardType}
      ref={myRef}
      autoFocus={autoFocus}
      maxLength={maxLength}
      multiline={multiline}
      onChangeText={onChange}
      style={{...CONTAINER.inputBox, ...font.placeHolder, ...style}}
      placeholderTextColor={COLORS.lightGray1}
      placeholder={placeholder}
      {...props}
    />
  );
};

export const TextInput_flex = ({
  placeHolderColor = COLORS.lightGray1,
  style,
  autoFocus = false,
  heightPadding = getW(50),
  placeholder,
  onChange,
  maxLength,
  multiline = false,
  initialLineNum = 1,
  textAlignVertical = 'auto',
  textInputRef,
  ...props
}) => {
  const minHeight = heightPadding + font.placeHolder.fontSize * initialLineNum;
  const [height, setHeight] = useState(minHeight);
  return (
    <TextInput_P
      autoFocus={autoFocus}
      ref={textInputRef}
      maxLength={maxLength}
      multiline={multiline}
      onChangeText={onChange}
      onContentSizeChange={e => {
        setHeight(prev =>
          Math.max(e.nativeEvent?.contentSize?.height ?? minHeight, minHeight),
        );
      }}
      textAlignVertical={textAlignVertical}
      style={{...CONTAINER.inputBoxFlex, ...font.placeHolder, ...style, height}}
      placeholderTextColor={placeHolderColor}
      placeholder={placeholder}
      {...props}
    />
  );
};
