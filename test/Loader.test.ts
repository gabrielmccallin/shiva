import { LoaderEvent } from '../src/LoaderEvent';
import { Loader } from '../src/Loader';

describe("LOADER", function () {
  describe("get", function () {

    xtest("get success", () => {
      expect.assertions(1);
      return Loader.get({
        url: "/"
      })
        .then(response => {
          expect(response).toBeDefined();
          // expect(true).toBe(true);
        }).catch(e => {
          expect(e).toBeDefined();
        });
      });
      
      xtest('get error', () => {
        expect.assertions(1);
        return Loader.get({
        url: "/index.html"
      }).catch((e: Error) => {
        expect(e).toBeDefined();
      });
    });

    /*
      To do: Make a server to test all the other HTTP methods?
    */
  });
});
