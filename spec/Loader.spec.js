describe("LOADER", function () {
  describe("get", function () {

    it("✔️ get success", function (done) {
      var loader = shiva.Loader.get({
        url: "/"
      })
        .then(function (response) {
          expect(response).toBeDefined();
          done();
        });
    });

    it("✔️ get error", function (done) {
      var loader = shiva.Loader.get({
        url: "/index.html"
      })
        .catch(function (error) {
          expect(error.toString()).toEqual("Error: Not Found");
          done();
        });
    });

    /*
      To do: Make a server to test all the other HTTP methods?
    */
  });
});
