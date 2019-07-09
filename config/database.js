var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/reactHN", {
  userNewUrlParser: true
});

var db = mongoose.connection;

db.on("connected", function() {
  console.log(`Connected to MonogDB at ${db.host}:${db.port}`);
});
