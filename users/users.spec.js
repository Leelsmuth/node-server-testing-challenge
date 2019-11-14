const Users = require("./usersModel");
const db = require("../data/dbConfig");

beforeEach(async () => {
  await db("users").truncate();
});

describe("gadgets model", () => {
  describe("find function", () => {
    let names;
    it("finds correctly", async () => {
      await Users.insert({ name: "peter" });
      names = await Users.find();
      expect(names).toHaveLength(1);
      await Users.insert({ name: "paul" });
      names = await Users.find();
      expect(names).toHaveLength(2);
    });

    it("finds by name correctly", async () => {
      await Users.insert({ name: "peter" });
      await Users.insert({ name: "paul" });
      gadgets = await Users.findByName("peter");
      expect(gadgets.name).toBe("peter");
      gadgets = await Users.findByName("paul");
      expect(gadgets.name).toBe("paul");
    });
  });

  describe("insert function", () => {
    let names;
    it("inserts correctly", async () => {
      await Users.insert({ name: "paul" });
      names = await db("users");
      expect(names).toHaveLength(1);
      await Users.insert({ name: "peter" });
      names = await db("users");
      expect(names).toHaveLength(2);
    });
  });

  describe("delete function", () => {
    let names;
    it("deletes correctly", async () => {
      await Users.insert({ name: "peter" });
      await Users.insert({ name: "paul" });
      await Users.remove("paul");
      names = await db("users");
      expect(names).toHaveLength(1);
      await Users.remove("peter");
      names = await db("users");
      expect(names).toHaveLength(0);
    });
  });
});
