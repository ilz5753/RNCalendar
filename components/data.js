import { chunk, isEqual } from "lodash";

export let Months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export let Days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
export let DaysOfMonth = (year = 2000, month = 0) => {
  let days = 31;
  switch (month) {
    case 3:
    case 5:
    case 8:
    case 10:
      days = 30;
      break;
    case 1:
      days = year % 4 === 0 ? 29 : 28;
      break;
    default:
      break;
  }
  return days;
};
export let _1_days = Days.map((d) => d[0]);
export let MonthDaysToArr = (days = 30) =>
  Array(days)
    .fill()
    .map((_, i) => i + 1);
let nowYear = new Date().getFullYear();
export let CalendarData = (startYear = nowYear, endYear = nowYear + 1) => {
  let data = [];
  for (let i = startYear; i <= endYear; i++) {
    let year = [];
    for (let j = 0; j < 12; j++) {
      let month = DaysOfMonth(i, j);
      year.push({
        monthNumber: j,
        month: Months[j],
        data: month,
        gapStart: new Date(i, j, 0).getDay(),
      });
    }
    data.push({
      year: i,
      isLeapYear: i % 4 === 0,
      data: year,
    });
  }
  //   console.log(data);
  return data;
};
export let CalendarDATA = (startYear = nowYear, endYear = nowYear + 1) => {
  let cd = CalendarData(startYear, endYear);
  let months = [];
  for (let { data, year } of cd)
    for (let item of data) {
      let prevYear = year;
      let nextYear = year;
      let prevMonth = item.monthNumber - 1;
      let nextMonth = item.monthNumber + 1;
      if (isEqual(item.monthNumber, 0)) {
        prevMonth = 11;
        nextMonth = 1;
        prevYear -= 1;
      } else if (isEqual(item.monthNumber, 11)) {
        prevMonth = 10;
        nextMonth = 0;
        nextYear += 1;
      }
      let prevDays = DaysOfMonth(prevYear, prevMonth);
      let nextDays = DaysOfMonth(nextYear, nextMonth);
      let prevDaysArr = MonthDaysToArr(prevDays);
      prevDaysArr = prevDaysArr.slice(prevDays - item.gapStart, prevDays);
      let nextDaysArr = MonthDaysToArr(nextDays);
      nextDaysArr = nextDaysArr.slice(0, 42 - (item.data + item.gapStart));
      months.push([
        ...prevDaysArr.map((i) => ({
          day: i,
          active: false,
        })),
        ...MonthDaysToArr(item.data).map((i) => ({
          day: i,
          active: true,
        })),
        ...nextDaysArr.map((i) => ({
          day: i,
          active: false,
        })),
      ]);
    }
  let f = cd[0];
  let lastMonth = DaysOfMonth(f.year - 1, 11);
  let t = MonthDaysToArr(lastMonth).slice(
    lastMonth - f.data[0].gapStart,
    lastMonth,
  );
  let hRes = t;
  for (let { data } of cd)
    for (let item of data) hRes.push(...MonthDaysToArr(item.data));
  let weeks = chunk(hRes, 7);
  let days = [];
  for (let { year, data } of cd)
    for (let item of data)
      days.push(
        ...MonthDaysToArr(item.data).map((n) => ({
          date: n,
          day: Days[new Date(year, item.monthNumber, n).getDay()],
        })),
      );
  return {
    YEARS: cd,
    MONTHS: months,
    WEEKS: weeks,
    DAYS: days,
  };
};
export let formatter = (arr = [], year = 2000, month = 0) =>
  arr.map((date) => ({
    date,
    fullDate: new Date(year, month, date).getTime(),
  }));
export let YearData = (year = 2000) => {
  let months = [];
  for (let i = 0; i < 12; i++)
    months.push({
      num: i,
      str: Months[i],
      days: DaysOfMonth(year, i),
      gapStart: new Date(year, i, 0).getDay(),
    });
  return {
    isLeapYear: year % 4 === 0,
    months,
  };
};
export let MonthData = (year = 2000, month = 0) => {
  let prevMonth = month - 1;
  let nextMonth = month + 1;
  let prevYear = year;
  let nextYear = year;
  if (isEqual(month, 0)) {
    prevMonth = 11;
    prevYear -= 1;
  }
  if (isEqual(month, 11)) {
    nextMonth = 0;
    nextYear += 1;
  }
  let prevDays = DaysOfMonth(prevYear, prevMonth);
  let currDays = DaysOfMonth(year, month);
  let nextDays = DaysOfMonth(nextYear, nextMonth);
  let prevDaysArr = MonthDaysToArr(prevDays);
  let currDaysArr = MonthDaysToArr(currDays);
  let nextDaysArr = MonthDaysToArr(nextDays);
  let gapStart = new Date(year, month, 0).getDay();
  let gapEnd = 6 * 7 - currDays - gapStart;
  let days = [
    ...prevDaysArr.slice(prevDays - gapStart, prevDays).map((date) => ({
      isActive: false,
      date,
      fullDate: new Date(prevYear, prevMonth, date).getTime(),
    })),
    ...currDaysArr.map((date) => ({
      isActive: true,
      date,
      fullDate: new Date(year, month, date).getTime(),
    })),
    ...nextDaysArr.slice(0, gapEnd).map((date) => ({
      isActive: false,
      date,
      fullDate: new Date(nextYear, nextMonth, date).getTime(),
    })),
  ];
  // let yearDays = 365 + isEqual(year % 4, 0) ? 1 : 0;
  // let daysFromPrevMonth = sum(
  //   Array(month)
  //     .fill()
  //     .map((_, i) => DaysOfMonth(year, i)),
  // );
  // let startWeek = floor(daysFromPrevMonth / 7) + 1;
  // let endWeek = startWeek + 5;
  // if (isEqual(month, 0)) {
  //   if (isEqual(gapStart, 0)) {
  //   } else {
  //     startWeek = 52;
  //     endWeek = 5;
  //   }
  // }
  // if (isEqual(month, 11)) {
  //   if (isEqual(gapStart, 0)) {
  //   } else {
  //     startWeek = 52;
  //     endWeek = 5;
  //   }
  // }
  // let weeks = [];
  // if (isEqual(startWeek, 52)) weeks = [52, ...MonthDaysToArr(endWeek)];
  // if (isEqual(startWeek, 53)) weeks = [53, ...MonthDaysToArr(endWeek)];
  // if (isEqual(endWeek, 1)) weeks = [...MonthDaysToArr(52 - startWeek), 1];
  // else weeks = MonthDaysToArr(endWeek - startWeek);
  /** 1800
   * 01 - 07 - 12 - 18 - 24 - 29 - 35 - 40 - 46 - 52 - 57 - 63 - 68 - 74
   * 6 - 5 - 6 - 6 - 6 - 5 - 6 - 5 - 6 - 6 - 5 - 6 - 5 - 6
   */
  return {
    str: Months[new Date(year, month).getMonth()],
    days,
  };
};
export let WeekData = (years = [2000]) => {
  let l = years.length - 1;
  let start = years[0];
  let end = years[l];
  let lastMonthOfPY = DaysOfMonth(start - 1, 11);
  let gapStart = new Date(start, 0, 0).getDay();
  let s = MonthDaysToArr(lastMonthOfPY).slice(
    lastMonthOfPY - gapStart,
    lastMonthOfPY,
  );
  let firstMonthOfNY = DaysOfMonth(end + 1, 0);
  let firstMonthOfNYDays = MonthDaysToArr(firstMonthOfNY);
  let gapStartOfNY = new Date(end + 1, 0, 0).getDay();
  let e = firstMonthOfNYDays.slice(gapStartOfNY, 7);
  let weekDays = [...formatter(s, start - 1, 11)];
  for (let i = 0; i <= l; i++) {
    let yearDays = [];
    for (let yd of Array(12)
      .fill()
      .map((_, j) => MonthDaysToArr(DaysOfMonth(years[i], j))))
      yearDays.push(...yd);
    for (let j = 0; j < 12; j++)
      weekDays.push(...formatter(yearDays, years[i], j));
  }
  weekDays.push(...formatter(e, end + 1, 0));
  let weeks = chunk(weekDays, 7);
  return weeks;
};
export let DayData = (years = [2000]) => {
  let start = years[0];
  let gapStart = new Date(start, 0, 0).getDay();
  let lastMonthOfPY = DaysOfMonth(start - 1, 11);
  let lastMonthOfPYArr = MonthDaysToArr(lastMonthOfPY);
  let Days = lastMonthOfPYArr.slice(lastMonthOfPY - gapStart, lastMonthOfPY);
  // .map((date) => new Date(start - 1, 11, date).getTime());
  let days = formatter(Days, start - 1, 11);
  for (let year of years)
    for (let i = 0; i < 12; i++)
      days.push(...formatter(MonthDaysToArr(DaysOfMonth(year, i)), year, i));
  return days;
};
