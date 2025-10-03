import NepaliDate from "../src/NepaliDate";

describe("NepaliDate Class", () => {
  const sampleDate = {
    year: 2082,
    month: 6,
    day: 17,
    hour: 10,
    minute: 30,
    second: 45,
  };

  it("should create a valid NepaliDate instance", () => {
    const nd = new NepaliDate(sampleDate);
    expect(nd.year()).toBe(2082);
    expect(nd.month()).toBe(6);
    expect(nd.day()).toBe(17);
    expect(nd.hour()).toBe(10);
    expect(nd.minute()).toBe(30);
    expect(nd.second()).toBe(45);
    expect(nd.isValid()).toBe(true);
  });

  it("should convert to AD and back", () => {
    const nd = new NepaliDate(sampleDate);
    const ad = nd.toAd();
    const convertedNd = NepaliDate.fromAd(ad);
    expect(convertedNd.year()).toBe(nd.year());
    expect(convertedNd.month()).toBe(nd.month());
    expect(convertedNd.day()).toBe(nd.day());
  });

  it("should format the date correctly", () => {
    const nd = new NepaliDate(sampleDate);
    const formatted = nd.format("YYYY-MM-DD HH:mm:ss");
    expect(formatted).toBe("2082-06-17 10:30:45");
  });

  it("should parse a Nepali date string", () => {
    const dateStr = "15-05-2080";
    const nd = NepaliDate.parse(dateStr);
    expect(nd.year()).toBe(2080);
    expect(nd.month()).toBe(5);
    expect(nd.day()).toBe(15);
  });

  it("should compare dates correctly", () => {
    const nd1 = new NepaliDate(sampleDate);
    const nd2 = nd1.add(4, "day");
    expect(nd1.isBefore(nd2)).toBe(true);
    expect(nd2.isAfter(nd1)).toBe(true);
    expect(nd1.isSame(nd1)).toBe(true);
  });

  it("should add and subtract days, months, years correctly", () => {
    const nd = new NepaliDate(sampleDate);

    const nd2 = nd.add(5, "day");
    expect(nd2.day()).toBe(+nd.day() + 5);

    const nd3 = nd2.subtract(5, "day");
    expect(nd3.day()).toBe(nd.day());

    const nd4 = nd.add(1, "month");
    expect(nd4.month()).toBe(+nd.month() + 1);

    const nd5 = nd.add(1, "year");
    expect(nd5.year()).toBe(+nd.year() + 1);
  });

  it("should add and subtract weeks correctly", () => {
    const nd = new NepaliDate(sampleDate);
    const nd2 = nd.add(2, "week");
    expect(nd2.day()).toBe(+nd.day() + 14);
    const nd3 = nd2.subtract(2, "week");
    expect(nd3.day()).toBe(nd.day());
  });

  it("should set and get individual units correctly", () => {
    const nd = new NepaliDate(sampleDate);
    nd.setYear(2081);
    nd.setMonth(6);
    nd.setDay(20);
    nd.setHour(12);
    nd.setMinute(15);
    nd.setSecond(0);

    expect(nd.year()).toBe(2081);
    expect(nd.month()).toBe(6);
    expect(nd.day()).toBe(20);
    expect(nd.hour()).toBe(12);
    expect(nd.minute()).toBe(15);
    expect(nd.second()).toBe(0);
  });

  it("should throw errors for invalid units", () => {
    const nd = new NepaliDate(sampleDate);
    expect(() => nd.setHour(25)).toThrow("Invalid Hour");
    expect(() => nd.setMinute(61)).toThrow("Invalid Minute");
    expect(() => nd.setSecond(61)).toThrow("Invalid Second");
  });

  it("should handle locale correctly", () => {
    const nd = new NepaliDate(sampleDate);
    expect(nd.getLocale()).toBe("en");
    nd.setLocale("np");
    expect(nd.getLocale()).toBe("np");
    nd.setLocale("invalid" as any);
    expect(nd.getLocale()).toBe("en");
  });

  it("should format the date correctly with locale", () => {
    const nd = new NepaliDate(sampleDate).setLocale("np");
    expect(nd).toBeInstanceOf(NepaliDate);
    const formatted = nd.format("YYYY-MM-DD HH:mm:ss");
    expect(formatted).toBe("२०८२-०६-१७ १०:३०:४५");
  });
});
