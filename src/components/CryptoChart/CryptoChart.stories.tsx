import * as React from "react"; // <-- Explicitly Import React
import { Meta, StoryFn } from "@storybook/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CryptoChart from "./CryptoChart";

// ✅ Define Storybook Metadata
const meta: Meta<typeof CryptoChart> = {
    title: "Charts/CryptoChart",
    component: CryptoChart,
    parameters: {
        layout: "centered",
    },
};

export default meta;

// ✅ Define Themes
const darkTheme = createTheme({ palette: { mode: "dark" } });
const lightTheme = createTheme({ palette: { mode: "light" } });

// ✅ Story Template
const Template: StoryFn<typeof CryptoChart> = () => <CryptoChart />;

// ✅ Light Mode Story
export const LightMode = Template.bind({});
LightMode.decorators = [
    (Story) => (
        <ThemeProvider theme={lightTheme}>
            <Story />
        </ThemeProvider>
    ),
];

// ✅ Dark Mode Story
export const DarkMode = Template.bind({});
DarkMode.decorators = [
    (Story) => (
        <ThemeProvider theme={darkTheme}>
            <Story />
        </ThemeProvider>
    ),
];
