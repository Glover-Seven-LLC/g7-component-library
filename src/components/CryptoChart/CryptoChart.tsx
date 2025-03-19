import React, { useEffect, useRef } from "react";
import { useTheme } from "@mui/material/styles";
import { Typography, IconButton } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { useCryptoChartController, CryptoChartProps } from "./CryptoChartController";
import styles from "./CryptoChart.module.css";

/**
 * A React Functional Component that renders a customizable cryptocurrency chart using Highcharts.
 *
 * @typedef {Object} CryptoChartProps
 * @property {string} [chartType="line"] Specifies the type of chart to render. Accepted values are "line", "area", or "candlestick".
 * @property {boolean} [showVolume=false] Determines if a volume bar chart should be displayed alongside the price chart.
 * @property {boolean} [showRangeSelector=false] Enables or disables the range selector tool for the chart.
 * @property {boolean} [showSlider=false] Specifies whether a slider should appear for interactive data selection.
 * @property {boolean} [showDragPane=false] Indicates whether the chart drag pane is displayed.
 * @property {boolean} [showNavigator=false] Specifies whether the navigator component should be displayed at the bottom of the chart.
 * @property {boolean} [fillLineChart=false] Determines if a line chart should be filled (area chart).
 * @property {boolean} [showTokenHeader=false] Toggles the header that displays token information, including name, pair, and other metadata.
 * @property {boolean} [showBackgroundLogo=false] Enables or disables a background logo behind the chart.
 * @property {boolean} [greyscaleBackgroundLogo=false] If true, the background logo will be displayed in greyscale.
 * @property {number} [chartWidth=1000] Specifies the width of the chart container in pixels.
 * @property {number} [chartHeight=450] Specifies the height of the chart container in pixels.
 *
 * @component
 * @param {CryptoChartProps} props The properties that configure the behavior and appearance of the chart component.
 *
 * @description
 * The CryptoChart component utilizes Highcharts to create an interactive and customizable cryptocurrency visualization. It supports multiple chart types, displays token details, and optionally includes features such as range selectors, sliders, volume indicators, and more. Additionally, the component is highly configurable to match the user's requirements.
 *
 * Features:
 * - Line, area, and candlestick chart types supported.
 * - Optionally display trading volume as a bar chart.
 * - Optional token header showing token details like name, pair, and current price.
 * - Background logo support with optional greyscale filtering.
 * - Interactive chart features like navigator, range selector, and sliders.
 * - Custom width and height for responsive design.
 *
 * Note:
 * Data and configurations are managed by the useCryptoChartController hook for seamless integration. Ensure required properties for token data and data structure are properly managed to avoid unintended rendering issues.
 */
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
