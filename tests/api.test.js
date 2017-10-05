const request = require("supertest");
const app     = require("../server");

//testing get call to "/"
describe("GET /", function() {
  test("Should get 200 response successfully", function() {
    return request(app)
    .get("/api/")
    .expect(200)
    .set({"Authorization": "Basic YmVybmllOmJlcm5pZQ=="})
  })
});

describe("GET /home", function() {
  test("Should get 200 response and data",
  function() {
    return request(app)
    .get('/api/home')
    .expect(200)
    .set({"Authorization": "Basic YmVybmllOmJlcm5pZQ=="})
    .then(function(res) {
      expect(res.body).toHaveProperty("status")
      expect(res.body.status).toBe("Success")
      expect(res.body).toHaveProperty("data")
      expect(res.body.data).toBeTruthy()
    })
  })
});

describe("POST /newdeck", function() {
  test("Should create deck",
  function() {
    return request(app)
    .post("/api/newdeck")
    .type("form")
    .send({
      name: "Test Deck"
    })
    .set({"Authorization": "Basic YmVybmllOmJlcm5pZQ=="})
    .then(function(res) {
      expect(res.body).toHaveProperty("status")
      expect(res.body.status).toBe("Success")
      expect(res.body).toHaveProperty("data")
      expect(res.body.data).toBeTruthy()
    })
  })
});
