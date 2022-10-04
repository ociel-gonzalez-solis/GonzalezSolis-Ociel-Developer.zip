const req = require("supertest");
const app = require("../app");
const { startMongoose } = require("../db/mongoDB");

describe("Launches API", () => {
  beforeAll(async () => {
    await startMongoose();
  });
  afterAll(async () => {
    await startMongoose();
  });

  describe("Test GET /pets", () => {
    test("It should response with 200 OK", async () => {
      const res = await req(app)
        .get(`/api/v1/pets`)
        .expect("Content-Type", /json/)
        .expect(200);
      return res;
    });
  });

  describe("Test POST /pet", () => {
    const completePetData = {
      name: "Juan",
      tag: "Fish",
    };

    const completePetDataWithInvalidTag = {
      name: "Josh",
      tag: false,
    };

    const launchDataWithoutName = {
      tag: "Fish",
    };

    test("It should response with 201 created", async () => {
      const res = await req(app)
        .post(`/api/v1/pets`)
        .send(completePetData)
        .expect("Content-Type", /json/)
        .expect(201);

      return res;
    });

    test("It should catch missing required properties", async () => {
      const res = await req(app)
        .post(`/api/v1/pets`)
        .send(launchDataWithoutName)
        .expect("Content-Type", /json/)
        .expect(400);

      expect(res.body).toStrictEqual({
        error: "Missing data",
      });
      return res;
    });

    test("It should catch invalid tags", async () => {
      const res = await req(app)
        .post(`/api/v1/pets`)
        .send(completePetDataWithInvalidTag)
        .expect("Content-Type", /json/)
        .expect(400);

      expect(res.body).toStrictEqual({
        message: "Invalid data",
      });
      return res;
    });
  });
});
