import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import CryptoChart from "./CryptoChart";
import { CryptoChartProps } from "./CryptoChartController";

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
        showBackgroundLogo: { control: "boolean" },
        greyscaleBackgroundLogo: { control: "boolean" }, // ✅ NEW GREYSCALE CONTROL
    },
};

export default meta;

// ✅ **Story Template**
const Template: StoryFn<CryptoChartProps> = (args) => <CryptoChart {...args} />;

// ✅ **Story: Chart with Greyscale Background Logo**
export const GreyscaleLogoChart = Template.bind({});
GreyscaleLogoChart.args = {
    chartWidth: 1000,
    chartHeight: 450,
    chartType: "line",
    showBackgroundLogo: true,
    greyscaleBackgroundLogo: true, // ✅ Greyscale Enabled
};
