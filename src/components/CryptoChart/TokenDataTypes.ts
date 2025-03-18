/**
 * Defines the structure of token metadata used in the chart.
 */
export interface TokenData {
    tokenImageURL: string;      // ✅ URL for the token's icon
    tokenName: string;          // ✅ Name of the token (e.g., "Pepperbird")
    tokenPair: string;          // ✅ Trading pair (e.g., "PBIRD/BNB")
    tokenContractURL: string;   // ✅ Link to the blockchain explorer for the contract
    currentPrice: number;       // ✅ Live token price
    backgroundImageURL: string; // ✅ Background logo for the chart
}
