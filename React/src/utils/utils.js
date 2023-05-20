export function removeEmptyFilters(filters) {
    return Object.fromEntries(
        Object.entries(filters).filter(([key, value]) => (
            (Array.isArray(value)) ? value.length > 0 : (value && value !== "")
        ))
    );
}

export function parseDate(dateStr) {
    if(!dateStr || dateStr === "") {
        return null;
    }
    let [year, month, day] = dateStr.split('-');
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
}

export function toFormDate(dateObj) {
    let year = dateObj.getFullYear();
    let month = (dateObj.getMonth() < 9) ? `0${dateObj.getMonth() + 1}` : dateObj.getMonth() + 1;
    let day = (dateObj.getDate() < 10) ? `0${dateObj.getDate()}` : dateObj.getDate(); 
    return `${year}-${month}-${day}`;
}
