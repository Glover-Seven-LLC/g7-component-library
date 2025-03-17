import React, { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import Ticker from "../components/Ticker";
import { TickerData } from "../models/tickerModel";

// ✅ Define the props manually
interface TickerProps {
    data: TickerData;
    showWalletBalance?: boolean;
}

// ✅ Define Storybook Metadata
const meta: Meta<TickerProps> = {
    title: "Components/Ticker",
    component: Ticker,
    parameters: {
        layout: "centered",
    },
    argTypes: {
        showWalletBalance: { control: "boolean" },
    },
};

export default meta;

// ✅ Sample Data for Ticker
const baseMockData: TickerData = {
    tokenPrimary: {
        tokenImageURL: "https://storage.googleapis.com/pepperbird-www/images/tokens/100BY100/pepperbird_coin_logo_100x100.png",
        tokenName: "Pepperbird",
        tokenSymbol: "PBIRD",
        tokenContract: "0x77Ad5F358CD673FCA1673e20E928B3CcADC84706",
        tokenChain: 56,
        tokenContractInfoUrl: "https://bscscan.com/token/0x77Ad5F358CD673FCA1673e20E928B3CcADC84706#code",
    },
    tokenPair: {
        tokenImageURL: "https://storage.googleapis.com/pepperbird-www/images/tokens/100BY100/wbnb_100x100.png",
        tokenName: "Wrapped BNB",
        tokenSymbol: "WBNB",
        tokenContract: "0xBB4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
        tokenChain: 56,
        tokenContractInfoUrl: "https://bscscan.com/token/0xBB4CdB9CBd36B01bD1cBaEBF2De08b9173bc095c#code",
    },
    tokenPairContract: "https://bscscan.com/address/0x1A35FaCe19Ed7229d01627b0a4243FaD826dEa54#code",
    chainName: "Binance Smart Chain",
    chainLogo: "https://storage.googleapis.com/pepperbird-www/images/tokens/100BY100/wbnb_100x100.png",
    tokenPrice: 0.1597,
    liquidity: 69100,
    circulatingMarketCap: 119800,
    marketCap: 119800,
    userTokenBalance: 1000,
    totalSupply: 75000000000000,
    socialLinks: {
        x: "https://twitter.com/pepperbird",
        telegram: "https://t.me/pepperbird",
        website: "https://pepperbird.com",
        youtube: "https://youtube.com/pepperbird",
        github: "https://github.com/pepperbird",
    },
};

// ✅ Define a Type-Safe Story Template
const Template: StoryFn<TickerProps> = (args) => <Ticker {...args} />;

// ✅ **Story: Default Ticker**
export const DefaultTicker = Template.bind({});
DefaultTicker.args = {
    data: baseMockData,
    showWalletBalance: true,
} as TickerProps;

// ✅ **Story: Ticker Without Wallet Balance**
export const NoWalletBalance = Template.bind({});
NoWalletBalance.args = {
    data: baseMockData,
    showWalletBalance: false,
} as TickerProps;

// ✅ **Story: Ticker with a High Price**
export const HighPriceTicker = Template.bind({});
HighPriceTicker.args = {
    data: {
        ...baseMockData,
        tokenPrice: 5000.75, // Higher Price
    },
    showWalletBalance: true,
} as TickerProps;

// ✅ **Story: Ticker with a Very Low Price**
export const LowPriceTicker = Template.bind({});
LowPriceTicker.args = {
    data: {
        ...baseMockData,
        tokenPrice: 0.00003421, // Very small price
    },
    showWalletBalance: true,
} as TickerProps;

// ✅ **Story: Ticker with No Market Cap**
export const NoMarketCap = Template.bind({});
NoMarketCap.args = {
    data: {
        ...baseMockData,
        marketCap: 0,
    },
    showWalletBalance: true,
} as TickerProps;

// ✅ **Story: Manual Price Change (Ensures UI updates with price flashing)**
export const ManualPriceTest: StoryFn<typeof Ticker> = () => {
    const [tickerData, setTickerData] = useState<TickerData>(baseMockData);

    const changePrice = () => {
        setTickerData((prevData) => {
            const priceChange = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 0.01);
            return {
                ...prevData,
                tokenPrice: Math.max(0.01, prevData.tokenPrice + priceChange),
            };
        });
    };

    return (
        <div style={{ textAlign: "center" }}>
            <Ticker data={tickerData} showWalletBalance={true} />
            <p style={{ marginTop: "10px", fontSize: "14px", color: "#ccc" }}>
                Current Price: <strong>${tickerData.tokenPrice.toFixed(10)}</strong>
            </p>
            <button
                onClick={changePrice}
                style={{
                    marginTop: "10px",
                    padding: "6px 12px",
                    fontSize: "14px",
                    cursor: "pointer",
                    background: "#00AEEF",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                }}
            >
                Change Price 🔄
            </button>
        </div>
    );
};

// ✅ **Story: Ticker with a very long decimal token price (0.00000000002343)**
export const LongTokenPrice: StoryFn<typeof Ticker> = () => (
    <Ticker data={{ ...baseMockData, tokenPrice: 0.00000000002343 }} showWalletBalance={true} />
);

// ✅ **Story: Ticker with a rounded token price (0.234023454)**
export const RoundedTokenPrice: StoryFn<typeof Ticker> = () => (
    <Ticker data={{ ...baseMockData, tokenPrice: 0.234023454 }} showWalletBalance={true} />
);
