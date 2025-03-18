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
    },
};

export default meta;

// ✅ Define Themes
const darkTheme = createTheme({ palette: { mode: "dark" } });
const lightTheme = createTheme({ palette: { mode: "light" } });

// ✅ Story Template
const Template: StoryFn<CryptoChartProps> = (args) => <CryptoChart {...args} />;

// ✅ **Story: Line Chart**
export const LineChart = Template.bind({});
LineChart.args = {
    chartType: "line",
};

// ✅ **Story: Candlestick Chart**
export const CandlestickChart = Template.bind({});
CandlestickChart.args = {
    chartType: "candlestick",
};

// ✅ **Dark Mode Line Chart**
export const DarkModeLineChart = Template.bind({});
DarkModeLineChart.args = { chartType: "line" };
DarkModeLineChart.decorators = [
    (Story) => (
        <ThemeProvider theme={darkTheme}>
            <Story />
        </ThemeProvider>
    ),
];

// ✅ **Dark Mode Candlestick Chart**
export const DarkModeCandlestickChart = Template.bind({});
DarkModeCandlestickChart.args = { chartType: "candlestick" };
DarkModeCandlestickChart.decorators = [
    (Story) => (
        <ThemeProvider theme={darkTheme}>
            <Story />
        </ThemeProvider>
    ),
];
