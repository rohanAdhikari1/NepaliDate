export type Locale = "en" | "np";

export type DateUnits =
  | "year"
  | "month"
  | "week"
  | "day"
  | "hour"
  | "minute"
  | "second";

export interface NepaliDateProps {
  year: number;
  month: number;
  day: number;
  dayOfWeek?: number | null;
  hour?: number;
  minute?: number;
  second?: number;
  locale?: Locale;
}

export type NepaliDateObj = {
  year: number;
  month: number;
  day: number;
  dayOfWeek: number;
  hour: number;
  minute: number;
  second: number;
};

export type AddSubReturn = [number, number, number, number];
