import {REGEX_PARSE} from './constant';
import type { NepaliDateProps } from './types';

export function parseWithFormat(date:string,format:string){
    
}
export function parseWithOutFormat(date: string): NepaliDateProps | null {
    const match = REGEX_PARSE.exec(date)
    if (!match) return null

    const [
        _,
        part1 = "0",
        part2 = "0",
        part3 = "0",
        hour = "0",
        minute = "0",
        second = "0",
    ] = match

    let day = 1,
        month = 1,
        year = 2000;

    if (part1.length === 4) {
        // YYYY-MM-DD
        year = Number(part1)
        month = Number(part2)
        day = Number(part3)
    } else if (part3.length === 4) {
        // DD/MM/YYYY
        day = Number(part1)
        month = Number(part2)
        year = Number(part3)
    } else {
        // fallback if ambiguous
        year = Number(part3)
        month = Number(part2)
        day = Number(part1)
    }

    return {
        year: Number(year),
        month: Number(month),
        day: Number(day),
        dayOfWeek: null,
        hour: Number(hour),
        minute: Number(minute),
        second: Number(second),
    }
}