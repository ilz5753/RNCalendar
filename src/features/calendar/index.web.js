import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import {
  EvilIcons,
  Ionicons,
  Octicons,
  Foundation,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import {
  AppEvents,
  ATI,
  bgBlack,
  bgPrimaryBg,
  bgWhite,
  bwAllh,
  cWhite,
  DayCalendar,
  defaultBr,
  defaultBrSize,
  DrawerDots,
  Gap,
  GoogleGLogo,
  IconButton,
  MonthCalendar,
  MyPhone,
  RippableButton,
  ripple,
  SamsungAccount,
  WeekCalendar,
  YearCalendar,
} from "../../../components/index.mobile";
import {
  aic,
  backgroundColor,
  borderColor,
  borderRadius,
  borderWidth,
  center,
  color,
  fh,
  fontSize,
  fontWeight,
  full,
  fullWidth,
  fw,
  height,
  jcc,
  jcsb,
  jcse,
  layout,
  margin,
  padding,
  row,
  squareLayout,
  tr,
  width,
} from "../../../styles";
import { chunk, floor, isEqual, isUndefined, noop, sum } from "lodash";
import {
  LeftSidebarRowButton,
  LeftSidebarRowExpandableSection,
  WebPager,
  WebMonthView,
  _3_duration_time,
  RightSidebarHeader,
  WebMonthRow,
  DayAndWeekTable,
} from "../../../components/index.web";
import {
  DayData,
  Days,
  DaysOfMonth,
  MonthData,
  Months,
  WeekData,
  YearData,
  _1_days,
} from "../../../components/data";
import { useEffect, useState } from "react";
let startYear = 2020;
let endYear = 2025;
let diff = endYear - startYear + 1;
let years = Array(diff)
  .fill()
  .map((_, i) => startYear + i);
let months = Array(diff * 12)
  .fill()
  .map((_, i) => i);
let weeks = WeekData(years);
let days = DayData(years);
let daysArr = Array(days.length)
  .fill()
  .map((_, i) => i);
let yearDays = years.map((y) => 365 + (isEqual(y % 4, 0) ? 1 : 0));
let yearDaysSum = [];
for (let i = 0; i < yearDays.length; i++)
  yearDaysSum.push(sum(yearDays.slice(0, i)));
export default function WebCalendar() {
  //  statics
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
  let [calendarView, setCalendarView] = useState(cvs.week);
  let [currentDate, setCurrentDate] = useState(new Date());
  let [yearSwipe, setYearSwipe] = useState(0);
  let [monthSwipe, setMonthSwipe] = useState(0);
  let [weekSwipe, setWeekSwipe] = useState(0);
  let [daySwipe, setDaySwipe] = useState(0);
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
    {
      title: "Manage calendars",
      onPress: noop,
      leftIcon: {
        Provider: Foundation,
        name: "page-multiple",
        size: 36,
        color: "gray",
      },
      leftIconStyle: [margin("r", 7.5)],
      leftIconZ: 0.84,
    },
    {
      title: "Settings",
      onPress: noop,
      leftIcon: {
        Provider: EvilIcons,
        name: "gear",
        size: 36,
        color: "gray",
      },
      leftIconZ: 0.8,
    },
  ];
  let hDefGap = <Gap size={20} />;
  let W = 840 - 2 * 20;
  let H = 840 - 2 * 20 - 100;
  useEffect(() => {
    let cy = currentDate.getFullYear();
    let cm = currentDate.getMonth();
    let cd = currentDate.getDate();
    let ys = cy - startYear;
    let ms = cm + ys * 12;
    let monthsDaysInYear = [];
    for (let i = 0; i < 12; i++) monthsDaysInYear.push(DaysOfMonth(cy, i));
    let monthsDaysInYearSum = [];
    for (let i = 0; i < 12; i++)
      monthsDaysInYearSum.push(sum(monthsDaysInYear.slice(0, i)));
    /**
     * ds is not correct
     */
    let ds = yearDaysSum[ys] + monthsDaysInYearSum[cm] + cd;
    setYearSwipe(ys);
    setMonthSwipe(ms);
    setDaySwipe(ds);
  }, [currentDate]);
  return (
    <Animated.View style={[full, bgBlack, aic]}>
      <Animated.View style={[fullWidth, height(120), jcc, padding("h", 30)]}>
        <Animated.View style={[row, center]}>
          <Animated.Text style={[fontSize(36), fontWeight("7"), cWhite]}>
            {`SAMSUNG  `}
          </Animated.Text>
          <Animated.Text style={[fontSize(36), cWhite]}>
            Calendar Web App with React Native
          </Animated.Text>
        </Animated.View>
      </Animated.View>
      <Animated.View style={[layout(1200, 840), bgPrimaryBg, defaultBr, row]}>
        <Animated.View
          style={[
            width(360),
            fh,
            borderWidth("r", 0.25),
            borderColor("r", "gray"),
            borderRadius("l", defaultBrSize),
            padding("", 20),
          ]}
        >
          <Animated.View style={[fw, fh, aic, defaultBr]}>
            {hDefGap}
            <Animated.View style={[layout(360 - 2 * 30, 52.5), row, aic]}>
              <ATI
                style={[
                  width(360 - 2 * 30 - 52.5),
                  fh,
                  fontSize(24),
                  borderRadius("l", 12),
                  { outline: "none" },
                  cWhite,
                  padding("l", 27),
                  padding("r", 6),
                ]}
                placeholder="Search"
                placeholderTextColor="gray"
              />
              <IconButton
                {...{
                  Provider: MaterialIcons,
                  name: "keyboard-voice",
                  size: 52.5,
                  onPress: noop,
                  color: "gray",
                }}
              />
            </Animated.View>
            {hDefGap}
            <DrawerDots w={360 - 2 * 30} />
            {hDefGap}
            <Animated.ScrollView
              {...{
                showsVerticalScrollIndicator: false,
              }}
            >
              {topRowButtons.map((rb, i) => (
                <Animated.View key={i}>
                  <LeftSidebarRowButton
                    {...{
                      w: 360 - 2 * 30,
                      onPress: () => {
                        if (isEqual(rb.title, "Reminder")) {
                        } else setCalendarView(rb.title);
                      },
                      ...rb,
                    }}
                  />
                  {hDefGap}
                </Animated.View>
              ))}
              <DrawerDots w={360 - 2 * 30} />
              {hDefGap}
              {leftSidebarSections.map((ess, i) => (
                <Animated.View key={i}>
                  <LeftSidebarRowExpandableSection
                    {...{
                      w: 360 - 2 * 30,
                      gapSize: 20,
                      ...ess,
                    }}
                  />
                  {isUndefined(ess.isHaveDottedLine) && hDefGap}
                </Animated.View>
              ))}
              {hDefGap}
              <DrawerDots w={360 - 2 * 30} />
              {hDefGap}
              {bottomRowButtons.map((rb, i) => (
                <Animated.View key={i}>
                  <LeftSidebarRowButton {...{ w: 360 - 2 * 30, ...rb }} />
                  {hDefGap}
                </Animated.View>
              ))}
              {hDefGap}
            </Animated.ScrollView>
          </Animated.View>
        </Animated.View>
        <Animated.View
          style={[
            squareLayout(840),
            fh,
            borderRadius("r", defaultBrSize),
            padding("", 20),
          ]}
        >
          {IsYearView && (
            <Animated.View
              style={[full, defaultBr]}
              entering={FadeIn}
              exiting={FadeOut}
            >
              <RightSidebarHeader
                {...{
                  onLeftPress: () =>
                    setCurrentDate((pcd) => {
                      let ny = pcd.getFullYear() - 1;
                      if (ny >= startYear) pcd.setFullYear(ny);
                      return new Date(pcd.getTime());
                    }),
                  onRightPress: () =>
                    setCurrentDate((pcd) => {
                      let ny = pcd.getFullYear() + 1;
                      if (ny <= endYear) pcd.setFullYear(ny);
                      return new Date(pcd.getTime());
                    }),
                  year: currentDate.getFullYear(),
                }}
              />
              <WebPager
                {...{
                  w: W,
                  h: H,
                  data: years,
                  renderItem: ({ item }) => {
                    let now = new Date();
                    let mw = 129;
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
                                  <WebMonthView
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
                  swipeCounter: yearSwipe,
                }}
              />
            </Animated.View>
          )}
          {IsMonthView && (
            <Animated.View
              style={[full, defaultBr]}
              entering={FadeIn}
              exiting={FadeOut}
            >
              <RightSidebarHeader
                {...{
                  onLeftPress: () =>
                    setCurrentDate((pcd) => {
                      let nm = pcd.getMonth() - 1;
                      let cy = pcd.getFullYear();
                      if (nm < 0) {
                        nm = 11;
                        pcd.setFullYear(cy - 1);
                      }
                      pcd.setMonth(nm);
                      return new Date(pcd.getTime());
                    }),
                  onRightPress: () =>
                    setCurrentDate((pcd) => {
                      let nm = pcd.getMonth() + 1;
                      if (nm < months.length - 1) pcd.setMonth(nm);
                      return new Date(pcd.getTime());
                    }),
                  year: currentDate.getFullYear(),
                  month: Months[currentDate.getMonth()].slice(0, 3),
                }}
              />
              <WebPager
                {...{
                  w: W,
                  h: H,
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
                        <Animated.View style={[fw, padding("h", 40)]}>
                          <WebMonthRow
                            {...{
                              w: W - 80,
                              h: 40,
                              data: _1_days,
                              renderItem: ({ item, index }) => {
                                let c = isEqual(index, 4)
                                  ? "#007aff"
                                  : isEqual(index, 5)
                                  ? "red"
                                  : "white";
                                return (
                                  <Animated.Text
                                    style={[fontSize(18), color(c)]}
                                  >
                                    {item}
                                  </Animated.Text>
                                );
                              },
                              disabled: true,
                            }}
                          />
                        </Animated.View>
                        <Animated.View
                          style={[fw, height(H - 40), row, padding("r", 40)]}
                        >
                          <Animated.View
                            style={[
                              width(40),
                              fh,
                              borderWidth("r", 1),
                              borderColor("r", "white"),
                            ]}
                          >
                            {}
                          </Animated.View>
                          <Animated.View style={[width(W - 80), fh]}>
                            {cd.map((ROW, i) => (
                              <WebMonthRow
                                {...{
                                  key: i,
                                  w: W - 80,
                                  h: (H - 40) / cd.length,
                                  data: ROW,
                                  renderItem: ({ item, index }) => {
                                    let today = new Date().getTime();
                                    let cdt = currentDate.getTime();
                                    let active = isEqual(item?.fullDate, cdt);
                                    let isToday = isEqual(cdt, today);
                                    if (isToday)
                                      console.log({ isToday, today, cdt });
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
                                    console.log({ start, end });
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
                  swipeCounter: monthSwipe,
                }}
              />
            </Animated.View>
          )}
          {IsWeekView && (
            <Animated.View
              style={[full, defaultBr]}
              entering={FadeIn}
              exiting={FadeOut}
            >
              <RightSidebarHeader
                {...{
                  onLeftPress: () => {},
                  onRightPress: () => {},
                  year: currentDate.getFullYear(),
                  month: Months[currentDate.getMonth()].slice(0, 3),
                }}
              />
              <WebPager
                {...{
                  w: W,
                  h: H,
                  data: weeks,
                  renderItem: ({ item }) => {
                    // let time = new Date(item);
                    // let td = time.getDay();
                    // let day = Days[td];
                    // let active = isEqual(new Date(), time);
                    // let c = active
                    //   ? "#007aff"
                    //   : isEqual(td, 4)
                    //   ? "#007aff"
                    //   : isEqual(td, 5)
                    //   ? "red"
                    //   : "white";
                    let rh = (H - 40) / 6;
                    return (
                      <Animated.View style={[layout(W, H), defaultBr]}>
                        <Animated.View style={[fw, padding("h", 40)]}>
                          <WebMonthRow
                            {...{
                              w: W - 80,
                              h: 40,
                              data: _1_days,
                              renderItem: ({ item, index }) => {
                                let c = isEqual(index, 4)
                                  ? "#007aff"
                                  : isEqual(index, 5)
                                  ? "red"
                                  : "white";
                                return (
                                  <Animated.Text
                                    style={[fontSize(18), color(c)]}
                                  >
                                    {item}
                                  </Animated.Text>
                                );
                              },
                              disabled: true,
                            }}
                          />
                          <WebMonthRow
                            {...{
                              w: W - 80,
                              h: rh,
                              data: item,
                              renderItem: ({ item, index }) => {
                                let c = isEqual(index, 4)
                                  ? "#007aff"
                                  : isEqual(index, 5)
                                  ? "red"
                                  : "white";
                                return (
                                  <Animated.Text
                                    style={[fontSize(18), color(c)]}
                                  >
                                    {item?.date}
                                  </Animated.Text>
                                );
                              },
                              onItemPress: ({ fullDate }) =>
                                setCurrentDate(new Date(fullDate)),
                            }}
                          />
                        </Animated.View>
                        <DayAndWeekTable
                          {...{
                            w: W,
                            h: H - 40 - rh,
                            isWeek: true,
                          }}
                        />
                      </Animated.View>
                    );
                  },
                  swipeCounter: weekSwipe,
                }}
              />
            </Animated.View>
          )}
          {IsDayView && (
            <Animated.View
              style={[full, defaultBr]}
              entering={FadeIn}
              exiting={FadeOut}
            >
              <RightSidebarHeader
                {...{
                  onLeftPress: () =>
                    setCurrentDate((pcd) => {
                      let nd = pcd.getDate() - 1;
                      if (nd >= 0) pcd.setDate(nd);
                      return new Date(pcd.getTime());
                    }),
                  onRightPress: () =>
                    setCurrentDate((pcd) => {
                      let nd = pcd.getDate() + 1;
                      if (nd <= days.length - 1) pcd.setDate(nd);
                      return new Date(pcd.getTime());
                    }),
                  year: currentDate.getFullYear(),
                  month: Months[currentDate.getMonth()].slice(0, 3),
                }}
              />
              <WebPager
                {...{
                  w: W,
                  h: H,
                  data: daysArr,
                  renderItem: ({ item }) => {
                    let { date, fullDate } = days[item];
                    let time = new Date(fullDate);
                    let td = time.getDay();
                    let day = Days[td];
                    let active = isEqual(new Date(), time);
                    let c = active
                      ? "#007aff"
                      : isEqual(td, 4)
                      ? "#007aff"
                      : isEqual(td, 5)
                      ? "red"
                      : "white";
                    return (
                      <Animated.View style={[layout(W, H), defaultBr]}>
                        <Animated.View
                          style={[
                            fw,
                            height(160),
                            row,
                            aic,
                            jcsb,
                            padding("h", 30),
                          ]}
                        >
                          <Animated.View style={[squareLayout(150), aic, jcse]}>
                            <Animated.Text style={[fontSize(50), color(c)]}>
                              {date}
                            </Animated.Text>
                            <Animated.View style={[fw, row, jcse]}>
                              <Animated.Text style={[fontSize(16.5), color(c)]}>
                                {day}
                              </Animated.Text>
                              <Animated.Text
                                style={[
                                  fontSize(16.5),
                                  fontWeight("6"),
                                  color("gray"),
                                ]}
                              >
                                WK 14
                              </Animated.Text>
                            </Animated.View>
                          </Animated.View>
                          <IconButton
                            {...{
                              Provider: MaterialCommunityIcons,
                              name: "sticker",
                              size: 66,
                              color: "gray",
                            }}
                          />
                        </Animated.View>
                        <DayAndWeekTable
                          {...{
                            w: W,
                            h: H - 160,
                            // isWeek: true,
                          }}
                        />
                      </Animated.View>
                    );
                  },
                  swipeCounter: daySwipe,
                }}
              />
            </Animated.View>
          )}
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
}
