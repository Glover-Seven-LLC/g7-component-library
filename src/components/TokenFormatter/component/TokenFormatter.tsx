import React from "react";
import {TokenFormatterModel} from "../model/TokenFormatterModel";
import TokenFormatterView from "../view/TokenFormatterView";


/**
 * Represents the properties for configuring a token formatter component.
 */
interface TokenFormatterProps {
    value: number;
    size?: "small" | "medium" | "large" | "x-large";  // ✅ Add size prop
    maxLength?: number;
}

/**
 * TokenFormatter is a React functional component responsible for formatting and rendering tokens.
 * It uses the TokenFormatterModel to process and format a numerical value before displaying it
 * with the TokenFormatterView component.
 *
 * Props:
 * - value: The numeric value to be formatted and displayed.
 * - size: The size of the token display. Defaults to "medium".
 * - maxLength: The maximum length of the formatted output. Defaults to 16.
 *
 * The formatted output is divided into main and subscript sections, which are handled
 * by the TokenFormatterView.
 */
const TokenFormatter: React.FC<TokenFormatterProps> = ({ value, size = "medium", maxLength = 16}) => {
    const formatted = TokenFormatterModel.formatNumber(value);
    return <TokenFormatterView main={formatted.main} subscript={formatted.subscript} size={size}  maxLength={maxLength}/>;
};

export default TokenFormatter;