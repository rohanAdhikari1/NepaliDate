# 🗓 Nepali Date

[![npm version](https://img.shields.io/npm/v/nepali-day-js.svg?color=blue)](https://www.npmjs.com/package/nepali-day-js)
[![license](https://img.shields.io/npm/l/nepali-day-js.svg?color=green)](./LICENSE.md)
[![types](https://img.shields.io/badge/TypeScript-Ready-blue)](https://www.typescriptlang.org/)

**Nepali Date** is a powerful JavaScript/TypeScript library for working with the **Nepali calendar (Bikram Sambat - BS)**.  
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
import nepalidayjs from "nepali-date";

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

### `format(pattern?: string)`

Formats the NepaliDate instance according to the provided pattern.
If no pattern is provided, defaults to `YYYY-MM-DD`.

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

**Supported patterns:**

## Getter/Setter

## Manipulation

TODO:-

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

## Localization functions

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
