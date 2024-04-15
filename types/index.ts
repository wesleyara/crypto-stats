export interface MarketChartData {
  prices:        Array<number[]>;
  market_caps:   Array<number[]>;
  total_volumes: Array<number[]>;
}

export interface ConvertedMarketChartData {
  timestamp: number;
  price: number;
}

export interface GetCurrentPriceProps {
  coin_id: string;
  toast: any;
  dateStr?: string;
}

export interface GetCurrentPriceResponse extends ConvertedMarketChartData {
  coin_id: string;
  error?: string | null;
}