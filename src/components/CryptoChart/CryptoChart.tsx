import React, { useEffect, useRef } from "react";
import { useTheme } from "@mui/material/styles";
import { Typography, IconButton } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { useCryptoChartController, CryptoChartProps } from "./CryptoChartController";
import styles from "./CryptoChart.module.css";

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
                                                     greyscaleBackgroundLogo = false,
                                                     chartWidth = 1000,
                                                     chartHeight = 450,
                                                 }) => {
    const theme = useTheme();
    const { data, range, tokenData } = useCryptoChartController({
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
    });

    const chartRef = useRef<HighchartsReact.RefObject>(null);

    useEffect(() => {
        if (chartRef.current?.chart) {
            // ✅ Select correct data structure for chart type
            const series: Highcharts.SeriesOptionsType[] = [
                chartType === "candlestick"
                    ? {
                        type: "candlestick",
                        name: "Crypto Price",
                        data: data.map((item) => [item[0], item[1], item[2], item[3], item[4]]), // [timestamp, open, high, low, close]
                        color: "#00aaff",
                    }
                    : {
                        type: fillLineChart ? "area" : "line",
                        name: "Crypto Price",
                        data: data.map((item) => [item[0], item[4]]), // [timestamp, close]
                        color: "#00aaff",
                        ...(fillLineChart ? { fillOpacity: 0.2, threshold: null, lineWidth: 2 } : {}),
                    },
                ...(showVolume
                    ? [
                        {
                            type: "column",
                            name: "Volume",
                            data: data.map((item) => [item[0], item[5]]), // [timestamp, volume]
                            yAxis: 1,
                            color: "#ff9900",
                        } as Highcharts.SeriesOptionsType,
                    ]
                    : []),
            ];

            chartRef.current.chart.update({
                series,
            });
        }
    }, [chartType, data, showVolume, fillLineChart]);

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
                    <img
                        src={tokenData.backgroundImageURL}
                        alt="Background Logo"
                        className={styles.backgroundLogo}
                        style={{ filter: greyscaleBackgroundLogo ? "grayscale(100%)" : "none" }}
                    />
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
                                labels: { enabled: true, style: { color: theme.palette.text.primary } },
                                opposite: true,
                            },
                            ...(showVolume
                                ? [
                                    {
                                        title: { text: "Volume" },
                                        top: "75%",
                                        height: "25%",
                                        offset: 0,
                                        lineWidth: 1,
                                        labels: { enabled: true },
                                    },
                                ]
                                : []),
                        ],
                        series: [
                            chartType === "candlestick"
                                ? {
                                    type: "candlestick",
                                    name: "Crypto Price",
                                    data: data.map((item) => [item[0], item[1], item[2], item[3], item[4]]),
                                    color: "#00aaff",
                                }
                                : {
                                    type: fillLineChart ? "area" : "line",
                                    name: "Crypto Price",
                                    data: data.map((item) => [item[0], item[4]]),
                                    color: "#00aaff",
                                    ...(fillLineChart ? { fillOpacity: 0.2, threshold: null, lineWidth: 2 } : {}),
                                },
                            ...(showVolume
                                ? [
                                    {
                                        type: "column",
                                        name: "Volume",
                                        data: data.map((item) => [item[0], item[5]]),
                                        yAxis: 1,
                                        color: "#ff9900",
                                    } as Highcharts.SeriesOptionsType,
                                ]
                                : []),
                        ],
                    }}
                    ref={chartRef}
                />
            </div>
        </div>
    );
};

export default CryptoChart;
