import React, { useRef } from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Slider, Typography, IconButton } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
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
                                                     fillLineChart = false,
                                                     showTokenHeader = false,
                                                     showBackgroundLogo = false,
                                                 }) => {
    const theme = useTheme();
    const { data, range, handleRangeChange, tokenData } = useCryptoChartController({
        chartType,
        showVolume,
        showRangeSelector,
        showSlider,
        showDragPane,
        showNavigator,
        fillLineChart,
        showTokenHeader,
        showBackgroundLogo,
    });
    const chartRef = useRef<HighchartsReact.RefObject>(null);

    // Slice data based on range
    const displayedData = data.slice(range[0], range[1]);

    // Prepare OHLC and volume data separately
    const ohlc = displayedData.map((item) => [item[0], item[1], item[2], item[3], item[4]]);
    const lineData = displayedData.map((item) => [item[0], item[4]]);
    const volume = displayedData.map((item) => [item[0], item[5]]);

    const options: Highcharts.Options = {
        chart: {
            backgroundColor: theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
            height: 400,
        },
        rangeSelector: {
            enabled: showRangeSelector,
            selected: 1,
        },
        navigator: {
            enabled: showNavigator,
        },
        scrollbar: {
            enabled: showNavigator,
        },
        title: {
            text: "",
        },
        xAxis: {
            type: "datetime",
        },
        yAxis: [
            {
                title: { text: "" },
                height: showVolume ? "70%" : "100%",
                lineWidth: 0,
                gridLineWidth: 0,
                labels: {
                    enabled: true,
                    style: { color: theme.palette.text.primary },
                },
                opposite: true,
            },
        ],
        tooltip: {
            split: true,
        },
        series: [
            {
                type: chartType,
                name: "Crypto Price",
                data: chartType === "candlestick" ? ohlc : lineData,
                color: "#00aaff",
                ...(chartType === "line" && fillLineChart
                    ? {
                        type: "area",
                        fillOpacity: 0.2,
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
        ].filter(Boolean) as Highcharts.SeriesOptionsType[],
    };

    return (
        <Box className={`${styles.chartContainer} ${theme.palette.mode === "dark" ? styles.dark : ""}`}>
            {showTokenHeader && (
                <Box className={styles.tokenHeader}>
                    <Box className="leftSection">
                        <img src={tokenData.tokenImageURL} alt="Token" className={styles.tokenIcon} />
                        <Typography className={styles.tokenName}>{tokenData.tokenName}</Typography>
                        <Typography className={styles.tokenPair}>PAIR: {tokenData.tokenPair}</Typography>
                        <IconButton href={tokenData.tokenContractURL} target="_blank" className={styles.contractIcon}>
                            <LinkIcon />
                        </IconButton>
                    </Box>
                    <Typography className={styles.tokenPrice}>${tokenData.currentPrice.toFixed(4)}</Typography>
                </Box>
            )}

            <Box className={styles.chartWrapper}>
                {showBackgroundLogo && (
                    <img src={tokenData.backgroundImageURL} alt="Background Logo" className={styles.backgroundLogo} />
                )}
                <HighchartsReact
                    highcharts={Highcharts}
                    constructorType="stockChart"
                    options={options}
                    ref={chartRef}
                />
            </Box>
        </Box>
    );
};

export default CryptoChart;
