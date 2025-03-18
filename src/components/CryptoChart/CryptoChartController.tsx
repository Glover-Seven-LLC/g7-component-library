import { useEffect, useState } from "react";
import { generateFakeData, loadHighchartsModules } from "./CryptoChartModel";

// ✅ Define Props Type
export interface CryptoChartProps {
    chartType?: "line" | "candlestick";
    showVolume?: boolean;
    showRangeSelector?: boolean;
    showSlider?: boolean;
    showDragPane?: boolean;
    showNavigator?: boolean;
    fillLineChart?: boolean;
    showTokenHeader?: boolean;
    showBackgroundLogo?: boolean;
    greyscaleBackgroundLogo?: boolean; // ✅ New: Greyscale option
    chartWidth?: number;  // ✅ New: Custom Chart Width
    chartHeight?: number; // ✅ New: Custom Chart Height
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
                                             greyscaleBackgroundLogo = false, // ✅ New prop added to controller
                                             chartWidth = 1000,
                                             chartHeight = 450,
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
        greyscaleBackgroundLogo, // ✅ Ensures prop is included in return object
        chartWidth,
        chartHeight,
        tokenData: defaultTokenData,
    };
};
