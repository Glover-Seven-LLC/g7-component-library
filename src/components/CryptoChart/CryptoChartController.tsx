import { useEffect, useState } from "react";
import { generateFakeData, loadHighchartsModules } from "./CryptoChartModel";
import { LiveDataEntry } from "./LiveDataEntryModel";
import { TokenData } from "./TokenDataTypes";

/**
 * Interface for CryptoChart props
 */
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
    greyscaleBackgroundLogo?: boolean;
    chartWidth?: number;
    chartHeight?: number;
    liveData?: LiveDataEntry[]; // ✅ Optional live data (App mode only)
    tokenData?: TokenData; // ✅ Optional token metadata override
}

/**
 * Default token data
 */
export const defaultTokenData: TokenData = {
    tokenImageURL: "https://storage.googleapis.com/pepperbird-www/images/tokens/100BY100/pepperbird_coin_logo_100x100.png",
    tokenName: "Pepperbird",
    tokenPair: "PBIRD/BNB",
    tokenContractURL: "https://bscscan.com/address/0x1A35FaCe19Ed7229d01627b0a4243FaD826dEa54#code",
    currentPrice: 0.1597,
    backgroundImageURL: "https://storage.googleapis.com/pepperbird-www/images/tokens/100BY100/pepperbird_coin_logo_100x100.png",
};

/**
 * Hook to manage CryptoChart data
 */
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
                                             greyscaleBackgroundLogo = false,
                                             liveData,
                                             tokenData,
                                         }: CryptoChartProps) => {
    const [data, setData] = useState<any[]>([]);
    const [range, setRange] = useState<number[]>([0, 50]);
    const [tokenInfo, setTokenInfo] = useState<TokenData>(defaultTokenData);

    useEffect(() => {
        loadHighchartsModules();

        // ✅ Always default to generated data unless liveData is explicitly provided
        if (liveData && liveData.length > 0) {
            // ✅ Validate live data before using it
            const isValid = liveData.every(
                (item) =>
                    typeof item.timestamp === "number" &&
                    typeof item.open === "number" &&
                    typeof item.high === "number" &&
                    typeof item.low === "number" &&
                    typeof item.close === "number" &&
                    typeof item.volume === "number"
            );

            if (isValid) {
                console.info("✅ Using Live Data");
                setData(liveData);
            } else {
                console.warn("⚠️ Invalid Live Data - Falling back to Generated Data");
                setData(generateFakeData(100));
            }
        } else {
            console.info("✅ No Live Data - Using Generated Data");
            setData(generateFakeData(100));
        }

        // ✅ Use provided token metadata if available
        setTokenInfo(tokenData || defaultTokenData);
    }, [liveData, tokenData]);

    return {
        data,
        range,
        setRange,
        tokenData: tokenInfo,
        chartType,
        showVolume,
        showRangeSelector,
        showSlider,
        showDragPane,
        showNavigator,
        fillLineChart,
        showTokenHeader,
        showBackgroundLogo,
        greyscaleBackgroundLogo,
    };
};
