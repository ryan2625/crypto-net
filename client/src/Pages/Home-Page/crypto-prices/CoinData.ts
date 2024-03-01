export interface CoinData {
    id: string;
    symbol: string;
    name: string;
    ath: number | null;
    ath_change_percentage: number | null;
    ath_date: string | null;
    atl: number | null;
    atl_change_percentage: number | null;
    atl_date: string | null;
    circulating_supply: number | null;
    current_price: number | bigint;
    fully_diluted_valuation: number | null;
    high_24h: number | null;
    image: string;
    last_updated: string | null;
    low_24h: number | null;
    market_cap: number | bigint;
    market_cap_change_24h: number | null;
    market_cap_change_percentage_24h: number | null;
    market_cap_rank: number | null;
    max_supply: number | null;
    price_change_24h: number | null;
    price_change_percentage_24h: number 
    roi: null | any;
    total_supply: number | null;
    total_volume: number | null;
}