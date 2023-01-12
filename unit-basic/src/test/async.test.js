const fetchProduct = require("../async.js");

describe("Async", () => {
  it("async - done", (done) => {
    fetchProduct().then((item) => {
      expect(item).toEqual({ item: "Milk", price: 200 });
      done(); // 비동기가 끝나는 시점을 알려줘야함. 테스트 실패 시 5초의 지연시간 발생, 사용하지 말자.
    });
  });

  it("async - return", () => {
    return fetchProduct().then((item) => {
      expect(item).toEqual({ item: "Milk", price: 200 });
    });
  });

  it("async - await", async () => {
    const product = await fetchProduct();
    expect(product).toEqual({ item: "Milk", price: 200 });
  });

  it("async - resolves", () => {
    return expect(fetchProduct()).resolves.toEqual({
      item: "Milk",
      price: 200,
    });
  });

  it("async - reject", () => {
    return expect(fetchProduct("error")).rejects.toBe("network error");
  });
});
