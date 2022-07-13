const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(morgan("dev"));
app.use(express.json());
app.use(cors({origin: "*"}))

app.use(express.static("public"));

const matchRouter = require("./routes/matchApi");

mongoose.connect(
  `mongodb+srv://admin:${process.env.MONGODB_PW}@cluster0.f5dtp.mongodb.net/?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const urls = [
];

const scrapeProduct = require("./helpers/scrapeToDB");

scrapeProduct(urls);

app.use("/matchapi", matchRouter);

app.get("/*", (req, res) => {
  if (req.path === "/") return;
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
