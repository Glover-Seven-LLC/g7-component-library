import { useEffect, useState } from "react";
import { generateFakeData, loadHighchartsModules } from "./CryptoChartModel";
import { TokenData } from "./TokenDataTypes";

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
    tokenData?: TokenData;
}

// ✅ Default Token Metadata
export const defaultTokenData: TokenData = {
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
                                             greyscaleBackgroundLogo = false,
                                             tokenData,
                                         }: CryptoChartProps) => {
    const [data, setData] = useState<any[]>(generateFakeData(100));
    const [range, setRange] = useState<number[]>([0, 50]);
    const [tokenInfo, setTokenInfo] = useState<TokenData>(tokenData || defaultTokenData);

    useEffect(() => {
        loadHighchartsModules();
        setData(generateFakeData(100));
        setRange([50, 100]);
        setTokenInfo(tokenData || defaultTokenData);
    }, [tokenData]);

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
