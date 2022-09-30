import { describe, it } from "mocha";
import { strict as assert } from "assert";

import { FileStore } from "../src/";

describe("FileStore class interfaces", () => {
  before(() => {
    // @ts-expect-error
    globalThis.electronade = {
      filestore: {
        get: async (filePath: string, id: string) =>
          await Promise.resolve({ _id: id, filePath }),
        getIds: async (filePath: string) =>
          await Promise.resolve(["aaa", "bbb", "ccc"]),
        save: async (filePath: string, item: object) =>
          await Promise.resolve({
            ...item,
            _id: "dummy",
            filePath,
          }),
        remove: async (filePath: string, id: string) =>
          await Promise.resolve(undefined),
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
