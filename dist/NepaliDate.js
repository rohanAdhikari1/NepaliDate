import { calculateDayofWeek, compareDates, getDaysInBSMonth, } from "./utilities";
import { calculateAddDays, calculateAddMonths, calculateAddYears, calculateSubDays, calculateSubMonths, calculateSubYears, ADtoBS, BStoAD, } from "./converter";
import Sformat from "./format";
import { localenumber } from "./locale";
import { validateBsDay, validateBsYear, validateHour, validateMinuteSecond, validateMonth, } from "./validator";
import { parseWithOutFormat } from "./parse";
export default class NepaliDate {
    constructor({ year, month, day, dayOfWeek = null, hour = 0, minute = 0, second = 0, locale = "en", }) {
        this.year = year;
        this.month = month;
        this.day = day;
        this.dayOfWeek = dayOfWeek ?? calculateDayofWeek(year, month, day);
        this.hour = hour;
        this.minute = minute;
        this.second = second;
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
            year: this.year,
            month: this.month,
            day: this.day,
            dayOfWeek: this.dayOfWeek,
            hour: this.hour,
            minute: this.minute,
            second: this.second,
        };
    }
    toArray(withTime = true, withoutSecond = false, withdayofWeek = false) {
        const date = {};
        date["year"] = localenumber(this.year, this._locale);
        date["month"] = localenumber(this.month, this._locale);
        date["day"] = localenumber(this.day, this._locale);
        if (withdayofWeek) {
            date["dayOfWeek"] = localenumber(this.dayOfWeek, this._locale);
        }
        if (withTime) {
            date["hour"] = localenumber(this.hour, this._locale);
            date["minute"] = localenumber(this.minute, this._locale);
            if (!withoutSecond) {
                date["second"] = localenumber(this.second, this._locale);
            }
        }
        return date;
    }
    toAd() {
        const [year, month, day, _] = BStoAD(this.year, this.month, this.day);
        return new Date(year, month - 1, day, this.hour, this.minute, this.second);
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
    isAfter(date) {
        if (date instanceof NepaliDate) {
            return compareDates(date, this);
        }
        const parsedate = NepaliDate.parse(date);
        return compareDates(parsedate, this);
    }
    isBefore(date) {
        if (date instanceof NepaliDate) {
            return compareDates(this, date);
        }
        const parsedate = NepaliDate.parse(date);
        return compareDates(this, parsedate);
    }
    isValid() {
        return (validateBsYear(this.year) &&
            validateMonth(this.month) &&
            validateBsDay(this.year, this.month, this.day) &&
            validateHour(this.hour) &&
            validateMinuteSecond(this.month) &&
            validateMinuteSecond(this.second));
    }
    daysInMonth() {
        return getDaysInBSMonth(this.year, this.month);
    }
    setYear(year) {
        this.year = year;
        return this;
    }
    setMonth(month) {
        this.month = month;
        return this;
    }
    setDay(day) {
        this.day = day;
        return this;
    }
    setHour(hour) {
        if (!validateHour(hour)) {
            throw new Error("Invalid Hour");
        }
        this.hour = hour;
        return this;
    }
    setMinute(minute) {
        if (!validateMinuteSecond(minute)) {
            throw new Error("Invalid Minute");
        }
        this.minute = minute;
        return this;
    }
    setSecond(second) {
        if (!validateMinuteSecond(second)) {
            throw new Error("Invalid Second");
        }
        this.second = second;
        return this;
    }
    addDay() {
        return this.addDays(1);
    }
    addDays(days) {
        if (!Number.isFinite(days)) {
            throw new Error(`Invalid argument: days must be a finite number, received ${days}`);
        }
        [this.year, this.month, this.day, this.dayOfWeek] = calculateAddDays(this.year, this.month, this.day, this.dayOfWeek, days);
        return this;
    }
    addMonth() {
        return this.addMonths(1);
    }
    addMonths(months) {
        if (!Number.isFinite(months)) {
            throw new Error(`Invalid argument: months must be a finite number`);
        }
        [this.year, this.month, this.day, this.dayOfWeek] = calculateAddMonths(this.year, this.month, this.day, this.dayOfWeek, months);
        return this;
    }
    addYear() {
        return this.addYears(1);
    }
    addYears(years) {
        if (!Number.isFinite(years)) {
            throw new Error(`Invalid argument: years must be a finite number`);
        }
        [this.year, this.month, this.day, this.dayOfWeek] = calculateAddYears(this.year, this.month, this.day, this.dayOfWeek, years);
        return this;
    }
    subDay() {
        return this.subDays(1);
    }
    subDays(days) {
        if (!Number.isFinite(days)) {
            throw new Error(`Invalid argument: days must be a finite number`);
        }
        [this.year, this.month, this.day, this.dayOfWeek] = calculateSubDays(this.year, this.month, this.day, this.dayOfWeek, days);
        return this;
    }
    subMonth() {
        return this.subMonths(1);
    }
    subMonths(months) {
        if (!Number.isFinite(months)) {
            throw new Error(`Invalid argument: months must be a finite number`);
        }
        [this.year, this.month, this.day, this.dayOfWeek] = calculateSubMonths(this.year, this.month, this.day, this.dayOfWeek, months);
        return this;
    }
    subYear() {
        return this.subYears(1);
    }
    subYears(years) {
        if (!Number.isFinite(years)) {
            throw new Error(`Invalid argument: years must be a finite number`);
        }
        [this.year, this.month, this.day, this.dayOfWeek] = calculateSubYears(this.year, this.month, this.day, this.dayOfWeek, years);
        return this;
    }
    addWeek() {
        return this.addWeeks(1);
    }
    addWeeks(weeks) {
        if (!Number.isFinite(weeks)) {
            throw new Error(`Invalid argument: weeks must be a finite number`);
        }
        [this.year, this.month, this.day, this.dayOfWeek] = calculateAddDays(this.year, this.month, this.day, this.dayOfWeek, weeks * 7);
        return this;
    }
    subWeek() {
        return this.subWeeks(1);
    }
    subWeeks(weeks) {
        if (!Number.isFinite(weeks)) {
            throw new Error(`Invalid argument: weeks must be a finite number`);
        }
        [this.year, this.month, this.day, this.dayOfWeek] = calculateSubDays(this.year, this.month, this.day, this.dayOfWeek, weeks * 7);
        return this;
    }
}
//# sourceMappingURL=NepaliDate.js.map