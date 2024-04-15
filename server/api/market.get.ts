import axios from "axios";
import {
  convertArrayToObjects,
  findClosestTimestamp,
  getCurrentDate,
  getTimestampFromDate,
} from "~/utils";

export default defineEventHandler(async event => {
  const { date, id } = getQuery(event);

  const dateString = date || getCurrentDate();
  const { timestamp, timestampLessThirtyMinutes, timestampMoreThirtyMinutes } =
    getTimestampFromDate(dateString as string);

  const url = `https://api.coingecko.com/api/v3/coins/${id}/market_chart/range?vs_currency=usd&from=${timestampLessThirtyMinutes}&to=${timestampMoreThirtyMinutes}`;

  const response = await axios.get(url);

  const data = response.data;

  const prices = convertArrayToObjects(data.prices);
  const closestPrice = findClosestTimestamp(prices, timestamp);

  if (!closestPrice) {
    return {
      timestamp: 0,
      price: 0,
      coin_id: id,
      error: "No data found",
    };
  }

  return {
    ...closestPrice,
    coin_id: id,
    error: null,
  };
});
