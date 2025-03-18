import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import CryptoChart from "./CryptoChart";
import { CryptoChartProps } from "./CryptoChartController";

const meta: Meta<typeof CryptoChart> = {
    title: "Charts/CryptoChart",
    component: CryptoChart,
    parameters: { layout: "centered" },
    argTypes: {
        chartType: { control: "radio", options: ["line", "candlestick"] },
        showVolume: { control: "boolean" },
    },
};

export default meta;

const Template: StoryFn<CryptoChartProps> = (args) => <CryptoChart key={JSON.stringify(args)} {...args} />;

// ✅ **Story: Chart with Volume**
export const ChartWithVolume = Template.bind({});
ChartWithVolume.args = {
    chartWidth: 1000,
    chartHeight: 450,
    showVolume: true, // ✅ Volume enabled
    chartType: "line",
};
