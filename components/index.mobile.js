import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Pressable,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  GestureResponderEvent,
  TextInput,
  Keyboard,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  FadeIn,
  FadeOut,
  runOnJS,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import {
  chunk,
  floor,
  isEqual,
  isFunction,
  isNull,
  isNumber,
  isString,
  isUndefined,
  max,
  min,
  noop,
} from "lodash";
import {
  EvilIcons,
  Entypo,
  Octicons,
  Feather,
  Ionicons,
} from "@expo/vector-icons";
import Svg, { G, Rect, Circle, Ellipse, Path } from "react-native-svg";
import {
  aic,
  aife,
  backgroundColor,
  bcAllTr,
  borderColor,
  borderRadius,
  borderStyle,
  borderWidth,
  center,
  color,
  dim,
  fh,
  fontSize,
  fontWeight,
  full,
  fullHeight,
  fullWidth,
  fw,
  height,
  jcc,
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
  pos,
  row,
  squareLayout,
  tr,
  width,
  zIndex,
} from "../styles";
import {
  RippleButtonProps,
  GapProps,
  // FullWidthPagerProps,
  // FullWidthPagerState,
} from "./index.type";
import { Component, createRef, useEffect, useState } from "react";
import { Days, _1_days } from "./data";
export let CAC = Animated.createAnimatedComponent;
/**
 * Animated TextInput
 */
export let ATI = CAC(TextInput);
/**
 * Animated Touchable Opacity
 */
export let ATO = CAC(TouchableOpacity);
/**
 * Animated Touchable Highlight
 */
export let ATH = CAC(TouchableHighlight);
/**
 * Animated Entypo Icon
 */
export let AEI = CAC(Entypo);
/**
 * Animated Feather Icon
 */
export let AFI = CAC(Feather);
export let duration = {
  duration: 500,
};
export let primaryBg = "#141414";
export let bgPrimaryBg = backgroundColor(primaryBg);
export let bgBlack = backgroundColor("black");
export let bgWhite = backgroundColor("white");
export let cWhite = color("white");
export let bwAllh = borderWidth("", 0.5);
export let bcAllWhite = borderColor("", "white");
export let defaultBrSize = 30;
export let defaultBr = borderRadius("", defaultBrSize);
export let ks = pos.isAndroid ? "keyboardDidShow" : "keyboardWillShow";
export let kh = pos.isAndroid ? "keyboardDidHide" : "keyboardWillHide";
export let ripple = {
  color: "rgba(255,255,255,0.2)",
  borderless: true,
  duration: 400,
};
export let clamp = (value = 0, lower = 0, upper = 1) => {
  "worklet";
  return max([min([value, upper]), lower]);
};
export let EmptyView = () => <></>;

export let ToCMP = (M = EmptyView, W = EmptyView) => (pos.isWeb ? W : M);
/**
 *
 * @param {RippleButtonProps} props
 */
export let RippableButton = (props) => {
  let { duration, borderless, color } = props.ripple;
  let [Ready, setReady] = useState(false);
  let [Dimension, setDimension] = useState({
    width: 0,
    height: 0,
  });
  let Radius = Math.sqrt(
    Math.pow(Dimension.width, 2) + Math.pow(Dimension.height, 2),
  );
  // console.log({ Radius });
  let scale = useSharedValue(0);
  let tx = useSharedValue(0);
  let ty = useSharedValue(0);
  /**
   *
   * @param {GestureResponderEvent} event
   */
  let onPressIn = (event) => {
    let { locationX, locationY } = event.nativeEvent;
    let { width, height } = Dimension;
    let nx = locationX;
    let ny = locationY;
    if (width > height) {
      nx -= width;
      ny -= height / 2;
    } else if (width === height) {
      nx -= width / 2;
      ny -= height / 2;
    } else {
      nx -= width / 2;
      ny -= height;
    }
    tx.value = nx;
    ty.value = ny;
    // console.log({ nx, ny });
    scale.value = withTiming(1, { duration });
    if (props.onPressIn) props.onPressIn(event);
  };
  /**
   *
   * @param {GestureResponderEvent} event
   */
  let onPressOut = (event) => {
    let scaleIsNot1 = scale.value !== 1;
    if (scaleIsNot1) scale.value = withTiming(1, { duration });
    setTimeout(
      () => {
        tx.value = 0;
        ty.value = 0;
        scale.value = 0;
      },
      scaleIsNot1 ? duration : 0,
    );
    if (props.onPressOut) props.onPressOut(event);
  };
  let rippleAnimationStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: tx.value,
      },
      {
        translateY: ty.value,
      },
      {
        scale: scale.value,
      },
    ],
  }));
  if (!Ready)
    return (
      <ATO
        onLayout={({
          nativeEvent: {
            layout: { width, height },
          },
        }) => {
          // console.log({ width, height });
          setDimension({ width, height });
          setReady(true);
        }}
        {...props}
      />
    );
  return (
    <Animated.View style={[props.style, overflow("h"), bcAllTr]}>
      <ATO
        {...{
          onPressIn,
          onPressOut,
          activeOpacity: 1,
          ...props,
        }}
      />
      <Animated.View
        style={[
          overlay,
          squareLayout(2 * Radius),
          rippleAnimationStyle,
          backgroundColor(color),
          borderless && borderRadius("", Radius),
        ]}
      />
    </Animated.View>
  );
};
export let Icon = ({ Provider, name, size, color, ...props }) => (
  <Provider
    {...{
      name,
      size,
      color,
      ...props,
    }}
  />
);
export let IconButton = ({ Provider, size, color, name, onPress }) => {
  return (
    <RippableButton
      {...{
        style: [squareLayout(size), borderRadius("", size / 2), center],
        ripple,
        onPress,
      }}
    >
      <Icon
        {...{
          Provider,
          name,
          color,
          size: size / 1.5,
        }}
      />
    </RippableButton>
  );
};
export let DrawerIcon = ({ Provider, name, ...props }) => (
  <Icon
    {...{
      Provider,
      name,
      size: 28.8,
      color: "gray",
      ...props,
    }}
  />
);
export let DottedLine = ({ w = 1, h = 1, InRow = false, color }) => {
  let u = InRow ? w : h;
  let d = InRow ? h : w;
  return (
    <Animated.View style={[layout(w, h), InRow && [row, aic], jcsb]}>
      {Array(floor(u / d))
        .fill()
        .map(
          (_, i) =>
            i % 3 === 0 && (
              <Animated.View
                key={i}
                style={[
                  squareLayout(d),
                  borderRadius("", d / 2),
                  backgroundColor(color),
                ]}
              />
            ),
        )}
    </Animated.View>
  );
};
export let DrawerDots = ({ w = 1 }) => (
  <DottedLine {...{ w, h: 2, InRow: true, ...cWhite }} />
);
/**
 *
 * @param {GapProps} _
 * @returns
 */
export let Gap = ({ size = 10, type = "t" }) => (
  <Animated.View style={[margin(type, size)]} />
);

export let useKeyboard = (diff = 0) => {
  let Height = useSharedValue("100%");
  let style = useAnimatedStyle(() => ({
    height: Height.value,
  }));
  useEffect(() => {
    let kds = Keyboard.addListener(
      ks,
      ({ endCoordinates: { height }, duration }) => {
        Height.value = withTiming(
          `${100 * (1 - (height + diff) / dim.height)}%`,
          {
            duration,
          },
        );
      },
    );
    let kdh = Keyboard.addListener(kh, ({ duration }) => {
      Height.value = withTiming(`100%`, { duration });
    });
    return () => {
      kds.remove();
      kdh.remove();
    };
  }, []);
  return style;
};
//  svg icons
export let YearCalendar = ({ color }) => (
  <Svg width={36} height={38} xmlns="http://www.w3.org/2000/svg">
    <G fill="none" fillRule="evenodd">
      <Rect fill={color} x={8} width={3} height={7} rx={1} />
      <Rect fill={color} x={25} width={3} height={7} rx={1} />
      <Rect
        stroke={color}
        strokeWidth={2}
        x={1}
        y={3}
        width={34}
        height={34}
        rx={8}
      />
      <Rect fill={color} x={3} y={3} width={30} height={4} rx={1.5} />
      <Rect fill={color} x={5} y={9} width={5} height={5} rx={1} />
      <Rect fill={color} x={5} y={17.5} width={5} height={5} rx={1} />
      <Rect fill={color} x={5} y={26} width={5} height={5} rx={1} />
      <Rect fill={color} x={15.5} y={9} width={5} height={5} rx={1} />
      <Rect fill={color} x={15.5} y={17.5} width={5} height={5} rx={1} />
      <Rect fill={color} x={15.5} y={26} width={5} height={5} rx={1} />
      <Rect fill={color} x={26} y={9} width={5} height={5} rx={1} />
      <Rect fill={color} x={26} y={17.5} width={5} height={5} rx={1} />
      <Rect fill={color} x={26} y={26} width={5} height={5} rx={1} />
    </G>
  </Svg>
);
export let MonthCalendar = ({ color }) => (
  <Svg width={36} height={38} xmlns="http://www.w3.org/2000/svg">
    <G fill="none" fillRule="evenodd">
      <Rect fill={color} x={8} width={3} height={7} rx={1} />
      <Rect fill={color} x={25} width={3} height={7} rx={1} />
      <Rect
        stroke={color}
        strokeWidth={2}
        x={1}
        y={3}
        width={34}
        height={34}
        rx={8}
      />
      <Rect fill={color} x={3} y={3} width={30} height={4} rx={1.5} />
      <Rect fill={color} x={5} y={13} width={26} height={5} rx={1} />
      <Rect fill={color} x={5} y={21.5} width={15.5} height={5} rx={1} />
    </G>
  </Svg>
);
export let WeekCalendar = ({ color }) => (
  <Svg width={36} height={38} xmlns="http://www.w3.org/2000/svg">
    <G fill="none" fillRule="evenodd">
      <Rect fill={color} x={8} width={3} height={7} rx={1} />
      <Rect fill={color} x={25} width={3} height={7} rx={1} />
      <Rect
        stroke={color}
        strokeWidth={2}
        x={1}
        y={3}
        width={34}
        height={34}
        rx={8}
      />
      <Rect fill={color} x={3} y={3} width={30} height={4} rx={1.5} />
      <Rect fill={color} x={5} y={13} width={26} height={5} rx={1} />
    </G>
  </Svg>
);
export let DayCalendar = ({ color }) => (
  <Svg width={36} height={38} xmlns="http://www.w3.org/2000/svg">
    <G fill="none" fillRule="evenodd">
      <Rect fill={color} x={8} width={3} height={7} rx={1} />
      <Rect fill={color} x={25} width={3} height={7} rx={1} />
      <Rect
        stroke={color}
        strokeWidth={2}
        x={1}
        y={3}
        width={34}
        height={34}
        rx={8}
      />
      <Rect fill={color} x={3} y={3} width={30} height={4} rx={1.5} />
      <Rect fill={color} x={5} y={9} width={5} height={5} rx={1} />
    </G>
  </Svg>
);
export let SquareView = ({ size, bg, brs, children }) => (
  <Animated.View
    style={[squareLayout(size), backgroundColor(bg), borderRadius("", brs)]}
  >
    {children}
  </Animated.View>
);
export let CalendarIconView = ({ name, size, color }) => {
  let bg = backgroundColor(color);
  let Clip = (
    <Animated.View
      style={[squareLayout(size * 0.1), borderRadius("", 1), bg]}
    />
  );
  return (
    <Animated.View style={[layout(size, size * 1.1)]}>
      <Animated.View style={[row, aic, jcse]}>
        {Clip}
        {Clip}
      </Animated.View>
      <Animated.View
        style={[
          fw,
          squareLayout(size),
          borderWidth("", 2),
          borderRadius("", 4.5),
          borderColor("", color),
        ]}
      >
        <Animated.View style={[layout(size - 4, size * 0.1), bg]} />
        <Animated.View
          style={[
            layout(size - 4, size * 0.9 - 4),
            center,
            borderRadius("", 3),
          ]}
        >
          <Animated.Text
            style={[fontSize(size * 0.66), fontWeight("5"), { color }]}
          >
            {name}
          </Animated.Text>
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
};
export let MyPhone = () => (
  <Svg width={36} height={36} xmlns="http://www.w3.org/2000/svg">
    <G fill="none" fillRule="evenodd">
      <Rect fill="#01C141" width={36} height={36} rx={8} />
      <Rect stroke="#FFF" x={9.5} y={3.5} width={17} height={29} rx={3.5} />
      <Rect fill="#FFF" x={15} y={29} width={6} height={1} rx={0.5} />
    </G>
  </Svg>
);
export let SamsungAccount = () => (
  <Svg width={36} height={36} xmlns="http://www.w3.org/2000/svg">
    <G fill="none" fillRule="evenodd">
      <Rect fill="#1A1AFF" width={36} height={36} rx={8} />
      <Circle fill="#FFF" cx={18} cy={18} r={12} />
      <Circle fill="#7373FF" cx={18} cy={13.5} r={2.5} />
      <Ellipse fill="#00F" cx={18} cy={21.5} rx={6.5} ry={4.5} />
    </G>
  </Svg>
);
export let GoogleGLogo = () => (
  <Svg width={24} height={24} xmlns="http://www.w3.org/2000/svg">
    <Path
      fill="#4285F4"
      d="M23.745 12.27c0-.79-.07-1.54-.19-2.27h-11.3v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82Z"
    />
    <Path
      fill="#34A853"
      d="M12.255 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96h-3.98v3.09C3.515 21.3 7.565 24 12.255 24Z"
    />
    <Path
      fill="#FBBC05"
      d="M5.525 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62h-3.98a11.86 11.86 0 0 0 0 10.76l3.98-3.09Z"
    />
    <Path
      fill="#EA4335"
      d="M12.255 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C18.205 1.19 15.495 0 12.255 0c-4.69 0-8.74 2.7-10.71 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96Z"
    />
  </Svg>
);
export let AppEvents = () => (
  <Svg width={36} height={36} xmlns="http://www.w3.org/2000/svg">
    <G fill="none" fillRule="evenodd">
      <Rect fill="#00C3B2" width={36} height={36} rx={8} />
      <Rect fill="#FFF" x={20} y={10} width={6} height={6} rx={2} />
      <Rect fill="#FFF" x={20} y={20} width={6} height={6} rx={2} />
      <Rect fill="#FFF" x={10} y={10} width={6} height={6} rx={2} />
      <Rect fill="#00FFE8" x={10} y={20} width={6} height={6} rx={2} />
    </G>
  </Svg>
);
export let SelectBox = ({
  value = false,
  toggleValue,
  rounded = false,
  size = 40,
  activeBg = "#007aff",
  deactiveBg = tr,
  activeBc = tr,
  deactiveBc = "gray",
  checkColor = "black",
}) => {
  let CMP = isUndefined(toggleValue) ? Animated.View : RippableButton;
  return (
    <CMP
      {...{
        style: [
          squareLayout(size),
          bwAllh,
          borderRadius("", size / (rounded ? 2 : 5)),
          borderColor("", value ? activeBc : deactiveBc),
          backgroundColor(value ? activeBg : deactiveBg),
          center,
        ],
        ripple,
        onPress: toggleValue,
      }}
    >
      {value && (
        <AFI
          {...{
            name: "check",
            size: size / 1.5,
            entering: FadeIn,
            exiting: FadeOut,
            color: checkColor,
          }}
        />
      )}
    </CMP>
  );
};

//  Mobile components

export let Section = ({
  w = 0,
  h = 0,
  onPress = noop,
  expandable = false,
  icon,
  title,
  subtitle,
  selectableOptions = [],
  isHaveDottedLine = true,
}) => {
  let nh = h + 10;
  let chevronRotation = useSharedValue(0);
  let soHeight = useSharedValue(0);
  let br = borderRadius("", 8);
  /**
   * Selectable options
   */
  let [SO, setSO] = useState(
    selectableOptions.map((option) => ({ title: option, isSelected: false })),
  );
  let MaxSoHeight = SO.length * nh + (isHaveDottedLine ? 12 : 0);
  let [IsExpanded, setIsExpanded] = useState(false);
  let chevronRotationStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: `${chevronRotation.value}deg`,
      },
    ],
  }));
  let toggleExpandation = () => setIsExpanded((i) => !i);
  let OnPress = () => {
    if (expandable) {
      chevronRotation.value = withTiming(IsExpanded ? 0 : -180, duration);
      soHeight.value = IsExpanded ? 0 : MaxSoHeight;
      toggleExpandation();
    } else onPress();
  };
  let soHeightStyle = useAnimatedStyle(() => ({
    height: withTiming(soHeight.value, duration),
    opacity: withTiming(soHeight.value / MaxSoHeight, {
      duration: duration.duration * (IsExpanded ? 2 : 0.5),
    }),
  }));
  let isSubtitleExist = !isUndefined(subtitle);
  return (
    <Animated.View style={[width(w), expandable ? minHeight(h) : height(nh)]}>
      <RippableButton
        {...{
          style: [
            width(w),
            height(h + (isSubtitleExist ? 16 : 0)),
            padding("v", 2),
            br,
            row,
            aic,
          ],
          ripple,
          onPress: OnPress,
        }}
      >
        <Animated.View style={[margin("l", 10)]}>{icon}</Animated.View>
        <Animated.View
          style={[
            width(w - 60),
            expandable ? [row, aic, jcsb] : jcc,
            margin("l", 15),
            padding("h", 5),
          ]}
        >
          <Animated.View>
            <Animated.Text style={[fontSize(21), cWhite]}>
              {title}
            </Animated.Text>
            {isSubtitleExist && (
              <Animated.Text style={[fontSize(16), color("gray")]}>
                {subtitle}
              </Animated.Text>
            )}
          </Animated.View>
          {expandable && (
            <DrawerIcon
              {...{
                Provider: AEI,
                name: "chevron-down",
                style: [chevronRotationStyle],
              }}
            />
          )}
        </Animated.View>
      </RippableButton>
      {/* <Gap size={gapSize} /> */}
      <Gap />
      {expandable && (
        <Animated.View style={[width(w), soHeightStyle]}>
          {SO.map(({ title, isSelected }, i) => (
            <Animated.View key={i}>
              <RippableButton
                {...{
                  style: [fw, padding("v", 2), br, row, aic],
                  ripple,
                  onPress: () => {
                    let so = [...SO];
                    so[i].isSelected = !isSelected;
                    setSO(so);
                  },
                }}
              >
                <Animated.View
                  style={[squareLayout(36), margin("l", 10), center]}
                >
                  <SelectBox
                    {...{
                      size: 21,
                      rounded: true,
                      value: isSelected,
                    }}
                  />
                </Animated.View>
                <Animated.Text style={[fontSize(21), cWhite, margin("l", 20)]}>
                  {title}
                </Animated.Text>
              </RippableButton>
              {/* <Gap size={gapSize} /> */}
              <Gap />
            </Animated.View>
          ))}
          {isHaveDottedLine && (
            <>
              <DrawerDots w={w} />
              {/* <Gap size={gapSize} /> */}
              <Gap />
            </>
          )}
        </Animated.View>
      )}
    </Animated.View>
  );
};
export let CurrentDateButton = ({ size = 10, color, onPress = noop }) => {
  let [Today, setToday] = useState(new Date());
  useEffect(() => {
    let timer = setInterval(() => setToday(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <RippableButton
      {...{
        style: [squareLayout(size), borderRadius("", size / 2), center],
        ripple,
        onPress,
      }}
    >
      <CalendarIconView
        {...{
          name: Today.getDate(),
          size: size / 1.75,
          color,
        }}
      />
    </RippableButton>
  );
};
// export let FullWidthPager = ({}) => {}
// todo : create custom panable pager instead of FullWidthPager
export let FullWidthPagerCMP = ({
  height,
  data = [],
  renderItem,
  onSwipe,
  initPage = 0,
}) => {
  let dl = data.length;
  let _max = (dl - 1) * dim.width;
  let wh = dim.width / 2;
  let [activePage, setActivePage] = useState(0);
  let tx = useSharedValue(0);
  let htx = useSharedValue(0);
  let updater = () => {
    let TX = -tx.value;
    let _tx = 0;
    for (let i = 0; i < dl; i++) {
      let prev = (i - 1) * dim.width + wh;
      let next = prev + dim.width;
      if (TX >= prev && TX < next) {
        _tx = -(next - wh);
        tx.value = withTiming(_tx, duration);
        htx.value = _tx;
        if (isFunction(onSwipe) && !isEqual(i, activePage)) {
          onSwipe(i);
          setActivePage(i);
        }
      }
    }
  };
  let pagerPan = Gesture.Pan()
    .onUpdate(({ translationX }) => {
      tx.value = clamp(htx.value + translationX, -_max, 0);
    })
    .onEnd(() => {
      runOnJS(updater)();
    });
  let translationStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: tx.value,
      },
    ],
  }));
  useEffect(() => {
    setTimeout(() => {
      let TX = -initPage * dim.width;
      tx.value = withTiming(TX, duration);
      htx.value = TX;
      setActivePage(initPage);
    }, duration.duration / 2);
  }, [initPage]);
  return (
    <Animated.View style={[fullWidth, height, overflow("h")]}>
      <GestureDetector gesture={pagerPan}>
        <Animated.View style={[full, translationStyle, row]}>
          {data.map((item, i) => (
            <Animated.View key={i} style={[fullWidth, fh]}>
              {!isUndefined(renderItem) && renderItem({ item })}
            </Animated.View>
          ))}
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  );
};
export let MonthView = ({
  w = 10,
  isActiveMonth = false,
  days = 30,
  gapStart = 4,
}) => {
  let DAYS = [
    ..._1_days,
    ...Array(gapStart).fill(null),
    ...Array(days)
      .fill()
      .map((_, i) => i + 1),
    ...Array(49 - (gapStart + 7 + days)).fill(null),
  ];
  let now = new Date();
  let nd = now.getDate();
  return (
    <Animated.View style={[squareLayout(w), jcsb]}>
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
