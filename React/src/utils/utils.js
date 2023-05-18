export function removeEmptyFilters([filterEntry, value]) {
    if(Array.isArray(value)) {
        return value.length > 0;
    }
    return value && value !== "";
}

export function parseDate(dateStr) {
    let [year, month, day] = dateStr.split('-');
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
}
