import NepaliDate from "./NepaliDate";
export { NepaliDate };
declare const nepalidayjs: {
    (date?: NepaliDate | string | null): NepaliDate;
    fromAd(date: Date | string): NepaliDate;
    weekdaysShort(locale?: string): string[];
    weekdays(locale?: string): string[];
    months(locale?: string): string[];
    monthsShort(locale?: string): string[];
    isValid(date: NepaliDate | string): boolean | undefined;
};
export default nepalidayjs;
//# sourceMappingURL=index.d.ts.map