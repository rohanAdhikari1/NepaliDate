import { calculateDayofWeek, compareDates, getDaysInBSMonth, } from "./utilities";
import { calculateAddDays, calculateAddMonths, calculateAddYears, calculateSubDays, calculateSubMonths, calculateSubYears, ADtoBS, BStoAD, } from "./converter";
import Sformat from "./format";
import { localenumber } from "./locale";
import { validateBsDay, validateBsYear, validateHour, validateMinuteSecond, validateMonth, } from "./validator";
import { parseWithOutFormat } from "./parse";
export default class NepaliDate {
    constructor({ year, month, day, dayOfWeek = null, hour = 0, minute = 0, second = 0, locale = "en", }) {
        this._year = year;
        this._month = month;
        this._day = day;
        this._dayOfWeek = dayOfWeek ?? calculateDayofWeek(year, month, day);
        this._hour = hour;
        this._minute = minute;
        this._second = second;
        this._locale = locale;
    }
    static fromAd(date) {
        const [year, month, day, dayOfWeek] = ADtoBS(date.getFullYear(), date.getMonth() + 1, date.getDate());
        const hour = date.getHours();
        const minute = date.getMinutes();
        const second = date.getSeconds();
        return new NepaliDate({
            year,
            month,
            day,
            dayOfWeek,
            hour,
            minute,
            second,
        });
    }
    static now() {
        return this.fromAd(new Date());
    }
    static parse(date) {
        let bsdate = parseWithOutFormat(date);
        if (bsdate) {
            try {
                return new NepaliDate(bsdate);
            }
            catch {
                throw new Error("Error on Date Parse");
            }
        }
        else {
            throw new Error("Invalid Date String");
        }
    }
    toObject() {
        return {
            year: this._year,
            month: this._month,
            day: this._day,
            dayOfWeek: this._dayOfWeek,
            hour: this._hour,
            minute: this._minute,
            second: this._second,
        };
    }
    toArray(withTime = true, withoutSecond = false, withdayofWeek = false) {
        const date = {};
        date["year"] = localenumber(this._year, this._locale);
        date["month"] = localenumber(this._month, this._locale);
        date["day"] = localenumber(this._day, this._locale);
        if (withdayofWeek) {
            date["dayOfWeek"] = localenumber(this._dayOfWeek, this._locale);
        }
        if (withTime) {
            date["hour"] = localenumber(this._hour, this._locale);
            date["minute"] = localenumber(this._minute, this._locale);
            if (!withoutSecond) {
                date["second"] = localenumber(this._second, this._locale);
            }
        }
        return date;
    }
    toAd() {
        const [year, month, day, _] = BStoAD(this._year, this._month, this._day);
        return new Date(year, month - 1, day, this._hour, this._minute, this._second);
    }
    format(format = "YYYY-MM-DD") {
        return Sformat(this.toObject(), format, this._locale);
    }
    toString() {
        return this.format("YYYY-MM-DD HH:mm:ss A");
    }
    locale(value) {
        if (value === undefined) {
            return this._locale;
        }
        if (typeof value !== "string") {
            throw new Error(`Invalid locale: ${value}. Locale must be a string.`);
        }
        this._locale = value === "np" ? "np" : "en";
        return this;
    }
    isBefore(date) {
        if (!(date instanceof NepaliDate)) {
            date = NepaliDate.parse(date);
        }
        return compareDates(this, date) === -1;
    }
    isAfter(date) {
        if (!(date instanceof NepaliDate)) {
            date = NepaliDate.parse(date);
        }
        return compareDates(this, date) === 1;
    }
    isSame(date) {
        if (!(date instanceof NepaliDate)) {
            date = NepaliDate.parse(date);
        }
        return compareDates(this, date) === 0;
    }
    isValid() {
        return (validateBsYear(this._year) &&
            validateMonth(this._month) &&
            validateBsDay(this._year, this._month, this._day) &&
            validateHour(this._hour) &&
            validateMinuteSecond(this._minute) &&
            validateMinuteSecond(this._second));
    }
    daysInMonth() {
        return getDaysInBSMonth(this._year, this._month);
    }
    year(year) {
        if (year === undefined)
            return this._year;
        return new NepaliDate({
            ...this.toObject(),
            year,
            dayOfWeek: calculateDayofWeek(year, this._month, this._day),
        });
    }
    month(month) {
        if (month === undefined)
            return this._month;
        return new NepaliDate({
            ...this.toObject(),
            month,
            dayOfWeek: calculateDayofWeek(this._year, month, this._day),
        });
    }
    dayOfWeek() {
        return this._dayOfWeek;
    }
    day(day) {
        if (day === undefined)
            return this._day;
        return new NepaliDate({
            ...this.toObject(),
            day,
            dayOfWeek: calculateDayofWeek(this._year, this._month, day),
        });
    }
    hour(hour) {
        if (hour === undefined)
            return this._hour;
        if (!validateHour(hour))
            throw new Error("Invalid Hour");
        return new NepaliDate({ ...this.toObject(), hour });
    }
    minute(minute) {
        if (minute === undefined)
            return this._minute;
        if (!validateMinuteSecond(minute))
            throw new Error("Invalid Minute");
        return new NepaliDate({ ...this.toObject(), minute });
    }
    second(second) {
        if (second === undefined)
            return this._second;
        if (!validateMinuteSecond(second))
            throw new Error("Invalid Second");
        return new NepaliDate({ ...this.toObject(), second });
    }
    setYear(year) {
        this._dayOfWeek = calculateDayofWeek(year, this._month, this._day);
        this._year = year;
        return this;
    }
    setMonth(month) {
        this._dayOfWeek = calculateDayofWeek(this._year, month, this._day);
        this._month = month;
        return this;
    }
    setDay(day) {
        this._dayOfWeek = calculateDayofWeek(this._year, this._month, day);
        this._day = day;
        return this;
    }
    setHour(hour) {
        if (!validateHour(hour)) {
            throw new Error("Invalid Hour");
        }
        this._hour = hour;
        return this;
    }
    setMinute(minute) {
        if (!validateMinuteSecond(minute)) {
            throw new Error("Invalid Minute");
        }
        this._minute = minute;
        return this;
    }
    setSecond(second) {
        if (!validateMinuteSecond(second)) {
            throw new Error("Invalid Second");
        }
        this._second = second;
        return this;
    }
    add(value, unit) {
        let { year, month, day, hour, minute, dayOfWeek } = this.toObject();
        switch (unit) {
            case "year": {
                [year, month, day, dayOfWeek] = calculateAddYears(year, month, day, dayOfWeek, value);
                break;
            }
            case "month": {
                [year, month, day, dayOfWeek] = calculateAddMonths(year, month, day, dayOfWeek, value);
                break;
            }
            case "day": {
                [year, month, day, dayOfWeek] = calculateAddDays(year, month, day, dayOfWeek, value);
                break;
            }
            case "hour": {
                hour += value;
                while (hour >= 24) {
                    hour -= 24;
                    [year, month, day, dayOfWeek] = calculateAddDays(year, month, day, dayOfWeek, 1);
                }
                while (hour < 0) {
                    hour += 24;
                    [year, month, day, dayOfWeek] = calculateAddDays(year, month, day, dayOfWeek, -1);
                }
                break;
            }
            case "minute": {
                minute += value;
                while (minute >= 60) {
                    minute -= 60;
                    hour += 1;
                }
                while (minute < 0) {
                    minute += 60;
                    hour -= 1;
                }
                while (hour >= 24) {
                    hour -= 24;
                    [year, month, day, dayOfWeek] = calculateAddDays(year, month, day, dayOfWeek, 1);
                }
                while (hour < 0) {
                    hour += 24;
                    [year, month, day, dayOfWeek] = calculateAddDays(year, month, day, dayOfWeek, -1);
                }
                break;
            }
            default:
                throw new Error(`Unsupported unit: ${unit}`);
        }
        return new NepaliDate({ year, month, day, hour, minute, dayOfWeek });
    }
    subtract(value, unit) {
        let { year, month, day, dayOfWeek, hour, minute, second } = this.toObject();
        switch (unit) {
            case "year": {
                [year, month, day, dayOfWeek] = calculateSubYears(year, month, day, dayOfWeek, value);
                break;
            }
            case "month": {
                [year, month, day, dayOfWeek] = calculateSubMonths(year, month, day, dayOfWeek, value);
                break;
            }
            case "day": {
                [year, month, day, dayOfWeek] = calculateSubDays(year, month, day, dayOfWeek, value);
                break;
            }
            case "hour": {
                hour -= value;
                while (hour < 0) {
                    hour += 24;
                    [year, month, day, dayOfWeek] = calculateSubDays(year, month, day, dayOfWeek, 1);
                }
                break;
            }
            case "minute": {
                minute -= value;
                while (minute < 0) {
                    minute += 60;
                    hour -= 1;
                }
                while (hour < 0) {
                    hour += 24;
                    [year, month, day, dayOfWeek] = calculateSubDays(year, month, day, dayOfWeek, 1);
                }
                break;
            }
            default:
                throw new Error(`Unsupported unit: ${unit}`);
        }
        return new NepaliDate({
            year,
            month,
            day,
            dayOfWeek,
            hour,
            minute,
            second,
        });
    }
    addDay() {
        return this.addDays(1);
    }
    addDays(days) {
        if (!Number.isFinite(days)) {
            throw new Error(`Invalid argument: days must be a finite number, received ${days}`);
        }
        [this._year, this._month, this._day, this._dayOfWeek] = calculateAddDays(this._year, this._month, this._day, this._dayOfWeek, days);
        return this;
    }
    addMonth() {
        return this.addMonths(1);
    }
    addMonths(months) {
        if (!Number.isFinite(months)) {
            throw new Error(`Invalid argument: months must be a finite number`);
        }
        [this._year, this._month, this._day, this._dayOfWeek] = calculateAddMonths(this._year, this._month, this._day, this._dayOfWeek, months);
        return this;
    }
    addYear() {
        return this.addYears(1);
    }
    addYears(years) {
        if (!Number.isFinite(years)) {
            throw new Error(`Invalid argument: years must be a finite number`);
        }
        [this._year, this._month, this._day, this._dayOfWeek] = calculateAddYears(this._year, this._month, this._day, this._dayOfWeek, years);
        return this;
    }
    subDay() {
        return this.subDays(1);
    }
    subDays(days) {
        if (!Number.isFinite(days)) {
            throw new Error(`Invalid argument: days must be a finite number`);
        }
        [this._year, this._month, this._day, this._dayOfWeek] = calculateSubDays(this._year, this._month, this._day, this._dayOfWeek, days);
        return this;
    }
    subMonth() {
        return this.subMonths(1);
    }
    subMonths(months) {
        if (!Number.isFinite(months)) {
            throw new Error(`Invalid argument: months must be a finite number`);
        }
        [this._year, this._month, this._day, this._dayOfWeek] = calculateSubMonths(this._year, this._month, this._day, this._dayOfWeek, months);
        return this;
    }
    subYear() {
        return this.subYears(1);
    }
    subYears(years) {
        if (!Number.isFinite(years)) {
            throw new Error(`Invalid argument: years must be a finite number`);
        }
        [this._year, this._month, this._day, this._dayOfWeek] = calculateSubYears(this._year, this._month, this._day, this._dayOfWeek, years);
        return this;
    }
    addWeek() {
        return this.addWeeks(1);
    }
    addWeeks(weeks) {
        if (!Number.isFinite(weeks)) {
            throw new Error(`Invalid argument: weeks must be a finite number`);
        }
        [this._year, this._month, this._day, this._dayOfWeek] = calculateAddDays(this._year, this._month, this._day, this._dayOfWeek, weeks * 7);
        return this;
    }
    subWeek() {
        return this.subWeeks(1);
    }
    subWeeks(weeks) {
        if (!Number.isFinite(weeks)) {
            throw new Error(`Invalid argument: weeks must be a finite number`);
        }
        [this._year, this._month, this._day, this._dayOfWeek] = calculateSubDays(this._year, this._month, this._day, this._dayOfWeek, weeks * 7);
        return this;
    }
}
//# sourceMappingURL=NepaliDate.js.map