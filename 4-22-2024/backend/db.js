const mysql = require("mysql2/promise");
const db = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "Hiroshima9!",
  database: "secoms319",
});
module.exports = db;
const express = require("express");
const db = require("./db.js");
const cors = require("cors");
const app = express();
const PORT = 4000;
app.use(cors());
app.use(express.json());
//app.use(express.static("public"));
//app.use("/images", express.static("images"));
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

app.get("/catalog", async (req, res) => {
  try {
    const query = "SELECT * FROM fakestore_catalog";
    const [result] = await db.query(query); // Execute the query and wait for the result
    console.log("Success in Reading MySQL");
    res.status(200).send(result); // Send the results as the response
  } catch (err) {
    // If an error occurs, catch it and send an appropriate error response
    console.error("Error in Reading MySQL :", err);
    res.status(500).send({ error: "An error occurred while fetching items." });
  }
});

app.get("/catalog/:id", async (req, res) => {
  try {
    // Read id from frontend
    const id = req.params.id;
    const query = "SELECT * FROM fakestore_catalog WHERE id = ?";
    const [result] = await db.query(query, [id]); // Ensure to use array for parameters even if it's just one
    console.log("Success in Reading MySQL");
    res.status(200).send(result);
  } catch (err) {
    // If an error occurs, catch it and send an appropriate error response
    console.error("Error in Reading MySQL :", err);
    res.status(500).send({ error: "An error occurred while fetching items." });
  }
});

app.get("/catalog/:category", async (req, res) => {
  try {
    // Read category from frontend
    const category = req.params.category;
    const query = "SELECT * FROM fakestore_catalog WHERE category = ?";
    const [result] = await db.query(query, [category]); // Ensure to use array for parameters even if it's just one
    console.log("Success in Reading MySQL");
    res.status(200).send(result);
  } catch (err) {
    // If an error occurs, catch it and send an appropriate error response
    console.error("Error in Reading MySQL :", err);
    res.status(500).send({ error: "An error occurred while fetching items." });
  }
});
