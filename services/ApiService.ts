import type { GetCurrentPriceProps, GetCurrentPriceResponse } from "~/types";
import { FormatService } from "./FormatService";

export class ApiService {
  constructor(readonly formatService = new FormatService()) {}

  getCurrentPrice = async ({
    coin_id,
    toast,
    dateStr,
  }: GetCurrentPriceProps): Promise<GetCurrentPriceResponse> => {
    try {
      if (!coin_id) {
        toast.add({ title: "error", description: "Invalid coin_id" });
        throw new Error("Invalid coin_id");
      }

      const dateString = dateStr || this.formatService.getCurrentDate();
      const {
        timestamp,
        timestampLessThirtyMinutes,
        timestampMoreThirtyMinutes,
      } = this.formatService.getTimestampFromDate(dateString);

      const currentTo =
        timestampMoreThirtyMinutes * 1000 > Date.now()
          ? timestamp / 1000
          : timestampMoreThirtyMinutes;

      const url = `https://api.coingecko.com/api/v3/coins/${coin_id}/market_chart/range?vs_currency=usd&from=${timestampLessThirtyMinutes}&to=${currentTo}`;

      const response = await fetch(url);
      const data = await response.json();

      const prices = this.formatService.convertArrayToObjects(data.prices);
      const closestPrice = this.formatService.findClosestTimestamp(
        prices,
        timestamp,
      );

      if (!closestPrice) {
        toast.add({ title: "error", description: "No data found" });
        throw new Error("No data found");
      }

      return { ...closestPrice, coin_id, error: null };
    } catch (error: any) {
      console.log(error.message);
      toast.add({ title: "error", description: error.message });
      return { timestamp: 0, price: 0, coin_id, error: error.message};
    }
  };
}
