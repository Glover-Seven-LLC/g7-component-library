import React, { useEffect, useState, useRef } from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Slider, Typography } from "@mui/material";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import dayjs from "dayjs";

// ✅ Load Highcharts modules dynamically (Fixes Vite ESM issue)
const loadHighchartsModules = () => {
    import("highcharts/indicators/indicators-all").then((module) => module.default(Highcharts));
    import("highcharts/modules/drag-panes").then((module) => module.default(Highcharts));
    import("highcharts/modules/annotations-advanced").then((module) => module.default(Highcharts));
    import("highcharts/modules/full-screen").then((module) => module.default(Highcharts));
    import("highcharts/modules/stock-tools").then((module) => module.default(Highcharts));
    import("highcharts/modules/hollowcandlestick").then((module) => module.default(Highcharts));
    import("highcharts/modules/heikinashi").then((module) => module.default(Highcharts));
};

// ✅ Generate Fake OHLCV Data
const generateFakeData = (numPoints = 50) => {
    const data = [];
    let basePrice = 100;

    for (let i = 0; i < numPoints; i++) {
        const timestamp = dayjs().subtract(numPoints - i, "day").valueOf();
        const open = basePrice + Math.random() * 5 - 2.5;
        const high = open + Math.random() * 3;
        const low = open - Math.random() * 3;
        const close = low + Math.random() * (high - low);
        const volume = Math.floor(Math.random() * 100000) + 50000;

        data.push([timestamp, open, high, low, close, volume]);
        basePrice = close;
    }

    return data;
};

const CryptoChart: React.FC = () => {
    const theme = useTheme();
    const [data, setData] = useState<any[]>([]);
    const [range, setRange] = useState<number[]>([0, 50]);
    const chartRef = useRef<HighchartsReact.RefObject>(null);

    useEffect(() => {
        loadHighchartsModules(); // ✅ Load modules dynamically
        setData(generateFakeData(100));
        setRange([50, 100]);
    }, []);

    const handleRangeChange = (_: Event, newRange: number | number[]) => {
        if (Array.isArray(newRange)) setRange(newRange);
    };

    // Slice data based on range
    const displayedData = data.slice(range[0], range[1]);

    // Prepare OHLC and volume data separately
    const ohlc = displayedData.map((item) => [item[0], item[1], item[2], item[3], item[4]]);
    const volume = displayedData.map((item) => [item[0], item[5]]);

    const options: Highcharts.Options = {
        chart: {
            backgroundColor: theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
            height: 600,
        },
        rangeSelector: {
            selected: 1,
        },
        title: {
            text: "Crypto Candlestick Chart",
            style: { color: theme.palette.text.primary },
        },
        xAxis: {
            type: "datetime",
        },
        yAxis: [
            {
                title: { text: "Price" },
                height: "70%",
                lineWidth: 2,
            },
            {
                title: { text: "Volume" },
                top: "75%",
                height: "25%",
                offset: 0,
                lineWidth: 2,
            },
        ],
        tooltip: {
            split: true,
        },
        series: [
            {
                type: "candlestick",
                name: "Crypto Price",
                data: ohlc,
            },
            {
                type: "column",
                name: "Volume",
                data: volume,
                yAxis: 1,
            },
        ],
    };

    return (
        <Box sx={{ width: "100%", p: 2, borderRadius: 2, boxShadow: 2 }}>
            {/* Highcharts Candlestick Chart */}
            <HighchartsReact highcharts={Highcharts} constructorType={"stockChart"} options={options} ref={chartRef} />

            {/* Range Selector */}
            <Box sx={{ width: "100%", mt: 2 }}>
                <Typography variant="body2" color="textSecondary">
                    Select Date Range:
                </Typography>
                <Slider value={range} onChange={handleRangeChange} min={0} max={data.length} step={1} valueLabelDisplay="auto" />
            </Box>
        </Box>
    );
};

export default CryptoChart;
