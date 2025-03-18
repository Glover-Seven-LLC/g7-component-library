import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CryptoChart from "../CryptoChart/CryptoChart";
import {CryptoChartProps} from "./CryptoChartController";

// ✅ Define Storybook Metadata
const meta: Meta<typeof CryptoChart> = {
    title: "Charts/CryptoChart",
    component: CryptoChart,
    parameters: {
        layout: "centered",
    },
    argTypes: {
        chartType: {
            control: "radio",
            options: ["line", "candlestick"],
        },
        showVolume: {
            control: "boolean",
        },
        showRangeSelector: {
            control: "boolean",
        },
        showSlider: {
            control: "boolean",
        },
    },
};

export default meta;

// ✅ Define Themes
const darkTheme = createTheme({ palette: { mode: "dark" } });

// ✅ Story Template
const Template: StoryFn<CryptoChartProps> = (args) => <CryptoChart {...args} />;

// ✅ **Story: Default Line Chart**
export const LineChart = Template.bind({});
LineChart.args = {
    chartType: "line",
};

// ✅ **Story: Default Candlestick Chart**
export const CandlestickChart = Template.bind({});
CandlestickChart.args = {
    chartType: "candlestick",
};

// ✅ **Story: Line Chart with Volume**
export const LineChartWithVolume = Template.bind({});
LineChartWithVolume.args = {
    chartType: "line",
    showVolume: true,
};

// ✅ **Story: Candlestick Chart with Volume**
export const CandlestickChartWithVolume = Template.bind({});
CandlestickChartWithVolume.args = {
    chartType: "candlestick",
    showVolume: true,
};

// ✅ **Story: Line Chart with Range Selector & Slider**
export const LineChartWithRangeAndSlider = Template.bind({});
LineChartWithRangeAndSlider.args = {
    chartType: "line",
    showRangeSelector: true,
    showSlider: true,
};

// ✅ **Story: Candlestick Chart with All Features Enabled**
export const CandlestickChartFullFeatures = Template.bind({});
CandlestickChartFullFeatures.args = {
    chartType: "candlestick",
    showVolume: true,
    showRangeSelector: true,
    showSlider: true,
};

// ✅ **Dark Mode Stories**
export const DarkModeLineChart = Template.bind({});
DarkModeLineChart.args = { chartType: "line" };
DarkModeLineChart.decorators = [(Story) => <ThemeProvider theme={darkTheme}><Story /></ThemeProvider>];

export const DarkModeCandlestickChart = Template.bind({});
DarkModeCandlestickChart.args = { chartType: "candlestick" };
DarkModeCandlestickChart.decorators = [(Story) => <ThemeProvider theme={darkTheme}><Story /></ThemeProvider>];
