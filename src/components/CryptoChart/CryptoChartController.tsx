import { useEffect, useState } from "react";
import { generateFakeData, loadHighchartsModules } from "./CryptoChartModel";

// ✅ Define Props Type
export interface CryptoChartProps {
    chartType?: "line" | "candlestick"; // ✅ Default to "line"
    showVolume?: boolean; // ✅ Default to false
    showRangeSelector?: boolean; // ✅ Default to false
    showSlider?: boolean; // ✅ Default to false
    showDragPane?: boolean; // ✅ Default to false
    showNavigator?: boolean; // ✅ Default to false
    fillLineChart?: boolean; // ✅ Default to false
    showTokenHeader?: boolean; // ✅ Default to false
    showBackgroundLogo?: boolean; // ✅ NEW: Show faded logo behind chart
}

// ✅ Define Default Token Info
export const defaultTokenData = {
    tokenImageURL: "https://storage.googleapis.com/pepperbird-www/images/tokens/100BY100/pepperbird_coin_logo_100x100.png",
    tokenName: "Pepperbird",
    tokenPair: "PBIRD/BNB",
    tokenContractURL: "https://bscscan.com/address/0x1A35FaCe19Ed7229d01627b0a4243FaD826dEa54#code",
    currentPrice: 0.1597,
    backgroundImageURL: "https://storage.googleapis.com/pepperbird-www/images/tokens/100BY100/pepperbird_coin_logo_100x100.png",
};

export const useCryptoChartController = ({
                                             chartType = "line",
                                             showVolume = false,
                                             showRangeSelector = false,
                                             showSlider = false,
                                             showDragPane = false,
                                             showNavigator = false,
                                             fillLineChart = false,
                                             showTokenHeader = false,
                                             showBackgroundLogo = false,
                                         }: CryptoChartProps) => {
    const [data, setData] = useState<any[]>([]);
    const [range, setRange] = useState<number[]>([0, 50]);

    useEffect(() => {
        loadHighchartsModules();
        setData(generateFakeData(100));
        setRange([50, 100]);
    }, []);

    const handleRangeChange = (_: Event, newRange: number | number[]) => {
        if (Array.isArray(newRange)) setRange(newRange);
    };

    return {
        data,
        range,
        setRange,
        handleRangeChange,
        chartType,
        showVolume,
        showRangeSelector,
        showSlider,
        showDragPane,
        showNavigator,
        fillLineChart,
        showTokenHeader,
        showBackgroundLogo,
        tokenData: defaultTokenData,
    };
};
