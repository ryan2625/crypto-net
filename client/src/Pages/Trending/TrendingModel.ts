export interface NFT {
    thumb: string;
    name: string;
    symbol: string;
    floor_price_24h_percentage_change: number;
    h24_average_sale_price: string;
    floor_price: string;
    data: {
        floor_price: string;
        floor_price_in_usd_24h_percentage_change: string;
        h24_average_sale_price: string;
        h24_volume: string;
        sparkline: string;
    };
}

export interface TrendingInt {
    item: {
        id: string;
        name: string;
        score: number;
        small: string;
        market_cap_rank: number;
        symbol: string;
        data: {
            price: number;
            price_change_percentage_24h: {
                usd: number;
            }
        }
    }
}

