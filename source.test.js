const { testFunction , increment , decrement , calcPictureWidth } = require("./src/js/source.js");

test("testing normal step", () => {
    expect(increment(5, 10)).toBe(6);
});

test("edge case forward", () => {
    expect(increment(10, 10)).toBe(0);
});

test("nandle errors", () => {
    expect(increment(15, 10)).toBe(0)
});

test("testing normal step", () => {
    expect(decrement(5, 10)).toBe(4)
});

test("edge case backward", () => {
    expect(decrement(0, 10)).toBe(10)
});

test("nandle errors", () => {
    expect(decrement(15, 10)).toBe(0)
});

test("calculate percentage width of picture in a 1 picture gallery", () => {
    expect(calcPictureWidth(1)).toBe(99);
});

test("calculate percentage width of picture in a 10 picture gallery", () => {
    expect(calcPictureWidth(10)).toBe(9);
});