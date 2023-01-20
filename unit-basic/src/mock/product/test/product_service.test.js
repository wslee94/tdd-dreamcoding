const ProductService = require("../product_service");
const StubProductClient = require("./stub_product_client");

/**
 * ProductService 내부의 의존성을 제거하고, 외부에서 주입 받도록 리팩터링했다.
 * 이럴 경우 stub를 사용하면 훨씬 간결하게 테스트 코드를 작성할 수 있다.
 * stub는 주입하는 모듈과 동일한 인터페이스를 갖는 테스트를 위한 모듈이다.
 */

describe("ProductService - Stub", () => {
  let productService;

  beforeEach(() => {
    productService = new ProductService(new StubProductClient());
  });

  it("should filter out only available items", async () => {
    const items = await productService.fetchAvailableItems();
    expect(items.length).toBe(1);
    expect(items).toEqual([{ item: "🥛", available: true }]);
  });
});
