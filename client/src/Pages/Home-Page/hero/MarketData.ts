export interface MarketData {
    data: {
      markets: number;
      active_cryptocurrencies: number;
      market_cap_change_percentage_24h_usd: number;
      total_market_cap: {
        usd: number;
      };
      total_volume: {
        usd: number;
      };
    };
  }
  
  export const baseState = {
    data: {
        markets: 0,
        active_cryptocurrencies: 0,
        market_cap_change_percentage_24h_usd: 0,
        total_market_cap: {
            usd: 0
        },
        total_volume: {
            usd: 0
        },
    }
}

