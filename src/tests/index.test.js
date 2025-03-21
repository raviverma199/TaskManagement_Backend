const request = require("supertest");
const app = require("../app"); // Import your Express app

describe("Auth Route Tests", () => {
  test("GET /api/auth should return 200", async () => {
    const res = await request(app).get("/api/auth/");
    expect(res.statusCode).toBe(200);
  });
});
