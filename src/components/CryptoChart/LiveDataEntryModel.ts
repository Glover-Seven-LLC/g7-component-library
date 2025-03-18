/**
 * Interface for live price data entries.
 * Ensures consistency when handling live market data.
 */
export interface LiveDataEntry {
    timestamp: number; // ✅ Unix timestamp in milliseconds
    open: number;      // ✅ Open price of the asset
    high: number;      // ✅ Highest price within the time range
    low: number;       // ✅ Lowest price within the time range
    close: number;     // ✅ Closing price for the period
    volume: number;    // ✅ Trading volume during the period
}
