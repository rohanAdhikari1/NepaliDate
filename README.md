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
console.log(customDate.format()); // 2082-06-16 (in Nepali format)
```

**Note:**
Do not manually pass the `dayOfWeek` unless you are certain it matches the year, month, and day.
Leaving it blank or null ensures it is calculated correctly.

## 🔤 Supported String Parsing Formats

You can initialize a `NepaliDate` using a date string.  
The following formats are supported:

| Format                | Example               | Description                   |
| :-------------------- | :-------------------- | :---------------------------- |
| `YYYY-MM-DD`          | `2082-06-16`          | Standard ISO-like format      |
| `YYYY/MM/DD`          | `2082/06/16`          | Slash-separated format        |
| `YYYY.MM.DD`          | `2082.06.16`          | Dot-separated format          |
| `YYYY MM DD`          | `2082 06 16`          | Space-separated format        |
| `YYYY-MM-DD HH:mm`    | `2082-06-16 14:30`    | With hour and minute          |
| `YYYY-MM-DD HH:mm:ss` | `2082-06-16 14:30:45` | With hour, minute, and second |
| `YYYY/MM/DD HH:mm:ss` | `2082/06/16 23:59:59` | Slash format with time        |
| `YYYY.MM.DD HH:mm:ss` | `2082.06.16 00:00:00` | Dot format with time          |

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

Formats the NepaliDate instance according to the provided pattern.
If no pattern is provided, defaults to `YYYY-MM-DD`.

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
// Fri Oct 03 2025 14:30:45 GMT+0545 (Nepal Time)
```

<!-- **Supported patterns:** -->

---

## Setter

Setter methods **update the current instance** of `NepaliDate` in place.  
These methods modify the existing object rather than creating a new one.

| Method                      | Parameters       | Returns | Description                                                    |
| --------------------------- | ---------------- | ------- | -------------------------------------------------------------- |
| `setYear(year: number)`     | `year: number`   | `this`  | Sets the year of the current instance.                         |
| `setMonth(month: number)`   | `month: number`  | `this`  | Sets the month of the current instance.                        |
| `setDay(day: number)`       | `day: number`    | `this`  | Sets the day of the current instance.                          |
| `setHour(hour: number)`     | `hour: number`   | `this`  | Sets the hour (0–23) in the current instance.                  |
| `setMinute(minute: number)` | `minute: number` | `this`  | Sets the minute (0–59) in the current instance.                |
| `setSecond(second: number)` | `second: number` | `this`  | Sets the second (0–59) in the current instance.                |
| `locale(value: string)`     | `value: string`  | `this`  | Updates the locale (`"np"` or `"en"`) in the current instance. |

---

## Getter

Getter methods **retrieve values** from the current `NepaliDate` instance without modifying it.

| Method          | Parameters | Returns  | Description                                             |
| --------------- | ---------- | -------- | ------------------------------------------------------- |
| `dayOfWeek()`   | None       | `number` | Returns the day of the week (0–6).                      |
| `daysInMonth()` | None       | `number` | Returns the number of days in the current Nepali month. |

---

## Setter/Getter (Deep Copy)

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
| `locale(value?: string)`  | `value?: string`  | `string` or `NepaliDate` | Gets the current locale, or returns a new instance with the updated locale. |

---

### Notes

- **Setter methods** modify the existing object.
- **Getter methods** only read values and do not modify the object.
- **Setter/Getter methods** return a **new instance** when a value is provided, preserving the original instance (deep copy).

---

### Example

---

## Manipulation

### Example

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

## 📌 To-Do

- [ ] Parse date using format
- [ ] utilities function to calculate difference between days

## 👨‍💻 Credits

- [Rohan Adhikari](https://github.com/rohanAdhikari1)
<!-- - [All Contributors](../../contributors) -->

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
