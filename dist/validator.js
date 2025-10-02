import { NEPALI_DATE_MAP, START_YEAR_AD, START_YEAR_BS } from "./constant";
import { getDaysInBSMonth, getDaysInADMonth } from "./utilities";
export const validateHour = (hour) => {
    if (hour > 24 && hour < 0) {
        return false;
    }
    return true;
};
export const validateMinuteSecond = (value) => {
    if (value < 0 || value > 59)
        return false;
    return true;
};
export const validateBsYear = (year) => {
    if (year < START_YEAR_BS ||
        year > START_YEAR_BS + NEPALI_DATE_MAP.length - 1) {
        return false;
    }
    return true;
};
export const validateMonth = (month) => {
    if (month < 1 || month > 12) {
        return false;
    }
    return true;
};
export const validateBsDay = (year, month, day) => {
    const maxDays = getDaysInBSMonth(year, month);
    if (day < 1 || day > maxDays) {
        return false;
    }
    return true;
};
export const validateAD = (year, month, day) => {
    if (year < START_YEAR_AD ||
        year > START_YEAR_AD + NEPALI_DATE_MAP.length - 1) {
        throw new Error(`Supported AD years: ${START_YEAR_AD}-${START_YEAR_AD + NEPALI_DATE_MAP.length - 1}`);
    }
    if (!validateMonth(month)) {
        throw new Error(`Invalid month ${month}. Supported months: 1-12`);
    }
    const maxDays = getDaysInADMonth(year, month);
    if (day < 1 || day > maxDays) {
        throw new Error(`Invalid day ${day} for month ${month} in year ${year}`);
    }
};
export const validateBS = (year, month, day) => {
    if (!validateBsYear(year)) {
        throw new Error(`Supported BS years: ${START_YEAR_BS}-${START_YEAR_BS + NEPALI_DATE_MAP.length - 1}`);
    }
    if (!validateMonth(month)) {
        throw new Error(`Invalid month ${month}. Supported months: 1-12`);
    }
    if (!validateBsDay(year, month, day)) {
        throw new Error(`Invalid day ${day} for month ${month} in year ${year}`);
    }
};
//# sourceMappingURL=validator.js.map