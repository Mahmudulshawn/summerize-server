import { pipeline } from "@xenova/transformers";
// const express = require('express');
import express from "express";
const app = express();
const pipe = await pipeline("summarization");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
})

app.post("/summarize", async (req, res) => {
  const { article } = req.body;

  if (!article) {
    return res.status(400).json({ error: "No article provided" });
  }

  try {
    const result = await pipe(article, { max_length: 300 });
    res.json({ result });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Summarization failed", details: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
module.exports = app;