import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import CryptoChart from "./CryptoChart";
import { CryptoChartProps } from "./CryptoChartController";
import { TokenData } from "./TokenDataTypes";

// ✅ Storybook Metadata
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
        greyscaleBackgroundLogo: { control: "boolean" },
        tokenData: { control: "object" }, // ✅ Allow overriding tokenData
    },
};

export default meta;

// ✅ Story Template
const Template: StoryFn<CryptoChartProps> = (args) => <CryptoChart {...args} />;

// ✅ Mock Token Data (For TokenData Override)
const mockTokenData: TokenData = {
    tokenImageURL: "https://example.com/custom-token.png",
    tokenName: "MockToken",
    tokenPair: "MOCK/BNB",
    tokenContractURL: "https://bscscan.com/address/0xMockToken123",
    currentPrice: 123.45,
    backgroundImageURL: "https://example.com/custom-background.png",
};

// ✅ **Default Chart (NO LIVE DATA)**
export const DefaultChart = Template.bind({});
DefaultChart.args = {
    chartWidth: 1000,
    chartHeight: 450,
    chartType: "line",
};

// ✅ **Large Chart**
export const LargeChart = Template.bind({});
LargeChart.args = {
    chartWidth: 1200,
    chartHeight: 600,
    chartType: "line",
};

// ✅ **Small Chart**
export const SmallChart = Template.bind({});
SmallChart.args = {
    chartWidth: 600,
    chartHeight: 350,
    chartType: "line",
};

// ✅ **Candlestick Chart**
export const CandlestickChart = Template.bind({});
CandlestickChart.args = {
    chartType: "candlestick",
    chartWidth: 1000,
    chartHeight: 450,
};

// ✅ **Chart with Background Logo**
export const ChartWithBackgroundLogo = Template.bind({});
ChartWithBackgroundLogo.args = {
    chartWidth: 1000,
    chartHeight: 450,
    chartType: "line",
    showBackgroundLogo: true,
};

// ✅ **Chart with Greyscale Background Logo**
export const GreyscaleLogoChart = Template.bind({});
GreyscaleLogoChart.args = {
    chartWidth: 1000,
    chartHeight: 450,
    chartType: "line",
    showBackgroundLogo: true,
    greyscaleBackgroundLogo: true,
};

// ✅ **Chart with Custom Token Data**
export const CustomTokenChart = Template.bind({});
CustomTokenChart.args = {
    chartWidth: 1000,
    chartHeight: 450,
    chartType: "line",
    tokenData: mockTokenData,
};

// ✅ **Candlestick with Custom Token Data**
export const CandlestickWithCustomToken = Template.bind({});
CandlestickWithCustomToken.args = {
    chartType: "candlestick",
    chartWidth: 1000,
    chartHeight: 450,
    showTokenHeader: true,
    showBackgroundLogo: true,
    tokenData: mockTokenData,
};
