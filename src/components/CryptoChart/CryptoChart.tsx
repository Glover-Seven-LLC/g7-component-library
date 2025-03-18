import React, { useRef } from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Slider, Typography } from "@mui/material";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { useCryptoChartController } from "./CryptoChartController";
import styles from "./CryptoChart.module.css"; // ✅ Import CSS Modules

const CryptoChart: React.FC = () => {
    const theme = useTheme();
    const { data, range, setRange, handleRangeChange } = useCryptoChartController();
    const chartRef = useRef<HighchartsReact.RefObject>(null);

    // Slice data based on range
    const displayedData = data.slice(range[0], range[1]);

    // Prepare OHLC and volume data separately
    const ohlc = displayedData.map((item) => [item[0], item[1], item[2], item[3], item[4]]);
    const volume = displayedData.map((item) => [item[0], item[5]]);

    const options: Highcharts.Options = {
        chart: {
            backgroundColor: theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
            height: 400, // ✅ Fixed height for a rectangular aspect ratio
            width: 750, // ✅ Fixed width for consistency
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
        <Box className={`${styles.chartContainer} ${theme.palette.mode === "dark" ? styles.dark : ""}`}>
            {/* Chart Wrapper */}
            <Box className={styles.chartWrapper}>
                <HighchartsReact highcharts={Highcharts} constructorType={"stockChart"} options={options} ref={chartRef} />
            </Box>

            {/* Range Selector */}
            <Box className={styles.rangeSelector}>
                <Typography variant="body2" className={styles.typography}>
                    Select Date Range:
                </Typography>
                <Slider value={range} onChange={handleRangeChange} min={0} max={data.length} step={1} valueLabelDisplay="auto" />
            </Box>
        </Box>
    );
};

export default CryptoChart;
