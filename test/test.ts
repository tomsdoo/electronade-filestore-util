import { describe, it } from "mocha";
import { strict as assert } from "assert";

import { FileStore } from "../src/";

describe("FileStore class interfaces", () => {
  before(() => {
    // @ts-ignore
    globalThis.electronade = {
      filestore: {
        get: (filePath: string, id: string) =>
          Promise.resolve({ _id: id, filePath }),
        getIds: (filePath: string) => Promise.resolve(["aaa", "bbb", "ccc"]),
        save: (filePath: string, item: object) =>
          Promise.resolve({
            ...item,
            _id: "dummy",
            filePath,
          }),
        remove: (filePath: string, id: string) => Promise.resolve(undefined),
      },
    };
  });

  it("get()", async () => {
    assert.equal(
      await new FileStore("test")
        .get("dummyId")
        .then((result) => JSON.stringify(result)),
      JSON.stringify({
        _id: "dummyId",
        filePath: "test",
      })
    );
  });

  it("getIds()", async () => {
    assert.equal(
      await new FileStore("test")
        .getIds()
        .then((result) => JSON.stringify(result)),
      JSON.stringify(["aaa", "bbb", "ccc"])
    );
  });

  it("save()", async () => {
    assert.equal(
      await new FileStore("test")
        .save({ name: "test" })
        .then(({ name }) => name),
      "test"
    );
  });

  it("remove()", async () => {
    assert.equal(await new FileStore("test").remove("dummyId"), undefined);
  });
});
