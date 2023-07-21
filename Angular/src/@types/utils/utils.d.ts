declare module "@common/utils/utils.js" {
    export function removeEmptyFilters(filters: any): any;
    export function objectEquals(obj1: any, obj2: any): boolean;
    export function parseDate(dateStr: string): Date;
    export function toFormDate(dateObj: Date): string;
}
