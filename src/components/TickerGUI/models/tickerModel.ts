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
    totalSupply: number;
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


interface TokenData {
    tokenImageURL: string; // https://storage.googleapis.com/pepperbird-www/images/tokens/100BY100/pepperbird_coin_logo_100x100.png
    tokenName: string; // Pepperbird
    tokenSymbol: string; //PBIRD
    tokenContract: string; // 0x77Ad5F358CD673FCA1673e20E928B3CcADC84706
    tokenChain: number; // 56
    tokenContractInfoUrl: string // https://bscscan.com/token/0x77Ad5F358CD673FCA1673e20E928B3CcADC84706#code
}

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