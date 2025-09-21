const express = require("express");
const api = express.Router();
api.use(express.json());

const client = require("../integrations/mongo-db/mongo-connect");

api.get("/alive", (req, res) => {
  res.json("I am alive");
});
api.post("/log", async (req, res) => {
  try {
    await client.connect(); // Ensure connection
    const db = client.db("central_logger"); // Use your DB name
    const collection = db.collection("logs"); // Use your collection name

    const result = await collection.insertOne(req.body); // Insert log data

    res.status(200).json({ status: "success", insertedId: result.insertedId });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

module.exports = api;
