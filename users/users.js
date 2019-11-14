const express = require("express");
const router = express.Router();
const db = require("./usersModel");

router.get("/", async (req, res) => {
  try {
    let result = await db.find();
    res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({
        error: `An error occurred while retrieving your data. ${error}`
      });
  }
});

router.get("/:name", async (req, res) => {
  try {
    const name = req.params.name;
    let result = await db.findByName(name);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(400).json({ message: "that gadget does not exist" });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        error: `An error occurred while retrieving your data. ${error}`
      });
  }
});

router.post("/", async (req, res) => {
  try {
    const user = req.body;
    let result = await db.insert(user);
    res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({
        error: `An error occurred while retrieving your data. ${error}`
      });
  }
});

router.delete("/:name", async (req, res) => {
  try {
    const name = req.params.name;
    await db.remove(name);
    res.status(200).json({ message: "successful" });
  } catch (error) {
    res
      .status(500)
      .json({
        error: `An error occurred while retrieving your data. ${error}`
      });
  }
});

module.exports = router;
