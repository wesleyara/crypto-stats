import { convertArrayToObjects, findClosestTimestamp, formatDate, getCurrentDate, getTimestampFromDate } from "../../utils";

describe("FormatService", () => {
  it("format number to currency", () => {
    const mock = [
      [1635734400000, 0.0],
      [1635820800000, 0.0],
      [1635907200000, 0.0],
      [1635993600000, 0.0],
    ];
    const object = convertArrayToObjects(mock);

    expect(object).toEqual([
      { timestamp: 1635734400000, price: 0 },
      { timestamp: 1635820800000, price: 0 },
      { timestamp: 1635907200000, price: 0 },
      { timestamp: 1635993600000, price: 0 },
    ]);
  });

  it("find closest timestamp", () => {
    const mock = [
      { timestamp: 1635734400000, price: 0 },
      { timestamp: 1635820800000, price: 0 },
      { timestamp: 1635907200000, price: 0 },
      { timestamp: 1635993600000, price: 0 },
    ];
    const object = findClosestTimestamp(mock, 1635820800000);

    expect(object).toEqual({ timestamp: 1635820800000, price: 0 });
  });

  it("get timestamp from date", () => {
    const mock = "2021-11-01T00:00";
    const object = getTimestampFromDate(mock);

    expect(object).toEqual({
      timestamp: 1635735600000,
      timestampLessThirtyMinutes: 1635734400,
      timestampMoreThirtyMinutes: 1635736800,
    });
  });

  it("get current date", () => {
    const mock = new Date("2021-11-01T00:00");
    const object = getCurrentDate(mock);

    expect(object).toEqual("2021-11-01T00:00");
  });

  it("format date", () => {
    const mock = 1635734400000;
    const object = formatDate(mock);

    expect(object).toEqual("31/10/2021, 23:40");
  });
});
