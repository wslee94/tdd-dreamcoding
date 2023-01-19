const ProductService = require("../product_service_no_di");
const ProductClient = require("../product_client");
jest.mock("../product_client");

/**
 * 단위 테스트는 모듈간의 상호작용까지 테스트 하는게 아니라, 딱 그 모듈 하나만 테스트 해야한다.
 * 즉 ProductService 모듈만 테스트한다. 그러기 위해서 ProductService 내부에 의존성을 가진 모듈들은 Mock으로 대체해야 한다.
 *
 * 네트워크에 의존하는 테스트는 좋지 않다. (네트워크 상태에 따라 달라질 수 있고, 반환되는 데이터가 달라질 수 있으니)
 */

describe("productClient", () => {
  const fetchItems = jest.fn(async () => [
    { item: "🥛", available: true },
    { item: "🍌", available: false },
  ]);
  ProductClient.mockImplementation(() => {
    return {
      fetchItems,
    };
  });
  let productService;

  beforeEach(() => {
    productService = new ProductService();
  });

  it("should filter out only available items", async () => {
    const items = await productService.fetchAvailableItems();
    expect(items.length).toBe(1);
    expect(items).toEqual([{ item: "🥛", available: true }]);
  });
});
