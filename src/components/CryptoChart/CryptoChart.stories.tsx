import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import CryptoChart from "./CryptoChart";
import {CryptoChartProps} from "./CryptoChartController";


// ✅ Define Storybook Metadata
const meta: Meta<typeof CryptoChart> = {
    title: "Charts/CryptoChart",
    component: CryptoChart,
    parameters: {
        layout: "centered",
    },
    argTypes: {
        chartWidth: { control: { type: "number", min: 400, max: 1200, step: 50 } },
        chartHeight: { control: { type: "number", min: 300, max: 700, step: 50 } },
        chartType: { control: "radio", options: ["line", "candlestick"] },
        showVolume: { control: "boolean" },
        showRangeSelector: { control: "boolean" },
        showSlider: { control: "boolean" },
        showDragPane: { control: "boolean" },
        showNavigator: { control: "boolean" },
        fillLineChart: { control: "boolean" },
        showTokenHeader: { control: "boolean" },
        showBackgroundLogo: { control: "boolean" },
    },
};

export default meta;

// ✅ **Story Template**
const Template: StoryFn<CryptoChartProps> = (args) => <CryptoChart {...args} />;

// ✅ **Story: Default Chart**
export const DefaultChart = Template.bind({});
DefaultChart.args = {
    chartWidth: 1000,
    chartHeight: 450,
    chartType: "line",
};

// ✅ **Story: Large Chart**
export const LargeChart = Template.bind({});
LargeChart.args = {
    chartWidth: 1200,
    chartHeight: 600,
    chartType: "line",
};

// ✅ **Story: Small Chart**
export const SmallChart = Template.bind({});
SmallChart.args = {
    chartWidth: 600,
    chartHeight: 350,
    chartType: "line",
};

// ✅ **Story: Candlestick Chart**
export const CandlestickChart = Template.bind({});
CandlestickChart.args = {
    chartType: "candlestick",
    chartWidth: 1000,
    chartHeight: 450,
};

// ✅ **Story: Chart with Background Logo**
export const ChartWithBackgroundLogo = Template.bind({});
ChartWithBackgroundLogo.args = {
    chartWidth: 1000,
    chartHeight: 450,
    chartType: "line",
    showBackgroundLogo: true,
};

// ✅ **Story: Line Chart with Fill Effect**
export const LineChartFilled = Template.bind({});
LineChartFilled.args = {
    chartWidth: 1000,
    chartHeight: 450,
    chartType: "line",
    fillLineChart: true,
};

// ✅ **Story: Candlestick with Token Header & Background Logo**
export const CandlestickWithLogo = Template.bind({});
CandlestickWithLogo.args = {
    chartType: "candlestick",
    chartWidth: 1000,
    chartHeight: 450,
    showTokenHeader: true,
    showBackgroundLogo: true,
};

// ✅ **Story: Line Chart with Right-Side Price Labels**
export const LineChartRightAxis = Template.bind({});
LineChartRightAxis.args = {
    chartType: "line",
    chartWidth: 1000,
    chartHeight: 450,
    showNavigator: false,
};

// ✅ **Story: Line Chart with Custom Size**
export const CustomSizeChart = Template.bind({});
CustomSizeChart.args = {
    chartWidth: 850,
    chartHeight: 400,
    chartType: "line",
};
