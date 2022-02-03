import express from "express";
const PORT = 3000;
const app = express();

app.get("/", (_, res) => {
  res.status(200).send("Hello Periodum API");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
