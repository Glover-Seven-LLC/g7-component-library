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
    fillLineChart?: boolean; // ✅ Default to false (NEW) - Shades the area under the line chart
}

export const useCryptoChartController = ({
                                             chartType = "line",
                                             showVolume = false,
                                             showRangeSelector = false,
                                             showSlider = false,
                                             showDragPane = false,
                                             showNavigator = false,
                                             fillLineChart = false, // ✅ New prop
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
    };
};
