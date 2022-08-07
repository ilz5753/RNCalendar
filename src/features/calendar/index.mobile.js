import { chunk, floor, isEqual, isUndefined, noop, sum } from "lodash";
import { useState } from "react";
import Animated, {
  FadeInLeft,
  FadeOutLeft,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Octicons, Ionicons, Foundation, EvilIcons } from "@expo/vector-icons";
import {
  AppEvents,
  ATO,
  bcAllWhite,
  bgBlack,
  bgPrimaryBg,
  bgWhite,
  bwAllh,
  clamp,
  DayCalendar,
  defaultBr,
  DrawerDots,
  duration,
  Gap,
  GoogleGLogo,
  IconButton,
  MonthCalendar,
  MyPhone,
  RippableButton,
  SamsungAccount,
  WeekCalendar,
  YearCalendar,
  ripple,
  cWhite,
  CurrentDateButton,
  FullWidthPagerCMP,
  MonthView,
} from "../../../components/index.mobile";
import {
  borderRadius,
  center,
  padding,
  root,
  squareLayout,
  margin,
  full,
  dim,
  width,
  overflow,
  row,
  height,
  fh,
  fw,
  backgroundColor,
  pa,
  overlay,
  aife,
  aic,
  jcfe,
  layout,
  fontSize,
  fontWeight,
  jcsb,
  jcse,
  color,
  borderWidth,
  borderColor,
  tr,
  tac,
} from "../../../styles";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import {
  LeftSidebarRowButton,
  LeftSidebarRowExpandableSection,
  WebMonthRow,
  WebMonthView,
} from "../../../components/index.web";
import { useNavigation } from "@react-navigation/native";
import {
  DayData,
  MonthData,
  Months,
  WeekData,
  YearData,
  _1_days,
} from "../../../components/data";

let startYear = 2020;
let endYear = 2025;
let diff = endYear - startYear + 1;
let years = Array(diff)
  .fill()
  .map((_, i) => startYear + i);
let months = Array(diff * 12)
  .fill()
  .map((_, i) => i);
// let weeks = WeekData(years);
// let days = DayData(years);
// let daysArr = Array(days.length)
//   .fill()
//   .map((_, i) => i);
// let yearDays = years.map((y) => 365 + (isEqual(y % 4, 0) ? 1 : 0));
// let yearDaysSum = [];
// for (let i = 0; i < yearDays.length; i++)
//   yearDaysSum.push(sum(yearDays.slice(0, i)));
export default function Calculator() {
  let { navigate } = useNavigation();
  let insets = useSafeAreaInsets();
  //  statics
  let MinWidth = dim.width * 0.84;
  let MaxWidth = dim.width;
  let Height = dim.height - insets.top - 20;
  let drawerContentPadding = 30;
  let drawerContentWidth = MinWidth - 2 * 30;
  /**
   * Calendar views
   */
  let cvs = {
    year: "Year",
    month: "Month",
    week: "Week",
    day: "Day",
  };
  //  states
  let tx = useSharedValue(-MinWidth);
  let htx = useSharedValue(-MinWidth);
  let [calendarView, setCalendarView] = useState(cvs.month);
  let [currentDate, setCurrentDate] = useState(new Date());
  let drawerPan = Gesture.Pan()
    .onUpdate(({ translationX }) => {
      tx.value = clamp(translationX + htx.value, -MinWidth, 0);
    })
    .onEnd(() => {
      let end = tx.value < -MinWidth / 2 ? -MinWidth : 0;
      tx.value = withTiming(end, duration);
      htx.value = end;
    });
  let translationStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: tx.value,
      },
    ],
  }));
  let overlayStyle = useAnimatedStyle(() => ({
    opacity: 0.5 * (1 + tx.value / MinWidth),
    zIndex: tx.value === -MinWidth ? -1 : 1,
  }));
  let IsYearView = isEqual(calendarView, cvs.year);
  let IsMonthView = isEqual(calendarView, cvs.month);
  let IsWeekView = isEqual(calendarView, cvs.week);
  let IsDayView = isEqual(calendarView, cvs.day);
  let topRowButtons = [
    {
      title: cvs.year,
      leftIcon: {
        Provider: YearCalendar,
        color: "gray",
      },
    },
    {
      title: cvs.month,
      leftIcon: {
        Provider: MonthCalendar,
        color: "gray",
      },
    },
    {
      title: cvs.week,
      leftIcon: {
        Provider: WeekCalendar,
        color: "gray",
      },
    },
    {
      title: cvs.day,
      leftIcon: {
        Provider: DayCalendar,
        color: "gray",
      },
    },
    {
      title: "Reminder",
      leftIcon: {
        Provider: Octicons,
        name: "bell-fill",
        size: 36,
        color: "gray",
      },
    },
  ];
  let leftSidebarSections = [
    {
      section: {
        title: "My Phone",
        leftIcon: { Provider: MyPhone },
        leftIconZ: 1,
      },
      selectableOptions: ["My calendars", "Contacts' birthday"],
    },
    {
      section: {
        title: "Samsung account",
        leftIcon: { Provider: SamsungAccount },
        leftIconZ: 1,
      },
      selectableOptions: ["Samsung calendar"],
    },
    {
      section: {
        title: "Google",
        leftIcon: { Provider: GoogleGLogo },
        leftIconZ: 1,
        leftIconStyle: [
          squareLayout(36),
          borderRadius("", 18),
          bgWhite,
          center,
        ],
        subtitle: "samsung@gmail.com",
      },
      selectableOptions: ["samsung@gmail.com"],
    },
    {
      section: {
        title: "Google",
        leftIcon: { Provider: GoogleGLogo },
        leftIconZ: 1,
        leftIconStyle: [
          squareLayout(36),
          borderRadius("", 18),
          bgWhite,
          center,
        ],
        subtitle: "samsung@gmail.com",
      },
      selectableOptions: ["samsung@gmail.com"],
    },
    {
      section: {
        title: "Google",
        leftIcon: { Provider: GoogleGLogo },
        leftIconZ: 1,
        leftIconStyle: [
          squareLayout(36),
          borderRadius("", 18),
          bgWhite,
          center,
        ],
        subtitle: "samsung@gmail.com",
      },
      selectableOptions: ["samsung@gmail.com"],
    },
    {
      section: {
        title: "Google",
        leftIcon: { Provider: GoogleGLogo },
        leftIconZ: 1,
        leftIconStyle: [
          squareLayout(36),
          borderRadius("", 18),
          bgWhite,
          center,
        ],
        subtitle: "samsung@gmail.com",
      },
      selectableOptions: ["samsung@gmail.com"],
    },
    {
      section: {
        title: "Google",
        leftIcon: { Provider: GoogleGLogo },
        leftIconZ: 1,
        leftIconStyle: [
          squareLayout(36),
          borderRadius("", 18),
          bgWhite,
          center,
        ],
        subtitle: "samsung@gmail.com",
      },
      selectableOptions: ["samsung@gmail.com"],
    },
    {
      section: {
        title: "Google",
        leftIcon: { Provider: GoogleGLogo },
        leftIconZ: 1,
        leftIconStyle: [
          squareLayout(36),
          borderRadius("", 18),
          bgWhite,
          center,
        ],
        subtitle: "samsung@gmail.com",
      },
      selectableOptions: ["samsung@gmail.com"],
    },
    {
      section: {
        title: "Google",
        leftIcon: { Provider: GoogleGLogo },
        leftIconZ: 1,
        leftIconStyle: [
          squareLayout(36),
          borderRadius("", 18),
          bgWhite,
          center,
        ],
        subtitle: "samsung@gmail.com",
      },
      selectableOptions: ["samsung@gmail.com"],
    },
    {
      section: {
        title: "Google",
        leftIcon: { Provider: GoogleGLogo },
        leftIconZ: 1,
        leftIconStyle: [
          squareLayout(36),
          borderRadius("", 18),
          bgWhite,
          center,
        ],
        subtitle: "samsung@gmail.com",
      },
      selectableOptions: ["samsung@gmail.com"],
    },
    {
      section: {
        title: "App events",
        leftIcon: { Provider: AppEvents },
        leftIconZ: 1,
      },
      selectableOptions: ["Reminder"],
      isHaveDottedLine: false,
    },
  ];
  let bottomRowButtons = [
    {
      title: "Sync now",
      onPress: noop,
      leftIcon: {
        Provider: Ionicons,
        name: "sync",
        size: 36,
        color: "gray",
      },
      leftIconStyle: [
        {
          transform: [
            {
              rotate: "80deg",
            },
          ],
        },
      ],
    },
  ];
  let toggleExpandtion = () => {
    let TX = tx.value === 0 ? -MinWidth : 0;
    tx.value = withTiming(TX, duration);
    htx.value = TX;
  };
  let hDefGap = <Gap size={20} />;
  let W = MaxWidth;
  let H = Height - 60;
  return (
    <Animated.View
      style={[
        root,
        bgBlack,
        padding("t", insets.top),
        padding("b", 20),
        overflow("h"),
      ]}
    >
      <Animated.View
        style={[
          width(MinWidth + MaxWidth),
          height(Height),
          row,
          defaultBr,
          translationStyle,
        ]}
      >
        <GestureDetector gesture={drawerPan}>
          <Animated.View style={[width(MinWidth), fh, bgPrimaryBg, defaultBr]}>
            <Animated.ScrollView
              style={[defaultBr, padding("h", drawerContentPadding)]}
              showsVerticalScrollIndicator={false}
            >
              {hDefGap}
              <Animated.View style={[fw, height(52.5), row, aic, jcfe]}>
                <IconButton
                  {...{
                    Provider: EvilIcons,
                    name: "gear",
                    size: 52.5,
                    color: "gray",
                  }}
                />
              </Animated.View>
              {hDefGap}
              {topRowButtons.map((rb, i) => (
                <Animated.View key={i}>
                  <LeftSidebarRowButton
                    {...{
                      w: drawerContentWidth,
                      onPress: () => {
                        if (isEqual(rb.title, "Reminder")) {
                        } else {
                          setCalendarView(rb.title);
                          toggleExpandtion();
                        }
                      },
                      ...rb,
                    }}
                  />
                  {hDefGap}
                </Animated.View>
              ))}
              <DrawerDots w={drawerContentWidth} />
              {hDefGap}
              {leftSidebarSections.map((ess, i) => (
                <Animated.View key={i}>
                  <LeftSidebarRowExpandableSection
                    {...{
                      w: drawerContentWidth,
                      gapSize: 20,
                      ...ess,
                    }}
                  />
                  {isUndefined(ess.isHaveDottedLine) && hDefGap}
                </Animated.View>
              ))}
              {hDefGap}
              <DrawerDots w={drawerContentWidth} />
              {hDefGap}
              {bottomRowButtons.map((rb, i) => (
                <Animated.View key={i}>
                  <LeftSidebarRowButton {...{ w: drawerContentWidth, ...rb }} />
                  {hDefGap}
                </Animated.View>
              ))}
              <Animated.View style={[fw, height(52.5), center]}>
                <RippableButton
                  {...{
                    style: [
                      layout(195, 48),
                      borderRadius("", 24),
                      backgroundColor("#272727"),
                      center,
                    ],
                    ripple,
                  }}
                >
                  <Animated.Text
                    style={[fontSize(18), fontWeight("6"), cWhite]}
                  >
                    Manage calendars
                  </Animated.Text>
                </RippableButton>
              </Animated.View>
              {hDefGap}
            </Animated.ScrollView>
          </Animated.View>
        </GestureDetector>
        <Animated.View style={[width(MaxWidth), fh, defaultBr]}>
          <Animated.View
            style={[fw, height(60), padding("h", 15), row, aic, jcsb]}
          >
            <Animated.View style={[row, aic]}>
              <IconButton
                {...{
                  Provider: Ionicons,
                  name: "ios-menu-outline",
                  ...cWhite,
                  size: 50,
                  onPress: toggleExpandtion,
                }}
              />
              <RippableButton
                {...{
                  style: [layout(120, 48), borderRadius("", 12), center, row],
                  ripple,
                }}
              >
                {!IsYearView && (
                  <Animated.Text
                    style={[fontSize(24), cWhite, margin("r", 12)]}
                    entering={FadeInLeft}
                    exiting={FadeOutLeft}
                  >
                    {Months[currentDate.getMonth()].slice(0, 3)}
                  </Animated.Text>
                )}
                <Animated.Text style={[fontSize(24), cWhite]}>
                  {currentDate.getFullYear()}
                </Animated.Text>
              </RippableButton>
            </Animated.View>
            <Animated.View style={[width(2 * 50), row, aic, jcsb]}>
              <IconButton
                {...{
                  Provider: Ionicons,
                  name: "ios-search-outline",
                  size: 44,
                  onPress: () => navigate("Search"),
                  ...cWhite,
                }}
              />
              <CurrentDateButton
                {...{
                  size: 44,
                  ...cWhite,
                  onPress: () => setCurrentDate(new Date()),
                }}
              />
            </Animated.View>
          </Animated.View>
          <Animated.View style={[fw, height(H), bgPrimaryBg, defaultBr]}>
            {IsYearView && (
              <FullWidthPagerCMP
                {...{
                  height: fh,
                  data: years,
                  renderItem: ({ item }) => {
                    let now = new Date();
                    let mw = W / 3 - 30;
                    let yearData = YearData(item);
                    return (
                      <Animated.View style={[layout(W, H), defaultBr, jcse]}>
                        {chunk(yearData.months, 3).map((ROW, i) => (
                          <Animated.View key={i} style={[row, jcse]}>
                            {ROW.map((month, j) => {
                              let isActiveMonth =
                                isEqual(month.str, Months[now.getMonth()]) &&
                                isEqual(item, now.getFullYear());
                              return (
                                <RippableButton
                                  {...{
                                    key: i * 3 + j,
                                    style: [layout(1.5 * mw, mw + 30), aic],
                                    ripple,
                                    onPress: () => {
                                      setCurrentDate((pcd) => {
                                        pcd.setMonth(month.num);
                                        return new Date(pcd.getTime());
                                      });
                                      setCalendarView(cvs.month);
                                    },
                                  }}
                                >
                                  <Animated.Text
                                    style={[
                                      fontSize(20),
                                      fontWeight("6"),
                                      color(
                                        isActiveMonth ? "#007aff" : "white",
                                      ),
                                      margin("b", 5),
                                    ]}
                                  >
                                    {month.str}
                                  </Animated.Text>
                                  <MonthView
                                    {...{
                                      w: mw,
                                      isActiveMonth,
                                      ...month,
                                    }}
                                  />
                                </RippableButton>
                              );
                            })}
                          </Animated.View>
                        ))}
                      </Animated.View>
                    );
                  },
                  onSwipe: (index) => {
                    let cd = currentDate;
                    cd.setFullYear(startYear + index);
                    setCurrentDate(new Date(cd.getTime()));
                  },
                  initPage: currentDate.getFullYear() - startYear,
                }}
              />
            )}
            {IsMonthView && (
              <FullWidthPagerCMP
                {...{
                  height: fh,
                  data: months,
                  renderItem: ({ item }) => {
                    let now = new Date();
                    let y = floor(item / 12);
                    let year = startYear + y;
                    let month = item % 12;
                    let monthData = MonthData(year, month);
                    let cd = chunk(monthData.days, 7);
                    return (
                      <Animated.View style={[layout(W, H), defaultBr]}>
                        <Animated.View style={[fw, padding("h", 20)]}>
                          <WebMonthRow
                            {...{
                              w: W - 40,
                              h: 40,
                              data: _1_days,
                              renderItem: ({ item, index }) => {
                                let c = isEqual(index, 4)
                                  ? "#007aff"
                                  : isEqual(index, 5)
                                  ? "red"
                                  : "white";
                                return (
                                  <Animated.View style={[full, center]}>
                                    <Animated.Text
                                      style={[fontSize(18), color(c)]}
                                    >
                                      {item}
                                    </Animated.Text>
                                  </Animated.View>
                                );
                              },
                              disabled: true,
                            }}
                          />
                        </Animated.View>
                        <Animated.View
                          style={[fw, height(H - 40), row, padding("r", 20)]}
                        >
                          <Animated.View
                            style={[
                              width(20),
                              fh,
                              borderWidth("r", 1),
                              borderColor("r", "white"),
                            ]}
                          >
                            {}
                          </Animated.View>
                          <Animated.View style={[width(W - 40), fh]}>
                            {cd.map((ROW, i) => (
                              <WebMonthRow
                                {...{
                                  key: i,
                                  w: W - 40,
                                  h: (H - 40) / cd.length,
                                  data: ROW,
                                  renderItem: ({ item, index }) => {
                                    let today = new Date().getTime();
                                    let cdt = currentDate.getTime();
                                    let active = isEqual(item?.fullDate, cdt);
                                    let isToday = isEqual(cdt, today);
                                    let c = isToday
                                      ? "white"
                                      : isEqual(index, 4)
                                      ? "#007aff"
                                      : isEqual(index, 5)
                                      ? "red"
                                      : "white";
                                    let bg = isToday
                                      ? isEqual(index, 4)
                                        ? "#007aff"
                                        : isEqual(index, 5)
                                        ? "red"
                                        : tr
                                      : tr;
                                    return (
                                      <Animated.View
                                        style={[
                                          full,
                                          aic,
                                          defaultBr,
                                          active && [
                                            bwAllh,
                                            borderColor("", "#007aff"),
                                          ],
                                          backgroundColor(bg),
                                        ]}
                                      >
                                        <Animated.Text
                                          style={[fontSize(18), color(c)]}
                                        >
                                          {item?.date}
                                        </Animated.Text>
                                      </Animated.View>
                                    );
                                  },
                                  onItemPress: ({ fullDate }) => {
                                    let start = new Date(startYear, 0, 1);
                                    let end = new Date(endYear, 11, 31);
                                    if (fullDate < start.getTime())
                                      setCurrentDate(start);
                                    else if (fullDate > end.getTime())
                                      setCurrentDate(end);
                                    else setCurrentDate(new Date(fullDate));
                                  },
                                }}
                              />
                            ))}
                          </Animated.View>
                        </Animated.View>
                      </Animated.View>
                    );
                  },
                  onSwipe: (index) => {
                    let y = floor(index / 12);
                    let year = startYear + y;
                    let month = index % 12;
                    setCurrentDate(new Date(year, month));
                  },
                  initPage:
                    12 * (currentDate.getFullYear() - startYear) +
                    currentDate.getMonth(),
                }}
              />
            )}
            {(IsWeekView || IsDayView) && (
              <Animated.View style={[full, center]}>
                <Animated.Text style={[fontSize(24), color("red"), tac]}>
                  Because of low optimising of data this view not render
                </Animated.Text>
              </Animated.View>
            )}
          </Animated.View>
          <Animated.View style={[full, pa, overlayStyle, bgBlack, defaultBr]}>
            <ATO
              style={[width(MaxWidth - MinWidth), fh, bcAllWhite]}
              activeOpacity={0.8}
              onPress={toggleExpandtion}
            />
          </Animated.View>
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
}
