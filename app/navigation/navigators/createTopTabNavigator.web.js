import {BottomTabBar} from '@react-navigation/bottom-tabs';
import {
  Background,
  HeaderHeightContext,
  HeaderShownContext,
} from '@react-navigation/elements';
import {
  createNavigatorFactory,
  TabRouter,
  useNavigationBuilder,
} from '@react-navigation/native';
import React from 'react';
import {Dimensions, View, StyleSheet} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaFrame,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {ScreenContainer, Screen as Screens} from 'react-native-screens';

const {width = 0, height = 0} = Dimensions.get('window');

// To support SSR on web, we need to have empty insets for initial values
// Otherwise there can be mismatch between SSR and client output
// We also need to specify empty values to support tests environments
const initialMetrics = {
  frame: {x: 0, y: 0, width, height},
  insets: {top: 0, left: 0, right: 0, bottom: 0},
};

export function SafeAreaProviderCompat({children, style}) {
  return (
    <SafeAreaProvider initialMetrics={initialMetrics} style={style}>
      {children}
    </SafeAreaProvider>
  );
}

SafeAreaProviderCompat.initialMetrics = initialMetrics;

export function MyTopTab({
  id,
  initialRouteName,
  backBehavior,
  children,
  screenListeners,
  screenOptions,
  sceneContainerStyle,
  // tabBar,
  ...restWithDeprecated
}) {
  const {lazy, ...rest} = restWithDeprecated;

  const {state, navigation, descriptors, NavigationContent} =
    useNavigationBuilder(TabRouter, {
      id,
      initialRouteName,
      backBehavior,
      children,
      screenListeners,
      screenOptions,
      // defaultScreenOptions,
    });

  return (
    <NavigationContent>
      <TopTabView
        {...rest}
        state={state}
        navigation={navigation}
        descriptors={descriptors}
        sceneContainerStyle={sceneContainerStyle}
      />
    </NavigationContent>
  );
}

function TopTabView(props) {
  const {
    tabBar = propst => <BottomTabBar {...propst} />,
    state,
    navigation,
    descriptors,
    safeAreaInsets,
    detachInactiveScreens = true,
    parentHeaderHeight = 0,
    sceneContainerStyle,
  } = props;
  const focusedRouteKey = state.routes[state.index].key;
  const [loaded, setLoaded] = React.useState([focusedRouteKey]);

  if (!loaded.includes(focusedRouteKey)) {
    setLoaded([...loaded, focusedRouteKey]);
  }
  const dimensions = SafeAreaProviderCompat.initialMetrics.frame;

  const renderHeader = () => {
    return tabBar({
      state: state,
      descriptors: descriptors,
      navigation: navigation,
      parentHeaderHeight,
      insets: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    });
  };

  const {routes} = state;

  return (
    <View
      nativeID="gestureHandlerWrapper"
      style={[
        {
          flex: 1,
        },
      ]}>
      <ScreenContainer
        nativeID="ScreenContainer"
        enabled={true}
        style={[{flex: 1}]}>
        {routes.map((route, index) => {
          const descriptor = descriptors[route.key];
          const {lazy = false, unmountOnBlur} = descriptor.options;
          const isFocused = state.index === index;

          if (unmountOnBlur && !isFocused) {
            return null;
          }

          if (lazy && !loaded.includes(route.key) && !isFocused) {
            return null;
          }
          //disable lazy load

          const {freezeOnBlur, topTabHeaderHeight} = descriptor.options;
          return (
            <Screens
              nativeID={'Screens'}
              pointerEvents={'box-none'}
              key={route.key}
              style={[
                StyleSheet.absoluteFill,

                // {zIndex: isFocused ? 0 : -1, display: 'flex'},
                {display: 'flex', overflow: undefined},
              ]}
              activityState={isFocused ? 2 : 0}
              enabled={detachInactiveScreens}
              freezeOnBlur={freezeOnBlur}>
              <View
                nativeID="c-a"
                pointerEvents="box-none"
                style={{
                  flex: 1,
                }}>
                <View nativeID="c-c" pointerEvents="box-none" style={{flex: 1}}>
                  <View
                    nativeID="innerLast"
                    pointerEvents="box-none"
                    style={[
                      {flex: 1},
                      // {minHeight: '100%'},
                    ]}>
                    <MyScreen
                      focused={isFocused}
                      route={descriptor.route}
                      navigation={descriptor.navigation}
                      // headerShown={headerShown}
                      topTabHeaderHeight={topTabHeaderHeight}
                      // headerStatusBarHeight={headerStatusBarHeight}
                      // headerTransparent={headerTransparent}
                      // header={header({
                      //   layout: dimensions,
                      //   route: descriptor.route,
                      //   navigation: descriptor.navigation,
                      //   options: descriptor.options,
                      // })}
                    >
                      {/* <UserDashboard text={index} /> */}
                      {descriptor.render()}
                    </MyScreen>
                  </View>
                </View>
              </View>
            </Screens>
          );
        })}
      </ScreenContainer>
      {renderHeader()}
    </View>
  );
}

function MyScreen(props) {
  const dimensions = useSafeAreaFrame();
  const insets = useSafeAreaInsets();

  const isParentHeaderShown = React.useContext(HeaderShownContext);
  const parentHeaderHeight = React.useContext(HeaderHeightContext);
  const {
    focused,
    modal = false,
    header,
    headerShown = true,
    headerTransparent,
    topTabHeaderHeight = 0,
    navigation,
    route,
    children,
    style,
  } = props;

  return (
    <Background
      accessibilityElementsHidden={!focused}
      importantForAccessibility={focused ? 'auto' : 'no-hide-descendants'}
      style={[styles.reverse, style]}>
      <View style={[styles.content]}>
        <HeaderShownContext.Provider
          value={isParentHeaderShown || headerShown !== false}>
          <HeaderHeightContext.Provider
            value={
              headerShown
                ? topTabHeaderHeight + parentHeaderHeight
                : parentHeaderHeight ?? 0
            }>
            {children}
          </HeaderHeightContext.Provider>
        </HeaderShownContext.Provider>
      </View>
    </Background>
  );
}

const CardSheet = React.forwardRef(function (
  {enabled, layout, style, ...rest},
  ref,
) {
  const [fill, setFill] = React.useState(false);

  React.useEffect(() => {
    if (typeof document === 'undefined' || !document.body) {
      // Only run when DOM is available
      return;
    }

    const width = document.body.clientWidth;
    const height = document.body.clientHeight;
    console.log();
    setFill(width === layout.width && height === layout.height);
  }, [layout.height, layout.width]);
  console.log(
    'sheet res : ',
    enabled && fill ? 'go styles page' : 'go styles card',
  );
  return (
    <View
      nativeID="fromForwardRef "
      {...rest}
      ref={ref}
      style={[enabled && fill ? styles.page : styles.card, style]}
    />
  );
});
function Sheet({render}) {
  const layout = initialMetrics.frame;
  const contentRef = React.useRef();
  return (
    <View
      nativeID="c-a"
      pointerEvents="box-none"
      style={[StyleSheet.absoluteFill, {display: 'flex', overflow: undefined}]}>
      <View nativeID="c-c" pointerEvents="box-none" style={{flex: 1}}>
        <View nativeID="cardCon1" style={{flex: 1}}>
          <CardSheet layout={layout} ref={contentRef} enabled={true}>
            <View style={[styles.hidden]}>
              <View style={{flex: 1}}>{render()}</View>
            </View>
          </CardSheet>
        </View>
      </View>
    </View>
  );
}

const createMaterialTopTabNavigator = createNavigatorFactory(MyTopTab);

export default createMaterialTopTabNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  reverse: {
    flexDirection: 'column-reverse',
    flex: 1,
  },
  hidden: {
    flex: 1,
    overflow: 'hidden',
  },
  page: {
    minHeight: '100%',
  },
  card: {
    flex: 1,
    overflow: 'hidden',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
});
