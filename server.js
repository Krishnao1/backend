const request = require("request");
const cheerio = require("cheerio");
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// data();
app.get("/", (req, res) => {
  res.send("all good");
});
app.post("/get/data", async (req, res) => {
  const url = req.body.url;
  console.log(url);

  await request(url, (error, response, html) => {
    // console.log(response);

    if (!error) {
      //   console.log(html);
      const $ = cheerio.load(html);
      const data = [];
      $(".shop_attributes tr").map((i, el) => {
        const keyof = $(el).children("th").text();
        const valuef = $(el).children("td").text();
        data.push({ keyof, valuef });
        // console.log(data);
      });
      return res.status(201).json(data);
    } else {
      // console.log(error);
    }
  });
});

app.listen(port, () => {
  console.log(`server running on ${port}`);
});
