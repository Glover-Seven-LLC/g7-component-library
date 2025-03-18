import React, { useRef } from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Slider, Typography } from "@mui/material";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { useCryptoChartController, CryptoChartProps } from "./CryptoChartController";
import styles from "./CryptoChart.module.css"; // ✅ Import CSS Modules

const CryptoChart: React.FC<CryptoChartProps> = ({
                                                     chartType = "line",
                                                     showVolume = false,
                                                     showRangeSelector = false,
                                                     showSlider = false,
                                                     showDragPane = false,
                                                     showNavigator = false,
                                                     fillLineChart = false, // ✅ New Prop
                                                 }) => {
    const theme = useTheme();
    const { data, range, handleRangeChange } = useCryptoChartController({
        chartType,
        showVolume,
        showRangeSelector,
        showSlider,
        showDragPane,
        showNavigator,
        fillLineChart,
    });
    const chartRef = useRef<HighchartsReact.RefObject>(null);

    // Slice data based on range
    const displayedData = data.slice(range[0], range[1]);

    // Prepare OHLC and volume data separately
    const ohlc = displayedData.map((item) => [item[0], item[1], item[2], item[3], item[4]]);
    const lineData = displayedData.map((item) => [item[0], item[4]]); // ✅ Line chart uses closing price
    const volume = displayedData.map((item) => [item[0], item[5]]);

    const options: Highcharts.Options = {
        chart: {
            backgroundColor: theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
            height: 400,
            width: 750,
        },
        rangeSelector: {
            enabled: showRangeSelector, // ✅ Show only if enabled
            selected: 1,
        },
        navigator: {
            enabled: showNavigator, // ✅ Show navigator only if enabled
            height: showNavigator ? 40 : 0, // ✅ Ensure it completely hides when disabled
            margin: showNavigator ? 10 : 0,
        },
        scrollbar: {
            enabled: showNavigator, // ✅ Disable scrollbar when navigator is off
        },
        title: {
            text: chartType === "candlestick" ? "Candlestick Chart" : "Line Chart",
            style: { color: theme.palette.text.primary },
        },
        xAxis: {
            type: "datetime",
        },
        yAxis: [
            {
                title: { text: "Price" },
                height: showVolume ? "70%" : "100%", // ✅ Adjust height if volume is disabled
                lineWidth: 0, // ✅ Remove left axis line
                gridLineWidth: 0, // ✅ Remove grid lines for a cleaner look
                labels: {
                    enabled: true, // ✅ Keep labels, but remove axis line
                    style: { color: theme.palette.text.primary },
                },
                opposite: true, // ✅ Move price to the right side
                startOnTick: false,
                endOnTick: false,
                moveHandles: showDragPane ? { enabled: true } : undefined, // ✅ Enable Drag Pane if enabled
            },
            showVolume && {
                title: { text: "Volume" },
                top: "75%",
                height: "25%",
                offset: 0,
                lineWidth: 0, // ✅ Remove left axis line for volume too
                gridLineWidth: 0, // ✅ Remove grid lines for a cleaner look
            },
        ].filter(Boolean) as Highcharts.YAxisOptions[], // ✅ Filter out undefined yAxis values
        tooltip: {
            split: true,
        },
        series: [
            {
                type: chartType, // ✅ Use chartType prop
                name: "Crypto Price",
                data: chartType === "candlestick" ? ohlc : lineData, // ✅ Use OHLC for candlestick, close price for line
                color: "#00aaff",
                ...(chartType === "line" && fillLineChart
                    ? {
                        type: "area", // ✅ Use area chart to enable shading
                        fillOpacity: 0.2, // ✅ Adjust transparency
                        threshold: null,
                        lineWidth: 2,
                    }
                    : {}),
            },
            showVolume && {
                type: "column",
                name: "Volume",
                data: volume,
                yAxis: 1,
            },
        ].filter(Boolean) as Highcharts.SeriesOptionsType[], // ✅ Filter out undefined series
    };

    return (
        <Box className={`${styles.chartContainer} ${theme.palette.mode === "dark" ? styles.dark : ""}`}>
            {/* Highcharts Chart */}
            <Box className={styles.chartWrapper}>
                <HighchartsReact highcharts={Highcharts} constructorType={"stockChart"} options={options} ref={chartRef} />
            </Box>

            {/* Slider for Selecting Data Range (Optional) */}
            {showSlider && (
                <Box className={styles.rangeSelector}>
                    <Typography variant="body2" className={styles.typography}>
                        Select Date Range:
                    </Typography>
                    <Slider value={range} onChange={handleRangeChange} min={0} max={data.length} step={1} valueLabelDisplay="auto" />
                </Box>
            )}
        </Box>
    );
};

export default CryptoChart;
