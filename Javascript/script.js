"use strict";

//HEADING : variables
const startDateEl = document.querySelector("#startDate");
const endDateEl = document.querySelector("#endDate");
const btnEl = document.querySelector("#btn");
const fromEl = document.querySelector(".fromEl");
const toEl = document.querySelector(".toEl");
const daysPrintEl = document.querySelector(".days-print");
const sectionEl = document.querySelector(".sectionbelow");
const totaldaysEl = document.querySelector(".totaldays");
const chooseDateEl = document.querySelector("#chooseDate");
const btnCalEl = document.querySelector("#btn-cal");
const aRyearsEl = document.querySelector(".aRyears");
const aRmonthsEl = document.querySelector(".aRmonths");
const aRweeksEl = document.querySelector(".aRweeks");
const aRdaysEl = document.querySelector(".aRdays");
const addRemoveEl = document.querySelector("#add-remove");
const weekName = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const MonthName = [
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

//HEADING : setting the current date to start Date input
let currentDate = new Date();
const utcDate = currentDate.toUTCString();
console.log(utcDate);
const localDate = new Date(utcDate).toLocaleString("en-US", {
  localeMatcher: "best fit",
  timeZoneName: "short",
  timeZone: "Asia/Kolkata",
});

currentDate = new Date(localDate);

const todayYear = currentDate.getFullYear();
const todayMonth =
  currentDate.getMonth() + 1 < 10
    ? "0" + (currentDate.getMonth() + 1)
    : currentDate.getMonth() + 1;

const todayDate =
  currentDate.getDate() < 10
    ? "0" + currentDate.getDate()
    : currentDate.getDate();

startDateEl.value = todayYear + "-" + todayMonth + "-" + todayDate;
endDateEl.value = todayYear + "-" + todayMonth + "-" + todayDate;
chooseDateEl.value = todayYear + "-" + todayMonth + "-" + todayDate;

//HEADING : calculate button
btnEl.addEventListener("click", () => {
  const endDate = endDateEl.value;
  const startDate = startDateEl.value;
  calculateDays(startDate, endDate);
});

//HEADING : function to calculate the days
function calculateDays(startDate, endDate) {
  const startDay = new Date(startDate);
  const start = startDay.getTime();
  const endDay = new Date(endDate);
  const end = endDay.getTime();
  const remainingTime = end - start;
  let week = Math.floor(remainingTime / (1000 * 60 * 60 * 24 * 7));
  let day = Math.floor((remainingTime / (1000 * 60 * 60 * 24)) % 7);
  let hours = Math.floor(remainingTime / (1000 * 60 * 60));
  const totaldays = Math.floor(remainingTime / (1000 * 60 * 60 * 24));

  sectionEl.classList.remove("hidden");
  console.log(day);
  let weekDay = startDay.getDay();
  let monthNumber = startDay.getMonth();
  fromEl.textContent =
    weekName[weekDay] +
    " " +
    startDay.getDate() +
    " " +
    MonthName[monthNumber] +
    " " +
    startDay.getFullYear();
  weekDay = endDay.getDay();
  monthNumber = endDay.getMonth();
  toEl.textContent =
    weekName[weekDay] +
    " " +
    endDay.getDate() +
    " " +
    MonthName[monthNumber] +
    " " +
    endDay.getFullYear();
  daysPrintEl.textContent =
    "Weeks : " + week + " | Days : " + day + " | Hours : " + hours;
  totaldaysEl.textContent = "Total Days : " + totaldays;
}

/* ****************************************************************** */
//HEADING module for days addition and removal
btnCalEl.addEventListener("click", () => {
  const chooseDateValue = chooseDateEl.value;
  const value = addRemoveEl.value;
  const yearsToARValue = aRyearsEl.value;
  const monthsToARValue = aRmonthsEl.value;
  const weeksToARValue = aRweeksEl.value;
  const daysToARValue = aRdaysEl.value;
  switch (value) {
    case "add":
      add(
        chooseDateValue,
        yearsToARValue,
        monthsToARValue,
        weeksToARValue,
        daysToARValue
      );
      break;
    case "remove":
      sub(
        chooseDateValue,
        yearsToARValue,
        monthsToARValue,
        weeksToARValue,
        daysToARValue
      );
      break;
  }
});

function addWeeks(date, weeks) {
  date.setDate(date.getDate() + 7 * weeks);
  return date;
}
function addMonth(date, month) {
  date.setMonth(date.getMonth() + month);
  return date;
}
function addYears(date, years) {
  date.setFullYear(date.getFullYear() + years);
  return date;
}

function add(
  chooseDateValue,
  yearsToARValue,
  monthsToARValue,
  weeksToARValue,
  daysToARValue
) {
  let newDate = new Date(chooseDateValue);
  let d = newDate.setDate(newDate.getDate() + Number(daysToARValue));
  let w = addWeeks(new Date(d), Number(weeksToARValue));
  let m = addMonth(new Date(w), Number(monthsToARValue));
  let y = addYears(new Date(m), Number(yearsToARValue));
  document.querySelector(".p-cal").classList.remove("hidden");
  document.querySelector(".p-cal").textContent =
    weekName[y.getDay()] +
    " " +
    MonthName[y.getMonth()] +
    " | " +
    y.getDate() +
    "-" +
    (y.getMonth() + 1) +
    "-" +
    y.getFullYear();
}
function addWeeksM(date, weeks) {
  date.setDate(date.getDate() - 7 * weeks);
  return date;
}
function addMonthM(date, month) {
  date.setMonth(date.getMonth() - month);
  return date;
}
function addYearsM(date, years) {
  date.setFullYear(date.getFullYear() - years);
  return date;
}
function sub(
  chooseDateValue,
  yearsToARValue,
  monthsToARValue,
  weeksToARValue,
  daysToARValue
) {
  let newDate = new Date(chooseDateValue);
  let d = newDate.setDate(newDate.getDate() - Number(daysToARValue));
  let w = addWeeksM(new Date(d), Number(weeksToARValue));
  let m = addMonthM(new Date(w), Number(monthsToARValue));
  let y = addYearsM(new Date(m), Number(yearsToARValue));
  document.querySelector(".p-cal").classList.remove("hidden");
  document.querySelector(".p-cal").textContent =
    weekName[y.getDay()] +
    " " +
    MonthName[y.getMonth()] +
    " | " +
    y.getDate() +
    "-" +
    (y.getMonth() + 1) +
    "-" +
    y.getFullYear();
}
