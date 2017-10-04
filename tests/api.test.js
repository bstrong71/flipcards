const request = require("supertest");
const app     = require("../server");

//testing get call to "/"
describe("GET /", function() {
  test("should get object successfully", function() {
    return request(app)
      .get("/api/")
      .expect(200)
      .set({"Authorization": "Basic YmVybmllOmJlcm5pZQ=="})
      .then(function(res) {
        expect(res.body).toHaveProperty()
      })
  });
});
