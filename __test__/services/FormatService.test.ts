import { FormatService } from "../../services/FormatService";

describe("FormatService", () => {
  const formatService = new FormatService();

  it("format number to currency", () => {
    const mock = [
      [1635734400000, 0.0],
      [1635820800000, 0.0],
      [1635907200000, 0.0],
      [1635993600000, 0.0],
    ];
    const object = formatService.convertArrayToObjects(mock);

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
    const object = formatService.findClosestTimestamp(mock, 1635820800000);

    expect(object).toEqual({ timestamp: 1635820800000, price: 0 });
  });

  it("get timestamp from date", () => {
    const mock = "2021-11-01T00:00";
    const object = formatService.getTimestampFromDate(mock);

    expect(object).toEqual({
      timestamp: 1635735600000,
      timestampLessTenMinutes: 1635735000,
      timestampMoreTenMinutes: 1635736200,
    });
  });

  it("get current date", () => {
    const mock = new Date("2021-11-01T00:00");
    const object = formatService.getCurrentDate(mock);

    expect(object).toEqual("2021-11-01T00:00");
  });

  it("format date", () => {
    const mock = 1635734400000;
    const object = formatService.formatDate(mock);

    expect(object).toEqual("31/10/2021, 23:40");
  });
});
