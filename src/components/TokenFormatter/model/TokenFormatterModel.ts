/**
 * A utility model for formatting numerical values. This class provides functionality
 * to reformat numbers into a structured representation suitable for displaying
 * significant digits and highlighting leading zeros as a subscript representation.
 */
export class TokenFormatterModel {
    static formatNumber(value: number): { main: string; subscript: string } {
        if (value === 0) {
            return { main: "0", subscript: "" };
        }

        // Convert number to a string in fixed-point format to avoid scientific notation
        const decimalStr = value.toFixed(20);

        // If the number is a whole number (or >=1), just return it as is.
        if (!decimalStr.startsWith("0.")) {
            return { main: decimalStr, subscript: "" };
        }

        // Work with the fractional part only (remove "0.")
        const afterDecimal = decimalStr.slice(2);

        // Find the index of the first non-zero digit
        const firstNonZeroIndex = afterDecimal.search(/[1-9]/);
        if (firstNonZeroIndex === -1) {
            return { main: "0", subscript: "" };
        }

        // If there are fewer than 4 leading zeros, return the original number as usual.
        if (firstNonZeroIndex < 4) {
            // Remove any trailing zeros for a cleaner display (optional)
            return { main: parseFloat(decimalStr).toString(), subscript: "" };
        } else {
            // Otherwise, build the formatted string and subscript.
            const significantPart = afterDecimal.slice(firstNonZeroIndex);
            return {
                main: `0.0${significantPart}`,   // e.g., "0.00002323423"
                subscript: `${firstNonZeroIndex}`, // e.g., "4" if there are 4 leading zeros
            };
        }
    }
}
