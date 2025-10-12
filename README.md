# 🗓 Nepali Date

[![npm version](https://img.shields.io/npm/v/nepali-day-js.svg?color=blue)](https://www.npmjs.com/package/nepali-day-js)
[![license](https://img.shields.io/npm/l/nepali-day-js.svg?color=green)](./LICENSE.md)
[![types](https://img.shields.io/badge/TypeScript-Ready-blue)](https://www.typescriptlang.org/)

**Nepali Date** is a JavaScript/TypeScript library for working with the **Nepali calendar (Bikram Sambat - BS)**.  
It provides seamless conversion between AD (Gregorian) and BS dates, along with flexible utilities for parsing, formatting, localization, and date manipulation.

---

## 🚀 Features

- ✅ Initialize Nepali date from AD (Gregorian) date
- ✅ Parse Nepali date from string
- ✅ Add/subtract years, months, weeks, days, hours, and minutes
- ✅ Compare dates (`isBefore`, `isAfter`, `isSame`)
- ✅ Convert between Nepali and AD dates
- ✅ Get localized month and weekday names (English & Nepali)
- ✅ Validate dates for correctness
- ✅ Fully typed for TypeScript

---

## 💻 Installation

```js
npm install nepali-day-js
```

## 🧩 Usage

### Initialize Nepali Date

```ts
import nepalidayjs from "nepali-day-js";

// From current date
const today = nepalidayjs();

// From AD date
const bsDate = nepalidayjs.fromAd(new Date("2025-10-03"));

// From Nepali date string Please see the supported formats for string parsing
const parsedDate = nepalidayjs("2082-06-16");
```

### Additional:

You can also initialize a Nepali date directly by passing an object to the NepaliDate constructor.The object structure follows the NepaliDateProps interface:

```ts
interface NepaliDateProps {
  year: number;
  month: number;
  day: number;
  dayOfWeek?: number | null; // This will be auto-calculated if null or undefined
  hour?: number;
  minute?: number;
  second?: number;
  locale?: "en" | "np";
}
```

Example:

```ts
import { NepaliDate } from "nepali-date";
const customDate = new NepaliDate({
  year: 2082,
  month: 6,
  day: 16,
});
console.log(customDate.format()); // 2082-06-16
```

**Note:**
Do not manually pass the `dayOfWeek` unless you are certain it matches the year, month, and day.
Leaving it blank or null ensures it is calculated correctly.

## 🔤 Supported String Parsing Formats

You can initialize a `NepaliDate` using a date string.  
The following formats are supported:

### Supported Date Formats

| Format                                                    | Example      | Description       |
| :-------------------------------------------------------- | :----------- | :---------------- |
| `YYYY-MM-DD` / `YYYY/MM/DD` / `YYYY.MM.DD` / `YYYY MM DD` | `2082-06-16` | Year-first format |
| `DD-MM-YYYY` / `DD/MM/YYYY` / `DD.MM.YYYY` / `DD MM YYYY` | `16-06-2082` | Day-first format  |

### Supported Time Formats (optional)

| Format     | Example    | Description                 |
| :--------- | :--------- | :-------------------------- |
| `HH:mm`    | `14:30`    | Hours and minutes           |
| `HH:mm:ss` | `14:30:45` | Hours, minutes, and seconds |

**Example:**

```ts
const d1 = nepalidayjs("2082-06-16");
const d2 = nepalidayjs("2082/06/16");
const d3 = nepalidayjs("2082.06.16 12:45");
const d4 = nepalidayjs("2082 06 16 23:59:59");

console.log(d1.toString());
console.log(d3.toString());
```

## 📖 Conversion & Output Methods

### `toObject()`

Converts the NepaliDate instance into a plain JavaScript object.

**Returns:**

```ts
{
  year: number;
  month: number;
  day: number;
  dayOfWeek: number;
  hour: number;
  minute: number;
  second: number;
}
```

---

### `toArray(withTime = true, withoutSecond = false, withDayOfWeek = false)`

Converts the NepaliDate instance into an **array**.

**Arguments:**

- `withTime` _(boolean, optional, default: true)_ – include hour, minute, and second in the array.
- `withoutSecond` _(boolean, optional, default: false)_ – if `true`, excludes seconds even when `withTime` is `true`.
- `withDayOfWeek` _(boolean, optional, default: false)_ – if `true`, includes the `dayOfWeek` in the array.

**Returns:**

- `Array<string | number>` – ordered as `[year, month, day, dayOfWeek?, hour?, minute?, second?]` depending on the options.

---

### `toString()`

Converts the NepaliDate instance into a standard string.
format: `YYYY-MM-DD HH:mm:ss`

**Returns:**

- `string` – formatted Nepali date string.

---

### `toAd()`

Converts the NepaliDate instance to its equivalent **Gregorian (AD)** date.

**Returns:**

- `date` – native JavaScript `Date` object in the Gregorian calendar.

---

### `format(pattern?: string)`

Formats the `NepaliDate` instance according to the provided pattern and locale-specific rules, and returns a string of the formatted date.

- **Parameters**
  - `pattern` _(optional)_: A string representing the desired date format.  
    If no pattern is provided, it defaults to `YYYY-MM-DD`.

- **Returns**
  - `string`: The formatted date according to the given pattern and locale.

**List of available formats**
| Format | Output | Description |
|--------|--------|-------------|
| D | 1-32 | The day of the month |
| DD | 01-32 | The day of the month, 2-digits |
| M | 1-12 | The month, beginning at 1 |
| MM | 01-12 | The month, 2-digits |
| MMM | Bai-Cha | The abbreviated month name |
| MMMM | Baisakh-Chaitra | The full month name |
| YY | 82 | Two-digit year |
| YYY | 082 | Last 3 digits of the year |
| YYYY | 2082 | Four-digit year |
| d | 1-7 | The day of the week, with Sunday as 1 |
| dd | Sun-Sat | Short day name |
| ddd | Sunday-Saturday| Full day name|
| H | 0-23 | The hour, 24-hour clock |
| HH | 00-23 | The hour, 24-hour clock, 2-digits |
| h | 1-12 | The hour, 12-hour clock |
| hh | 01-12 | The hour, 12-hour clock, 2-digits |
| m | 0-59 | The minute |
| mm | 00-59 | The minute, 2-digits |
| s | 0-59 | The second |
| ss | 00-59 | The second, 2-digits |
| A | AM/PM | Ante meridiem / Post meridiem |

---

### **Example**

```ts
import nepalidayjs from "nepali-date";
const date = nepalidayjs("2082-06-16 14:30:45");

// Convert to object
console.log(date.toObject());
// { year: 2082, month: 6, day: 16, hour: 14, minute: 30, second: 45 }

// Default: includes time and seconds
console.log(date.toArray());
// ["2082", "06", "16", "14", "30", "45"]

// Exclude seconds
console.log(date.toArray(true, true));
// ["2082", "06", "16", "14", "30"]

// Include day of week
console.log(date.toArray(true, false, true));
// ["2082", "06", "16", "3", "14", "30", "45"]

// Only date without time
console.log(date.toArray(false));
// ["2082", "06", "16"]

// Convert to string
console.log(date.toString());
// "2082-06-16 14:30:45"

// Convert to AD (Gregorian) date
console.log(date.toAd());
// Fri Oct 03 2025 14:30:45

date.format(); // "2082-06-16" (default)
date.format("DD/MM/YYYY"); // "16/06/2082"
date.setLocale("np").format("MMMM D, YYYY"); // "आश्विन १६, २०८२"
```

---

## Setter

Setter methods **update the current instance** of `NepaliDate` in place.  
These methods modify the existing object rather than creating a new one.

| Method                      | Parameters       | Description                                                    |
| --------------------------- | ---------------- | -------------------------------------------------------------- |
| `setYear(year: number)`     | `year: number`   | Sets the year of the current instance.                         |
| `setMonth(month: number)`   | `month: number`  | Sets the month of the current instance.                        |
| `setDay(day: number)`       | `day: number`    | Sets the day of the current instance.                          |
| `setHour(hour: number)`     | `hour: number`   | Sets the hour (0–23) in the current instance.                  |
| `setMinute(minute: number)` | `minute: number` | Sets the minute (0–59) in the current instance.                |
| `setSecond(second: number)` | `second: number` | Sets the second (0–59) in the current instance.                |
| `setLocale(value: string)`  | `value: string`  | Updates the locale (`"np"` or `"en"`) in the current instance. |

---

## Getter

Getter methods **retrieve values** from the current `NepaliDate` instance without modifying it.

| Method          | Parameters | Returns  | Description                                             |
| --------------- | ---------- | -------- | ------------------------------------------------------- |
| `dayOfWeek()`   | None       | `number` | Returns the day of the week (0–6).                      |
| `daysInMonth()` | None       | `number` | Returns the number of days in the current Nepali month. |
| `getLocale()`   | None       | `string` | Returns the current locale.                             |

---

## Setter/Getter

These methods can act as [**getter**](#getter) or [**setter**](#setter) depending on whether a parameter is provided.  
When a value is passed, a **new `NepaliDate` instance is returned** with the updated value, leaving the original instance unchanged. This avoids shallow copy issues and preserves immutability.

| Method                    | Parameters        | Returns                  | Description                                                                 |
| ------------------------- | ----------------- | ------------------------ | --------------------------------------------------------------------------- |
| `year(year?: number)`     | `year?: number`   | `number` or `NepaliDate` | Gets the current year, or returns a new instance with the updated year.     |
| `month(month?: number)`   | `month?: number`  | `number` or `NepaliDate` | Gets the current month, or returns a new instance with the updated month.   |
| `day(day?: number)`       | `day?: number`    | `number` or `NepaliDate` | Gets the current day, or returns a new instance with the updated day.       |
| `hour(hour?: number)`     | `hour?: number`   | `number` or `NepaliDate` | Gets the current hour, or returns a new instance with the updated hour.     |
| `minute(minute?: number)` | `minute?: number` | `number` or `NepaliDate` | Gets the current minute, or returns a new instance with the updated minute. |
| `second(second?: number)` | `second?: number` | `number` or `NepaliDate` | Gets the current second, or returns a new instance with the updated second. |

---

### Notes

- **Setter methods** modify the existing object.
- **Getter methods** only read values and do not modify the object.
- **Setter/Getter methods** return a **new instance** when a value is provided, preserving the original instance (deep copy).

---

### Example

```ts
const date = nepalidayjs("2082-06-16 14:30:45");

// Setter (mutates the instance)
date.setYear(2081).setMonth(2).setDay(5);
console.log(date.format("YYYY-MM-DD")); // "2081-02-05"

// Getter (reads values)
console.log(date.dayOfWeek()); // 7
console.log(date.daysInMonth()); // 32

// Setter/Getter (deep copy, immutable)
const newDate = date.year(2082).month(3).day(10);
console.log(newDate.format("YYYY-MM-DD")); // "2082-03-10"
console.log(date.format("YYYY-MM-DD")); // "2081-02-05" (original unchanged)
```

---

## Manipulation Methods

`NepaliDate` provides flexible methods to manipulate dates and times. Some methods **mutate the current instance**, while others **return a new instance** for immutability.

---

## 1. Immutable Methods: `.add()` / `.subtract()`

These methods **return a new `NepaliDate` instance**, leaving the original unchanged.

```ts
const date = nepalidayjs("2082-06-16 14:30:45");
//Add
const newDate = date.add(1, "year").add(2, "month");
console.log(newDate.format()); // "2083-08-16"

// Subtract
const subtracted = date.subtract(5, "day");
console.log(subtracted.format()); // "2082-06-11"
```

**Supported units**: `"year"`, `"month"`, `"week"`, `"day"`, `"hour"`, `"minute"`

---

## 2. Mutable Shortcut Methods

These methods update the current instance in place:

- `addDays(days)`, `subDays(days)`
- `addMonths(months)`, `subMonths(months)`
- `addYears(years)`, `subYears(years)`
- `addWeeks(weeks)`, `subWeeks(weeks)`
- `addDay()`, `subDay()`, `addMonth()`, `subMonth()`, `addYear()`, `subYear()`, `addWeek()`, `subWeek()`

```ts
const date = nepalidayjs("2082-06-16");

// Add 10 days
date.addDays(10);
console.log(date.format()); // "2082-06-26"

// Subtract 1 month
date.subMonth();
console.log(date.format()); // "2082-05-26"

// Add 3 year
date.addYears(3);
console.log(date.format()); // "2085-05-26"
```

---

## Comparison

| Method     | Description                                                             |
| :--------- | :---------------------------------------------------------------------- |
| `isBefore` | Checks if Nepali date is before/less then given NepaliDate in parameter |
| `isAfter`  | Checks if Nepali date is after/more then given NepaliDate in parameter  |
| `isSame`   | Checks if Nepali date is similar given NepaliDate in parameter          |

**Example:**

```ts
const date1 = nepalidayjs("2082-06-16");
const date2 = nepalidayjs("2082-06-20");

console.log(date1.isBefore(date2)); // true
console.log(date2.isAfter(date1)); // true
console.log(date1.isSame(date2)); // false
```

---

## Localization Functions

These functions help retrieve **months, weekdays, and numbers/strings** according to the provided locale (`en` or `np`).

- `localenumber(num, locale)` → Converts digits (`0–9`) into localized form. Works with both numbers and strings. Other symbols/letters remain unchanged.
- `localeShortMonth(num, locale)` → Returns short month name.
- `localeMonth(num, locale)` → Returns full month name.
- `localeShortday(num, locale)` → Returns short weekday name.
- `localeday(num, locale)` → Returns full weekday name.

**Examples:**

```ts
import {
  localenumber,
  localeShortMonth,
  localeMonth,
  localeShortday,
  localeday,
} from "nepali-day-js/locale";
// Number conversion
localenumber(2025, "np"); // "२०२५"
localenumber("Price 1500$", "np"); // "Price १५००$" (symbols unchanged)

// Months
localeShortMonth(1, "en"); // "Bai"
localeShortMonth(1, "np"); // "बै"
localeMonth(1, "en"); // "Baisakh"
localeMonth(1, "np"); // "बैशाख"

// Weekdays
localeShortday(1, "en"); // "Sun"
localeShortday(1, "np"); // "आइत"
localeday(1, "en"); // "Sunday"
localeday(1, "np"); // "आइतबार"
```

---

## 📅 Utility Methods

### Full weekday names

```js
nepalidayjs.weekdays("np" | "en");
```

Returns an array of full weekday names (Sunday → Saturday) in the specified locale ("en" for English, "np" for Nepali Unicode).

### Short weekday names

```js
nepalidayjs.weekdaysShort("np" | "en");
```

Returns an array of abbreviated weekday names (Sun → Sat) according to the locale.

### Full month names

```js
nepalidayjs.months("np" | "en");
```

Returns all month names (Baisakh → Chaitra) in the chosen locale.

### Short month names

```js
nepalidayjs.monthsShort("np" | "en");
```

Returns abbreviated month names (Ba → Ch) based on the locale.

### Minimum supported date

```js
nepalidayjs.minDate(locale);
```

Returns the earliest valid Nepali date in the calendar for the given locale.

### Maximum supported date

```js
nepalidayjs.maxDate(locale);
```

Returns the latest valid Nepali date available in the calendar for the locale.

### Minimum supported year

```js
nepalidayjs.minYear();
```

Returns the first year supported by the Nepali date library.

### Maximum supported year

```js
nepalidayjs.maxYear();
```

Returns the last year supported by the Nepali date library.

## Pro Tip:

You can also deep copy a `NepaliDate` object like this:

```ts
const date = nepalidayjs("2082-06-16 14:30:45");
const newDate = nepalidayjs(date); // deep copy

newDate.setYear(2080);

console.log(date.format()); // "2082-06-16" (original unchanged)
console.log(newDate.format()); // "2080-06-16" (copy updated)
```

## 📌 To-Do

- [ ] Parse date using format
- [ ] make isBefore, isAfter decision based/depending on unit.
- [ ] utilities function to calculate difference between two BS dates depending on unit.

## 👨‍💻 Credits

- [Rohan Adhikari](https://github.com/rohanAdhikari1)
<!-- - [All Contributors](../../contributors) -->

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
