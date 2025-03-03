import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import TokenFormatter from "../component/TokenFormatter";

// ✅ Manually define props instead of using `typeof TokenFormatter`
interface TokenFormatterStoryProps {
    value: number;
    size?: "small" | "medium" | "large" | "x-large";
    maxLength?: number;
}

// ✅ Define Storybook Metadata with Correct Typing
const meta: Meta<TokenFormatterStoryProps> = {
    title: "Utils/TokenFormatter",
    component: TokenFormatter,
    parameters: {
        layout: "centered",
    },
    argTypes: {
        value: { control: "number" },
        size: { control: "radio", options: ["small", "medium", "large", "x-large"] },
        maxLength: { control: "number" },
    },
};
export default meta;

// ✅ Define a Type-Safe Story Template
const Template: StoryFn<TokenFormatterStoryProps> = (args) => <TokenFormatter {...args} />;

// ✅ **Story: Typical Crypto Price**
export const NormalPrice = Template.bind({});
NormalPrice.args = {
    value: 0.234023454,
    size: "medium",
} as TokenFormatterStoryProps;

// ✅ **Story: Small Crypto Price (Below 1)**
export const SmallPrice = Template.bind({});
SmallPrice.args = {
    value: 0.00003242342,
    size: "medium",
} as TokenFormatterStoryProps;

// ✅ **Story: Very Small Crypto Price (With Subscript)**
export const VerySmallPrice = Template.bind({});
VerySmallPrice.args = {
    value: 0.00000000002343,
    size: "medium",
} as TokenFormatterStoryProps;

// ✅ **Story: Large Crypto Price (Whole Number)**
export const LargePrice = Template.bind({});
LargePrice.args = {
    value: 1000000.987654321,
    size: "medium",
} as TokenFormatterStoryProps;

// ✅ **Story: Whole Number Price**
export const WholeNumberPrice = Template.bind({});
WholeNumberPrice.args = {
    value: 42,
    size: "medium",
} as TokenFormatterStoryProps;

// ✅ **Story: Small Whole Number**
export const SmallWholeNumber = Template.bind({});
SmallWholeNumber.args = {
    value: 1.5,
    size: "medium",
} as TokenFormatterStoryProps;

// ✅ **Story: Token Price with Custom Size**
export const LargeStyledPrice = Template.bind({});
LargeStyledPrice.args = {
    value: 0.1597,
    size: "x-large",
} as TokenFormatterStoryProps;

// ✅ **Story: Token Price with Max Length Restriction**
export const RestrictedLength = Template.bind({});
RestrictedLength.args = {
    value: 0.00000000002343,
    size: "medium",
    maxLength: 10,
} as TokenFormatterStoryProps;
