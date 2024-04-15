import { ApiService } from "../../services/ApiService";

describe("ApiService", () => {
  const apiService = new ApiService();

  it("get current price for a coin", async () => {
    const users = await apiService.getCurrentPrice({ coin_id: "bitcoin" });

    expect(users).toMatchObject({
      timestamp: expect.any(Number),
      price: expect.any(Number),
      coin_id: expect.any(String),
    });
  });
});
