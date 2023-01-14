const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/todolistDB", {
  useNewurlParser: true,
});

const itemSchema = {
  name: String,
};
const item = mongoose.model("item", itemSchema);
let defArray = [];

app.get("/", function (req, res) {
  // rep.send(__dirname + "/index.html");
  item.find({}, function (err, foundItems) {
    res.render("list", { Day: "Today", items: foundItems });
  });
});

app.post("/delete", function (req, res) {
  var checked = req.body.check;
  console.log(checked);
  item.deleteOne({ _id: checked }, function (err) {
    if (err) {
      console.log("error");
    } else {
      console.log("deleted");
    }
  });
  res.redirect("/");
});

app.post("/", function (req, rep) {
  var it = req.body.item;
  const i = new item({
    name: it,
  });
  defArray.push(i);

  item.insertMany(defArray, function (err) {
    if (err) {
      console.log("error");
    } else {
      console.log("done");
    }
  });
  rep.redirect("/");
});

app.get("/:customeList", function(req,res){
  console.log(req.body.customeList)
})

app.get("/about", function (req, rep) {
  rep.render("about");
});
app.get("/work", function (req, rep) {
  rep.render("list", { Day: "Work-list", items: workItem });
});
app.post("/work", function (req, res) {
  let item = req.body.item;
  i.push(item);
  res.redirect("/work");
});
app.listen(3000, function () {
  console.log("server started");
});
