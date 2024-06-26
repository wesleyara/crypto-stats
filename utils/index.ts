import type { ConvertedMarketChartData, MarketChartData } from "~/types";

export function formatDate(date: number) {
  const currentDate = new Date(date);
  const day = currentDate.getDate().toString().padStart(2, "0");
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Adiciona 1 pois os meses são indexados de 0 a 11
  const year = currentDate.getFullYear();
  const hour = currentDate.getHours().toString().padStart(2, "0");
  const minute = currentDate.getMinutes().toString().padStart(2, "0");

  return `${day}/${month}/${year}, ${hour}:${minute}`;
}

export function convertArrayToObjects(
  array: MarketChartData["prices"],
): ConvertedMarketChartData[] {
  return array.map(([timestamp, price]) => ({ timestamp, price }));
}

export function findClosestTimestamp(
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
}

export function getTimestampFromDate(dateStr: Date) {
  const dateTimestamp = Math.floor(dateStr.getTime() / 1000);
  const dateTimestampLessOneDay = dateTimestamp - 57600;
  const dateTimestampMoreOneDay = dateTimestamp + 57600;

  const currentTo =
    dateTimestampMoreOneDay * 1000 > Date.now()
      ? dateTimestamp
      : dateTimestampMoreOneDay;

  return {
    timestamp: dateTimestamp * 1000,
    timestampMoreOneDay: currentTo,
    timestampLessOneDay: dateTimestampLessOneDay,
  };
}

export function getLastTwoWeeksTimestamp() {
  const date = new Date();
  const lastTwoWeeks = date.setDate(date.getDate() - 14);

  return {
    timestampNow: new Date().getTime() / 1000,
    timestampLastTwoWeeks: lastTwoWeeks / 1000,
  };
}

export function convertBigDataToSmallData(data: ConvertedMarketChartData[]) {
  const groupedData: any = data.reduce((acc: any, curr) => {
    const date = new Date(curr.timestamp);
    const day = date.getDate().toString().padStart(2, "0");
    const formattedDate = `${day}`;

    if (!acc[formattedDate]) {
      acc[formattedDate] = [];
    }
    acc[formattedDate].push(curr);
    return acc;
  }, {});

  const result = Object.keys(groupedData).map(date => {
    const dailyData = groupedData[date];
    const closingPrice = dailyData[dailyData.length - 1].price;
    return { day: date, price: closingPrice };
  });

  return result;
}
