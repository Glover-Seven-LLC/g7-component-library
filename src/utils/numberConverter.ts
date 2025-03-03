/**
 * Converts a numeric value into a human-readable text format with appropriate suffixes such as K, M, B, or T.
 * If the number is less than 10,000, it returns the number in a localized string format without any suffix.
 *
 * @param {number} value - The numeric value to be converted.
 * @return {string} The formatted string representation of the numeric value with appropriate suffixes.
 */
export function numberTextConverter (value: number): string {
    if (value < 10_000) return value.toLocaleString(); // Keep as is if below 10K

    const suffixes = ["", "K", "M", "B", "T"];
    let index = 0;

    while (value >= 1000 && index < suffixes.length - 1) {
        value /= 1000;
        index++;
    }

    return `${value.toFixed(2)}${suffixes[index]}`;
}
