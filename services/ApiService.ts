import type { GetCurrentPriceProps, GetCurrentPriceResponse } from "~/types";
import { FormatService } from "./FormatService";

export class ApiService {
  constructor(readonly formatService = new FormatService()) {}

  getCurrentPrice = async ({
    coin_id,
    dateStr
  }: GetCurrentPriceProps): Promise<GetCurrentPriceResponse> => {
    try {
      if (!coin_id) {
        throw new Error("Invalid coin_id");
      }

      const dateString = dateStr || this.formatService.getCurrentDate();
      console.log(dateString);
      const { timestamp, timestampLessTenMinutes, timestampMoreTenMinutes } =
        this.formatService.getTimestampFromDate(dateString);

      const currentTo =
        timestampMoreTenMinutes * 1000 > Date.now()
          ? timestamp / 1000
          : timestampMoreTenMinutes;

      const url = `https://api.coingecko.com/api/v3/coins/${coin_id}/market_chart/range?vs_currency=usd&from=${timestampLessTenMinutes}&to=${currentTo}`;

      const response = await fetch(url);
      const data = await response.json();

      const prices = this.formatService.convertToObjects(data.prices);
      const closestPrice = this.formatService.findClosestTimestamp(
        prices,
        timestamp,
      );

      if (!closestPrice) {
        throw new Error("No data found");
      }

      return { ...closestPrice, coin_id };
    } catch (error) {
      console.error(error);
      return { timestamp: 0, price: 0, coin_id };
    }
  };
}
