# 🗓 Nepali Date

Nepali Date is a powerful JavaScript/TypeScript library that allows developers to seamlessly work with the Nepali calendar (Bikram Sambat - BS).
It provides easy conversion between AD (Gregorian) and BS dates, date manipulation, formatting, and localization.

## 🚀 Features

✅ Initialize Nepali date from AD (Gregorian) date.
✅ Parse Nepali date from string.
✅ Add/subtract years, months, weeks, days, hours, and minutes.
✅ Compare dates (isBefore, isAfter, isSame).
✅ Convert between Nepali and AD dates.
✅ Get localized month and weekday names (English and Nepali).
✅ Validate dates to ensure correctness.
✅ Fully typed for TypeScript.

## 💻 Installation

```js
npm install nepali-day-js
```

## 📅 Utility Methods

```js
nepalidayjs.weekdays("np" | "en") – Full weekday names
```

```js
nepalidayjs.weekdaysShort("np" | "en") – Short weekday names
```

```js
nepalidayjs.months("np" | "en") – Full month names
```

```js
nepalidayjs.monthsShort("np" | "en") – Short month names
```

```js
nepalidayjs.minDate(locale) – Minimum supported BS date
```

```js
nepalidayjs.maxDate(locale) – Maximum supported BS date
```

```js
nepalidayjs.minYear() – Returns minimum supported year
```

```js
nepalidayjs.maxYear() – Returns maximum supported year
```

## To-Do

- [x] Fix dayofweek calculate on setting month and year through setter.
- [x] Implement issame function on NepaliDate class.
- [ ] Parse date using format
- [ ] utilities function to calculate difference between days

## Credits

- [Rohan Adhikari](https://github.com/rohanAdhikari1)
- [All Contributors](../../contributors)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
