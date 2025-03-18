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
        showDragPane: {
            control: "boolean",
        },
        showNavigator: {
            control: "boolean",
        },
    },
};

export default meta;

// ✅ Story Template
const Template: StoryFn<CryptoChartProps> = (args) => <CryptoChart {...args} />;

// ✅ **Story: Candlestick Chart with Navigator**
export const CandlestickWithNavigator = Template.bind({});
CandlestickWithNavigator.args = {
    chartType: "candlestick",
    showNavigator: true,
};

// ✅ **Story: Line Chart with Navigator**
export const LineWithNavigator = Template.bind({});
LineWithNavigator.args = {
    chartType: "line",
    showNavigator: true,
};

// ✅ **Story: Candlestick Chart without Navigator (No Grey Bar)**
export const CandlestickWithoutNavigator = Template.bind({});
CandlestickWithoutNavigator.args = {
    chartType: "candlestick",
    showNavigator: false, // ✅ No grey bar
};

// ✅ **Story: Line Chart without Navigator (No Grey Bar)**
export const LineWithoutNavigator = Template.bind({});
LineWithoutNavigator.args = {
    chartType: "line",
    showNavigator: false, // ✅ No grey bar
};

// ✅ **Story: Candlestick Chart with All Features Enabled**
export const CandlestickFullFeatures = Template.bind({});
CandlestickFullFeatures.args = {
    chartType: "candlestick",
    showVolume: true,
    showRangeSelector: true,
    showSlider: true,
    showDragPane: true,
    showNavigator: true,
};

// ✅ **Story: Line Chart with Fill (Shading)**
export const LineChartFilled = Template.bind({});
LineChartFilled.args = {
    chartType: "line",
    fillLineChart: true, // ✅ Fill area under the line chart
};

// ✅ **Story: Line Chart with Right-Side Price Labels**
export const LineChartRightAxis = Template.bind({});
LineChartRightAxis.args = {
    chartType: "line",
    showNavigator: false,
};

// ✅ **Story: Candlestick Chart with Token Header**
export const CandlestickWithHeader = Template.bind({});
CandlestickWithHeader.args = {
    chartType: "candlestick",
    showTokenHeader: true,
};

// ✅ **Story: Line Chart with Token Header**
export const LineChartWithHeader = Template.bind({});
LineChartWithHeader.args = {
    chartType: "line",
    showTokenHeader: true,
};

// ✅ **Story: Line Chart with Token Header & Background Logo**
export const LineChartWithLogo = Template.bind({});
LineChartWithLogo.args = {
    chartType: "line",
    showTokenHeader: true,
    showBackgroundLogo: true, // ✅ Show faded logo
};

// ✅ **Story: Candlestick Chart with Token Header & Background Logo**
export const CandlestickWithLogo = Template.bind({});
CandlestickWithLogo.args = {
    chartType: "candlestick",
    showTokenHeader: true,
    showBackgroundLogo: true, // ✅ Show faded logo
};

