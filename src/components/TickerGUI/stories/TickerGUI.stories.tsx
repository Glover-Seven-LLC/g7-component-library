import { Meta, StoryFn } from "@storybook/react";
import React, { useState } from "react";
import { TickerData } from "../models/tickerModel";
import Ticker from "../components/Ticker";

// ✅ **Component Metadata**
const meta: Meta<typeof Ticker> = {
    title: "Tickers/TickerGUI",
    component: Ticker,
    parameters: {
        layout: "centered",
    },
};
export default meta;

// ✅ **Base Mock Data**
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
    userTokenBalance: 100034543535,
    socialLinks: {
        x: "https://twitter.com/pepperbird",
        telegram: "https://t.me/pepperbird",
        website: "https://pepperbird.com",
        youtube: "https://youtube.com/pepperbird",
        github: "https://github.com/pepperbird",
    },
};

// ✅ **Story: Ticker WITHOUT Wallet Balance**
export const NoWalletFeature: StoryFn<typeof Ticker> = () => <Ticker data={baseMockData} showWalletBalance={false} />;

// ✅ **Story: Ticker WITH Wallet Balance**
export const WithWalletFeature: StoryFn<typeof Ticker> = () => (
    <Ticker data={{ ...baseMockData, userTokenBalance: 1000 }} showWalletBalance={true} />
);

// ✅ **Story: Ticker WITH Wallet Feature ON, but ZERO Balance (Wallet section hidden)**
export const WithZeroWallet: StoryFn<typeof Ticker> = () => (
    <Ticker data={{ ...baseMockData, userTokenBalance: 0 }} showWalletBalance={true} />
);

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
