import type { ConvertedMarketChartData, MarketChartData } from "~/types";

export function formatDate(date: number){
  const currentDate = new Date(date);
  const day = currentDate.getDate().toString().padStart(2, "0");
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Adiciona 1 pois os meses são indexados de 0 a 11
  const year = currentDate.getFullYear();
  const hour = currentDate.getHours().toString().padStart(2, "0");
  const minute = currentDate.getMinutes().toString().padStart(2, "0");

  return `${day}/${month}/${year}, ${hour}:${minute}`;
};

export function convertArrayToObjects (
  array: MarketChartData["prices"],
): ConvertedMarketChartData[] {
  return array.map(([timestamp, price]) => ({ timestamp, price }));
};

export function findClosestTimestamp (
  arrayOfObjects: ConvertedMarketChartData[],
  targetTimestamp: number,
): ConvertedMarketChartData | null {
  let closestElement = null;
  let closestDifference = Infinity;

  for (const { timestamp, price } of arrayOfObjects) {
    const difference = Math.abs(timestamp - targetTimestamp);

    if (difference < closestDifference) {
      closestDifference = difference;
      closestElement = { timestamp, price };
    }
  }

  return closestElement || null;
};

export function getCurrentDate (str?: Date) {
  const date = str || new Date();

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export function getTimestampFromDate (dateStr: string) {
  const [datePart, timePart] = dateStr.split("T");

  const [year, month, day] = datePart.split("-").map(Number);

  const [hour, minute] = timePart.split(":").map(Number);

  const dateObject = new Date(year, month - 1, day, hour, minute);

  const dateTimestamp = Math.floor(dateObject.getTime() / 1000);
  const dateTimestampLessThirtyMinutes = dateTimestamp - 1200;
  const dateTimestampMoreThirtyMinutes = dateTimestamp + 1200;


  const currentTo = dateTimestampMoreThirtyMinutes * 1000 > Date.now()
  ? dateTimestamp
  : dateTimestampMoreThirtyMinutes;

  return {
    timestamp: dateTimestamp * 1000,
    timestampMoreThirtyMinutes: currentTo,
    timestampLessThirtyMinutes: dateTimestampLessThirtyMinutes,
  };
};
