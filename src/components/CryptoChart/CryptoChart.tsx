import React, { useRef } from "react";
import { useTheme } from "@mui/material/styles";
import { Typography, IconButton } from "@mui/material";
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
        chartWidth,
        chartHeight,
    });

    const chartRef = useRef<HighchartsReact.RefObject>(null);

    // ✅ Ensure `tokenData` is never undefined
    if (!tokenData) {
        console.error("🚨 ERROR: tokenData is undefined!");
        return null; // ✅ Prevents rendering a broken component
    }

    // ✅ Slice data based on range
    const displayedData = data.slice(range[0], range[1]);

    // ✅ Prepare OHLC and volume data separately
    const ohlc = displayedData.map((item) => [item[0], item[1], item[2], item[3], item[4]]);
    const lineData = displayedData.map((item) => [item[0], item[4]]);
    const volume = displayedData.map((item) => [item[0], item[5]]);

    return (
        <div
            className={styles.chartContainer}
            style={{ "--chart-width": `${chartWidth}px`, "--chart-height": `${chartHeight}px` } as React.CSSProperties}
        >
            {showTokenHeader && tokenData && (
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
                {showBackgroundLogo && tokenData.backgroundImageURL && (
                    <img
                        src={tokenData.backgroundImageURL}
                        alt="Background Logo"
                        className={styles.backgroundLogo}
                        style={{ filter: greyscaleBackgroundLogo ? "grayscale(100%)" : "none" }} // ✅ Greyscale Option
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
                        series: [
                            {
                                type: chartType,
                                name: tokenData.tokenName,
                                data: lineData,
                                color: "#00aaff",
                            },
                        ],
                    }}
                    ref={chartRef}
                />
            </div>
        </div>
    );
};

export default CryptoChart;
