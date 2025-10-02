import { MONTHS_EN, MONTHS_NP, MONTHS_SHORT_EN, MONTHS_SHORT_NP, WEEKDAYS_LONG_EN, WEEKDAYS_LONG_NP, WEEKDAYS_SHORT_EN, WEEKDAYS_SHORT_NP, } from "./constant";
import NepaliDate from "./NepaliDate";
import { parseWithOutFormat } from "./parse";
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
            return date;
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
nepalidayjs.isValid = function (date) {
    if (date instanceof NepaliDate) {
        return date.isValid();
    }
    else if (typeof date === "string") {
        // nepalidayjs(date)
    }
    else {
        throw new Error("Unsupported date");
    }
};
export default nepalidayjs;
//# sourceMappingURL=index.js.map