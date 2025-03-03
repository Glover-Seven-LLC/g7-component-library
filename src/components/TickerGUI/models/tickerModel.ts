/**
 * Represents data for a token ticker in a trading pair along with related market and chain information.
 *
 * @interface TickerData
 *
 * @property {TokenData} tokenPrimary - Primary token information in the trading pair.
 * @property {TokenData} tokenPair - Pair token information in the trading pair.
 * @property {string} tokenPairContract - Contract address for the token pair.
 * @property {string} chainName - Name of the blockchain the token resides on.
 * @property {string} chainLogo - Logo of the blockchain.
 * @property {number} tokenPrice - Price of the primary token in the trading pair.
 * @property {number} liquidity - Liquidity available for the token on the market.
 * @property {number} circulatingMarketCap - Market capitalization based on circulating supply of the token.
 * @property {number} marketCap - Total market capitalization of the token.
 * @property {number} userTokenBalance - User's balance of the primary token.
 * @property {Object} [socialLinks] - Social media and online presence links for the token or project.
 * @property {string} [socialLinks.x] - Link to the X (formerly Twitter) account.
 * @property {string} [socialLinks.telegram] - Link to the Telegram group.
 * @property {string} [socialLinks.email] - Contact email address.
 * @property {string} [socialLinks.discord] - Link to the Discord channel.
 * @property {string} [socialLinks.instagram] - Link to the Instagram profile.
 * @property {string} [socialLinks.medium] - Link to the Medium blog.
 * @property {string} [socialLinks.website] - Official website URL.
 * @property {string} [socialLinks.youtube] - Link to the YouTube channel.
 * @property {string} [socialLinks.github] - Link to the GitHub repository or profile.
 * @property {string} [socialLinks.reddit] - Link to the Reddit community or page.
 */
export interface TickerData {
    tokenPrimary: TokenData;
    tokenPair: TokenData;
    tokenPairContract: string;
    chainName: string;
    chainLogo: string;
    tokenPrice: number;
    liquidity: number;
    circulatingMarketCap: number;
    marketCap: number;
    userTokenBalance: number;
    socialLinks?: {
        x?: string;
        telegram?: string;
        email?: string;
        discord?: string;
        instagram?: string;
        medium?: string;
        website?: string;
        youtube?: string;
        github?: string;
        reddit?: string;
    };
}


/**
 * Represents the data structure for a token.
 *
 * This interface defines the essential attributes related to a token including its
 * image, name, symbol, contract address, chain ID, and contract information URL.
 *
 * Properties:
 * - `tokenImageURL`: A string URL representing the image of the token.
 * - `tokenName`: The name of the token.
 * - `tokenSymbol`: The symbol or abbreviation of the token.
 * - `tokenContract`: The address of the token's contract.
 * - `tokenChain`: The chain ID where the token resides.
 * - `tokenContractInfoUrl`: A URL providing detailed information about the token's contract.
 */
export interface TokenData {
    tokenImageURL: string; // https://storage.googleapis.com/pepperbird-www/images/tokens/100BY100/pepperbird_coin_logo_100x100.png
    tokenName: string; // Pepperbird
    tokenSymbol: string; //PBIRD
    tokenContract: string; // 0x77Ad5F358CD673FCA1673e20E928B3CcADC84706
    tokenChain: number; // 56
    tokenContractInfoUrl: string // https://bscscan.com/token/0x77Ad5F358CD673FCA1673e20E928B3CcADC84706#code
}

/**
 * Represents a ticker model that manages and tracks updates to ticker data.
 */
export class TickerModel {
    private data: TickerData;
    private previousPrice: number;

    constructor(initialData: TickerData) {
        this.data = initialData;
        this.previousPrice = initialData.tokenPrice;
    }

    updateData(newData: Partial<TickerData>) {
        if (newData.tokenPrice !== undefined) {
            this.previousPrice = this.data.tokenPrice;
        }
        this.data = { ...this.data, ...newData };
    }

    getData() {
        return this.data;
    }

    getPriceChangeDirection(): "up" | "down" | "neutral" {
        if (this.data.tokenPrice > this.previousPrice) return "up";
        if (this.data.tokenPrice < this.previousPrice) return "down";
        return "neutral";
    }
}
