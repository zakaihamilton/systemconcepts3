export function validNumber(number, alt = 0) {
    number = parseInt(number);
    if (Number.isNaN(number)) {
        return alt;
    }
    return number;
}
