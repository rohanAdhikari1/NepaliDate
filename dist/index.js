import { BASE_YEAR_BS, MONTHS_EN, MONTHS_NP, MONTHS_SHORT_EN, MONTHS_SHORT_NP, NEPALI_DATE_MAP, WEEKDAYS_LONG_EN, WEEKDAYS_LONG_NP, WEEKDAYS_SHORT_EN, WEEKDAYS_SHORT_NP, } from "./constant";
import NepaliDate from "./NepaliDate";
import { parseWithOutFormat } from "./parse";
import { getDaysInBSMonth } from "./utilities";
export { NepaliDate };
const initialize = (adDate) => {
    if (!(adDate instanceof Date)) {
        throw new Error("Expected a Date instance for AD date");
    }
    return NepaliDate.fromAd(adDate);
};
const nepalidayjs = (date = null) => {
    if (date) {
        if (date instanceof NepaliDate) {
            return new NepaliDate(date.toObject());
        }
        else if (typeof date === "string") {
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
        else {
            throw new Error("Unsupported date");
        }
    }
    return NepaliDate.now();
};
nepalidayjs.fromAd = (date) => {
    if (date instanceof Date) {
        return initialize(date);
    }
    else if (typeof date === "string") {
        const ad = new Date(date);
        return initialize(ad);
    }
    else {
        throw new Error("Unsupported date");
    }
};
nepalidayjs.weekdaysShort = function (locale = "en") {
    return locale === "np" ? WEEKDAYS_SHORT_NP : WEEKDAYS_SHORT_EN;
};
nepalidayjs.weekdays = function (locale = "en") {
    return locale === "np" ? WEEKDAYS_LONG_NP : WEEKDAYS_LONG_EN;
};
nepalidayjs.months = function (locale = "en") {
    return locale === "np" ? MONTHS_NP : MONTHS_EN;
};
nepalidayjs.monthsShort = function (locale = "en") {
    return locale === "np" ? MONTHS_SHORT_NP : MONTHS_SHORT_EN;
};
nepalidayjs.minDate = function (locale = "en") {
    const minDate = new NepaliDate({
        year: BASE_YEAR_BS,
        month: 1,
        day: 1,
        locale: locale,
    });
    if (!minDate.isValid()) {
        throw new Error("Error on retriving Min Date");
    }
    return minDate;
};
nepalidayjs.maxDate = function (locale = "en") {
    const year = BASE_YEAR_BS + NEPALI_DATE_MAP.length - 1;
    const maxDate = new NepaliDate({
        year: year,
        month: 12,
        day: getDaysInBSMonth(year, 12),
        locale: locale,
    });
    if (!maxDate.isValid()) {
        throw new Error("Error on retriving Max Date");
    }
    return maxDate;
};
nepalidayjs.minYear = function () {
    return BASE_YEAR_BS;
};
nepalidayjs.maxYear = function () {
    const year = BASE_YEAR_BS + NEPALI_DATE_MAP.length - 1;
    return year;
};
nepalidayjs.isValid = function (date) {
    if (date instanceof NepaliDate) {
        return date.isValid();
    }
    else if (typeof date === "string") {
        throw new Error("Feature Not Available in current version");
        // nepalidayjs(date)
    }
    else {
        throw new Error("Unsupported date");
    }
};
export default nepalidayjs;
//# sourceMappingURL=index.js.map