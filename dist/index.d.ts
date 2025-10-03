import NepaliDate from "./NepaliDate";
import type { Locale } from "./types";
export { NepaliDate };
declare const nepalidayjs: {
    (date?: NepaliDate | string | null): NepaliDate;
    fromAd(date: Date | string): NepaliDate;
    weekdaysShort(locale?: string): string[];
    weekdays(locale?: string): string[];
    months(locale?: string): string[];
    monthsShort(locale?: string): string[];
    minDate(locale?: Locale): NepaliDate;
    maxDate(locale?: Locale): NepaliDate;
    minYear(): number;
    maxYear(): number;
    isValid(date: NepaliDate | string): boolean;
};
export default nepalidayjs;
//# sourceMappingURL=index.d.ts.map