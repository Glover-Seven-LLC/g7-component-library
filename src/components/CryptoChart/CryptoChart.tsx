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
                                                 }) => {
    const theme = useTheme();
    const { data, range, handleRangeChange } = useCryptoChartController({ chartType, showVolume, showRangeSelector, showSlider });
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
                lineWidth: 2,
            },
            showVolume && {
                title: { text: "Volume" },
                top: "75%",
                height: "25%",
                offset: 0,
                lineWidth: 2,
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
