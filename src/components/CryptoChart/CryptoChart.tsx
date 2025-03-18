import React, { useRef } from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Typography, IconButton } from "@mui/material";
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
                                                     chartWidth = 1000, // ✅ Default Width
                                                     chartHeight = 450, // ✅ Default Height
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

    return (
        <div
            className={styles.chartContainer}
            style={{ "--chart-width": `${chartWidth}px`, "--chart-height": `${chartHeight}px` } as React.CSSProperties}
        >
            {showTokenHeader && (
                <div className={styles.tokenHeader}>
                    <div className={styles.leftSection}>
                        <img src={tokenData.tokenImageURL} alt="Token" className={styles.tokenIcon} />
                        <Typography className={styles.tokenName}>{tokenData.tokenName}</Typography>
                        <Typography className={styles.tokenPair}>PAIR: {tokenData.tokenPair}</Typography>
                        <IconButton href={tokenData.tokenContractURL} target="_blank" className={styles.contractIcon}>
                            <LinkIcon />
                        </IconButton>
                    </div>
                    <div className={styles.rightSection}>
                        <Typography className={styles.tokenPrice}>${tokenData.currentPrice.toFixed(4)}</Typography>
                    </div>
                </div>
            )}

            <div className={styles.chartWrapper}>
                {showBackgroundLogo && (
                    <img src={tokenData.backgroundImageURL} alt="Background Logo" className={styles.backgroundLogo} />
                )}
                <HighchartsReact
                    highcharts={Highcharts}
                    constructorType="stockChart"
                    options={{
                        chart: {
                            backgroundColor: "transparent",
                            height: chartHeight - 50,
                        },
                        rangeSelector: { enabled: showRangeSelector, selected: 1 },
                        navigator: { enabled: showNavigator },
                        scrollbar: { enabled: showNavigator },
                        title: { text: "" },
                        xAxis: { type: "datetime" },
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
                        tooltip: { split: true },
                        series: [
                            {
                                type: chartType,
                                name: "Crypto Price",
                                data: chartType === "candlestick" ? data : data.map((item) => [item[0], item[4]]),
                                color: "#00aaff",
                                ...(chartType === "line" && fillLineChart
                                    ? { type: "area", fillOpacity: 0.2, threshold: null, lineWidth: 2 }
                                    : {}),
                            },
                            showVolume && { type: "column", name: "Volume", data: data.map((item) => [item[0], item[5]]), yAxis: 1 },
                        ].filter(Boolean) as Highcharts.SeriesOptionsType[],
                    }}
                    ref={chartRef}
                />
            </div>
        </div>
    );
};

export default CryptoChart;
