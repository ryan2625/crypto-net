export interface CoinData2 {
    image: {
        large: string;
    };
    name: string;
    symbol: string;
    market_data: {
        current_price: {
            usd: number;
        };
        price_change_percentage_24h: number;
        high_24h: {
            usd: number;
        };
        low_24h: {
            usd: number;
        };
        total_volume: {
            usd: number;
        };
        market_cap: {
            usd: number;
        };
        circulating_supply: number;
    };
    links: {
        homepage: string[];
        whitepaper: string;
        repos_url: {
            github: string[];
        };
    };
    genesis_date: string;
    hashing_algorithm: string;
    description: {
        en: string;
    };
}

export const initialCoinData = {
    image: {
        large: ""
      },
      name: "",
      symbol: "",
      market_data: {
        current_price: {
          usd: 0
        },
        price_change_percentage_24h: 0,
        high_24h: {
          usd: 0
        },
        low_24h: {
          usd: 0
        },
        total_volume: {
          usd: 0
        },
        market_cap: {
          usd: 0
        },
        circulating_supply: 0,
      },
      links: {
        homepage: [],
        whitepaper: "",
        repos_url: {
          github: []
        }
      },
      genesis_date: "",
      hashing_algorithm: "",
      description: {
        en: ""
      }
}