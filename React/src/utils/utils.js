export function removeEmptyFilters(filters) {
    return Object.fromEntries(
        Object.entries(filters).filter(([key, value]) => (
            (Array.isArray(value)) ? value.length > 0 : (value && value !== "")
        ))
    );
}

export function parseDate(dateStr) {
    let [year, month, day] = dateStr.split('-');
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
}
