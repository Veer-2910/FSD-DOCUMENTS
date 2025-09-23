const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index", { error: null });
});

app.post("/calculate", (req, res) => {
  const n1 = parseFloat(req.body.source1);
  const n2 = parseFloat(req.body.source2);

  if (isNaN(n1) || isNaN(n2) || n1 < 0 || n2 < 0) {
    return res.render("index", {
      error: "Please enter valid non-negative numbers.",
    });
  }

  res.render("result", { n1, n2, total: n1 + n2 });
});

app.listen(3000, () => console.log("http://localhost:3000"));
