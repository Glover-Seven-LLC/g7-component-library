import React from "react";
import styles from "../styles/TokenFormatter.module.css";

interface TokenFormatterViewProps {
    main: string;
    subscript: string;
    size?: "small" | "medium" | "large" | "x-large";
    maxLength?: number; // Maximum total character length
}

const TokenFormatterView: React.FC<TokenFormatterViewProps> = ({
                                                                   main,
                                                                   subscript,
                                                                   size = "medium",
                                                                   maxLength = 16,
                                                               }) => {
    // ✅ **Function to Round & Format Number to Fit `maxLength`**
    const formatNumberToFit = (value: string, maxLen: number): string => {
        let roundedNumber = parseFloat(value);
        let decimalPlaces = maxLen - value.indexOf(".") - 1;

        if (decimalPlaces < 0) decimalPlaces = 0;
        return roundedNumber.toFixed(decimalPlaces);
    };

    // ✅ **If no subscript, round the main number to fit within `maxLength`**
    if (!subscript) {
        const formattedMain = formatNumberToFit(main, maxLength);
        return (
            <span
                className={`${styles.numberWrapper} ${styles[size]}`}
                style={{ minWidth: "60px", flexShrink: 0 }}
            >
                {formattedMain}
            </span>
        );
    }

    // ✅ **If subscript exists, preserve the "0.0" prefix**
    const prefix = "0.0";
    const baseLength = prefix.length + subscript.length;
    const allowedDigits = Math.max(0, maxLength - baseLength);

    const significantDigits = main.startsWith(prefix) ? main.slice(prefix.length) : main;
    const roundedDigits = formatNumberToFit(significantDigits, allowedDigits);

    return (
        <span
            className={`${styles.numberWrapper} ${styles[size]}`}
            style={{ minWidth: "60px", flexShrink: 0 }}
        >
            <span>{prefix}</span>
            <sub className={`${styles.subscript} ${styles[size]}`}>{subscript}</sub>
            <span>{roundedDigits}</span>
        </span>
    );
};

export default TokenFormatterView;
