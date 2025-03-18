import { useEffect, useState } from "react";
import { generateFakeData, loadHighchartsModules } from "./CryptoChartModel";

// ✅ Define Props Type
export interface CryptoChartProps {
    chartType?: "line" | "candlestick"; // ✅ Default to "line"
}

export const useCryptoChartController = ({ chartType = "line" }: CryptoChartProps) => {
    const [data, setData] = useState<any[]>([]);
    const [range, setRange] = useState<number[]>([0, 50]);

    useEffect(() => {
        loadHighchartsModules(); // ✅ Load Highcharts modules dynamically
        setData(generateFakeData(100));
        setRange([50, 100]);
    }, []);

    const handleRangeChange = (_: Event, newRange: number | number[]) => {
        if (Array.isArray(newRange)) setRange(newRange);
    };

    return { data, range, setRange, handleRangeChange, chartType };
};
