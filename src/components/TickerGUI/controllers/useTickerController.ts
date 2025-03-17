import { useEffect, useState } from "react";
import {TickerData, TickerModel} from "../models/tickerModel";


export function useTickerController(initialData: TickerData) {
    const [ticker, setTicker] = useState(new TickerModel(initialData));
    const [priceChange, setPriceChange] = useState<"up" | "down" | "neutral">(
        "neutral"
    );

    useEffect(() => {
        const interval = setInterval(() => {
            fetch("/api/token-price") // Replace with actual API
                .then((res) => res.json())
                .then((newData: Partial<TickerData>) => {
                    ticker.updateData(newData);
                    setTicker(new TickerModel(ticker.getData()));
                    setPriceChange(ticker.getPriceChangeDirection());
                })
                .catch(console.error);
        }, 5000); // Update every 5 seconds

        return () => clearInterval(interval);
    }, [ticker]);

    return { ticker: ticker.getData(), priceChange };
}