import { useEffect, useState } from "react";
import {
  chunk,
  isEqual,
  isFunction,
  isNull,
  isNumber,
  isObject,
  isString,
  isUndefined,
  noop,
} from "lodash";
import { Entypo } from "@expo/vector-icons";
import Animated, {
  FadeIn,
  FadeInLeft,
  FadeInRight,
  FadeOut,
  FadeOutLeft,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import {
  AEI,
  bcAllWhite,
  bgWhite,
  bwAllh,
  cWhite,
  defaultBr,
  DrawerDots,
  duration,
  Gap,
  Icon,
  IconButton,
  RippableButton,
  ripple,
  SelectBox,
} from "./index.mobile";
import {
  aic,
  aife,
  backgroundColor,
  borderColor,
  borderRadius,
  borderStyle,
  borderWidth,
  center,
  color,
  fontSize,
  fontWeight,
  full,
  fw,
  height,
  jcfe,
  jcsb,
  jcse,
  layout,
  margin,
  minHeight,
  overflow,
  overlay,
  pa,
  padding,
  row,
  squareLayout,
  top,
  tr,
  width,
} from "../styles";
import { MonthDaysToArr, _1_days } from "./data";
export let _3_duration_time = 3 * duration.duration;
export let _3_duration = {
  duration: _3_duration_time,
};
export let LeftSidebarRowButton = ({
  leftIcon,
  leftIconZ = 0.66,
  leftIconStyle,
  rightIcon,
  rightIconZ = 0.66,
  rightIconStyle,
  w = 20,
  onPress = noop,
  title,
  subtitle,
}) => {
  let leftIconExist = !isUndefined(leftIcon);
  return (
    <RippableButton
      {...{
        style: [
          layout(w, 40 + 20 * leftIconZ),
          borderRadius("", 12),
          row,
          aic,
          jcsb,
          padding("h", 10),
        ],
        onPress,
        ripple,
      }}
    >
      <Animated.View style={[row, aic]}>
        {leftIconExist && (
          <Animated.View
            style={[
              {
                transform: [
                  {
                    scale: leftIconZ,
                  },
                ],
              },
              leftIconStyle,
            ]}
          >
            <Icon {...leftIcon} />
          </Animated.View>
        )}
        <Animated.View style={[margin("l", 25), jcse]}>
          <Animated.Text style={[fontSize(22), cWhite]}>{title}</Animated.Text>
          {isString(subtitle) && (
            <Animated.Text style={[fontSize(16), color("gray")]}>
              {subtitle}
            </Animated.Text>
          )}
        </Animated.View>
      </Animated.View>
      {!isUndefined(rightIcon) && (
        <Animated.View
          style={[
            {
              transform: [
                {
                  scale: rightIconZ,
                },
              ],
            },
            rightIconStyle,
          ]}
        >
          <Icon {...rightIcon} />
        </Animated.View>
      )}
    </RippableButton>
  );
};
export let LeftSidebarRowExpandableSection = ({
  w = 10,
  selectableOptions = [],
  section,
  gapSize = 10,
  isHaveDottedLine = true,
}) => {
  let MAX_Height =
    selectableOptions.length * (52.5 + gapSize) +
    (isHaveDottedLine ? gapSize : 0);
  let [IsExpanded, setIsExpanded] = useState(false);
  let [SO, setSO] = useState(
    selectableOptions.map((option) => ({ title: option, isSelected: false })),
  );
  let rotation = useSharedValue(0);
  let childHeight = useSharedValue(0);
  let rotationStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: `${rotation.value}deg`,
      },
    ],
  }));
  let childHeightStyle = useAnimatedStyle(() => ({
    height: withTiming(childHeight.value, duration),
    opacity: withTiming(childHeight.value / MAX_Height, {
      duration: duration.duration * (IsExpanded ? 5 : 0.5),
    }),
  }));
  let toggleExpandation = () => setIsExpanded((i) => !i);
  let onPress = () => {
    rotation.value = withTiming(IsExpanded ? 0 : -180, duration);
    childHeight.value = withTiming(IsExpanded ? 0 : MAX_Height, duration);
    toggleExpandation();
  };
  let g = <Gap size={gapSize} />;
  return (
    <Animated.View style={[width(w), minHeight(60)]}>
      <LeftSidebarRowButton
        {...{
          w,
          rightIcon: {
            Provider: AEI,
            name: "chevron-down",
            size: 48,
            color: "gray",
            style: [rotationStyle],
          },
          onPress,
          ...section,
        }}
      />
      <Animated.View style={[width(w), childHeightStyle]}>
        {g}
        {SO.map(({ title, isSelected }, i) => (
          <Animated.View key={i}>
            <LeftSidebarRowButton
              {...{
                w,
                leftIcon: {
                  Provider: SelectBox,
                  size: 36,
                  value: isSelected,
                  rounded: true,
                },
                title,
                onPress: () => {
                  let so = [...SO];
                  so[i].isSelected = !isSelected;
                  setSO(so);
                },
              }}
            />
            {g}
          </Animated.View>
        ))}
        {isHaveDottedLine && (
          <>
            <DrawerDots w={w} />
            {g}
          </>
        )}
      </Animated.View>
    </Animated.View>
  );
};
export let ChevronBtn = ({ type, onPress = noop, ...props }) => (
  <IconButton
    {...{
      Provider: AEI,
      name: `chevron-${type}`,
      size: 48,
      onPress,
      ...cWhite,
      ...props,
    }}
  />
);
export let WebPager = ({
  w = 100,
  h = 100,
  data = [],
  swipeCounter = 0,
  renderItem,
  // onSwipe = noop,
}) => {
  let dl = data.length;
  let ref = useAnimatedRef();
  let [activePage, setActivePage] = useState(0);
  // let hw = w / 2;
  // let onScroll = useAnimatedScrollHandler({
  //   onScroll({ contentOffset: { x } }) {
  //     for (let i = 0; i < dl; i++) {
  //       let z = i * w;
  //       let prev = z - hw;
  //       let next = z + hw;
  //       if (x >= prev && x < next) {
  //         setActivePage(i);
  //         onSwipe(i);
  //       }
  //     }
  //   },
  // });
  useEffect(() => {
    ref.current?.scrollTo({
      x: swipeCounter * w,
      animated: true,
    });
    setActivePage(swipeCounter);
  }, [swipeCounter]);
  return (
    <Animated.View style={[layout(w, h), defaultBr]}>
      <Animated.ScrollView
        {...{
          ref,
          contentContainerStyle: [layout(dl * w, h)],
          horizontal: true,
          pagingEnabled: true,
          scrollEnabled: false,
          showsHorizontalScrollIndicator: false,
          // onScroll,
          scrollEventThrottle: 16,
        }}
      >
        {data.map(
          (item, i) =>
            isEqual(activePage, i) && (
              <Animated.View style={[layout(w, h)]} key={i}>
                {isFunction(renderItem) && renderItem({ item })}
              </Animated.View>
            ),
        )}
      </Animated.ScrollView>
    </Animated.View>
  );
};
export let WebMonthView = ({
  w = 10,
  isActiveMonth = false,
  days = 30,
  gapStart = 4,
}) => {
  let DAYS = [
    ..._1_days,
    ...Array(gapStart).fill(null),
    ...MonthDaysToArr(days),
    ...Array(49 - (gapStart + 7 + days)).fill(null),
  ];
  let now = new Date();
  let nd = now.getDate();
  return (
    <Animated.View style={[layout(1.5 * w, w)]}>
      {chunk(DAYS, 7).map((ROW, i) => (
        <Animated.View style={[row, aic, jcse]} key={i}>
          {ROW.map((item, j) => {
            let active = isActiveMonth && isNumber(item) && isEqual(nd, item);
            let bg = active ? (isEqual(j, 5) ? "red" : "#007aff") : tr;
            let c = active
              ? "white"
              : isEqual(j, 5)
              ? "red"
              : isEqual(j, 4)
              ? "#007aff"
              : "white";
            return (
              <Animated.View
                key={i * 7 + j}
                style={[
                  squareLayout(w / 7),
                  borderRadius("", 1.5),
                  backgroundColor(bg),
                  center,
                ]}
              >
                {!isNull(item) && (
                  <Animated.Text
                    style={[fontSize(w / 10.5), color(c), fontWeight("5")]}
                  >
                    {item}
                  </Animated.Text>
                )}
              </Animated.View>
            );
          })}
        </Animated.View>
      ))}
    </Animated.View>
  );
};

export let RightSidebarHeader = ({
  onLeftPress = noop,
  onRightPress = noop,
  month,
  year,
}) => {
  return (
    <Animated.View style={[fw, height(100), row, aic, jcsb]}>
      <IconButton
        {...{
          Provider: Entypo,
          name: "chevron-left",
          size: 48,
          onPress: onLeftPress,
          ...cWhite,
        }}
      />
      <RippableButton
        {...{
          style: [layout(120, 48), borderRadius("", 12), center, row],
          ripple,
        }}
      >
        {!isUndefined(month) && (
          <Animated.Text
            style={[fontSize(24), cWhite, margin("r", 12)]}
            entering={FadeInLeft}
            exiting={FadeOutLeft}
          >
            {month}
          </Animated.Text>
        )}
        <Animated.Text style={[fontSize(24), cWhite]}>{year}</Animated.Text>
      </RippableButton>
      <IconButton
        {...{
          Provider: Entypo,
          name: "chevron-right",
          size: 48,
          onPress: onRightPress,
          ...cWhite,
        }}
      />
    </Animated.View>
  );
};
export let WebMonthRow = ({
  w = 10,
  h = 10,
  data = [],
  onItemPress = noop,
  disabled = false,
  renderItem,
}) => {
  return (
    <Animated.View style={[layout(w, h), row]}>
      {data.map((item, i) => (
        <RippableButton
          {...{
            key: i,
            style: [layout(w / data.length, h), aic, defaultBr],
            ripple,
            disabled,
            onPress: () => onItemPress(item),
          }}
        >
          {isFunction(renderItem) && renderItem({ item, index: i })}
          {isObject(item) &&
            !isUndefined(item?.isActive) &&
            !item?.isActive && (
              <Animated.View
                style={[
                  full,
                  overlay,
                  defaultBr,
                  backgroundColor("rgba(20,20,20,0.66)"),
                ]}
                entering={FadeIn}
                exiting={FadeOut}
              />
            )}
        </RippableButton>
      ))}
    </Animated.View>
  );
};
export let DayAndWeekTable = ({ w = 10, h = 10, isWeek = false }) => {
  // let isScroll = useSharedValue(false);
  // let onScroll = useAnimatedScrollHandler({
  //   onBeginDrag() {
  //     isScroll.value = true;
  //   },
  //   onEndDrag() {
  //     isScroll.value = false;
  //   },
  // });
  // let scrollerBorderTop = useAnimatedStyle(() => ({
  //   zIndex: isScroll.value ? 1 : -1,
  //   height: withTiming(isScroll.value ? 1 : 0, duration),
  // }));
  return (
    <Animated.View style={[layout(w, h)]}>
      <Animated.View
        style={[
          width(w - 40),
          height(1),
          overlay,
          bgWhite,
          top(0),
          margin("l", 20),
        ]}
      />
      <Animated.View style={[layout(w, h)]}>
        <Animated.ScrollView
          {...{
            // onScroll,
            showsVerticalScrollIndicator: false,
          }}
        >
          {isWeek
            ? chunk(
                Array(24 * 2 * 7)
                  .fill()
                  .map((_, i) => i),
                7,
              ).map((ROW, i) => {
                let isOdd = isEqual((i + 1) % 2, 0);
                return (
                  <Animated.View key={i} style={[layout(w - 42, 42), row]}>
                    <Animated.View
                      style={[squareLayout(42), aife, jcfe, padding("r", 5)]}
                    >
                      {isOdd && (
                        <Animated.Text style={[fontSize(15), color("gray")]}>
                          {(i + 1) / 2}
                        </Animated.Text>
                      )}
                    </Animated.View>
                    <Animated.View
                      key={i}
                      style={[
                        layout(w - 84, 42),
                        borderWidth("b", isOdd ? 0.75 : 1.5),
                        borderColor("b", "gray"),
                        !isOdd && borderStyle("."),
                        row,
                      ]}
                    >
                      {ROW.map((item, j) => (
                        <Animated.View
                          key={j}
                          style={[
                            layout((w - 84) / 7, 42),
                            borderWidth("l", 0.5),
                            borderColor("l", "gray"),
                          ]}
                        ></Animated.View>
                      ))}
                    </Animated.View>
                  </Animated.View>
                );
              })
            : Array(24 * 2)
                .fill()
                .map((_, i) => {
                  let isOdd = isEqual((i + 1) % 2, 0);
                  return (
                    <Animated.View key={i} style={[layout(w - 42, 42), row]}>
                      <Animated.View
                        style={[squareLayout(42), aife, jcfe, padding("r", 5)]}
                      >
                        {isOdd && (
                          <Animated.Text style={[fontSize(15), color("gray")]}>
                            {(i + 1) / 2}
                          </Animated.Text>
                        )}
                      </Animated.View>
                      <Animated.View
                        key={i}
                        style={[
                          layout(w - 84, 42),
                          borderWidth("b", isOdd ? 0.75 : 1.5),
                          borderColor("b", "gray"),
                          !isOdd && borderStyle("."),
                        ]}
                      ></Animated.View>
                    </Animated.View>
                  );
                })}
          <Gap size={42} />
        </Animated.ScrollView>
      </Animated.View>
    </Animated.View>
  );
};
