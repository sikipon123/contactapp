const express = require("express");
const { MongoClient, ObjectID } = require("mongodb");

const assert = require("assert");
const mongoUrl = "mongodb://localhost:27017";
const dataBase = "first-api";
const app = express();
app.use(express.json());

MongoClient.connect(mongoUrl, { useUnifiedTopology: true }, (err, client) => {
  err
    ? assert.equal(null, err, "cant connect")
    : console.log("db connected...");
  const dataB = client.db(dataBase);

  app.get("/users", (req, res) => {
    dataB
      .collection("users")
      .find()
      .toArray((err, data) =>
        err ? console.log(`can't find data`) : res.send(data)
      );
  });
  app.post("/newUser", (req, res) => {
    let newUser = req.body;
    dataB
      .collection("users")
      .insertOne(newUser, (err, data) =>
        err ? console.log(`can't add data`) : res.send(data)
      );
  });
  app.delete("/deleteUser/:id", (req, res) => {
    const user = req.params.id;
    dataB
      .collection("users")
      .deleteOne({ _id: ObjectID(user) }, (err, data) =>
        err ? console.log("cant delete") : res.send(data)
      );
  });
  app.put("/editUser/:id", (req, res) => {
    const id = req.params.id;
    dataB
      .collection("users")
      .findOneAndUpdate(
        { _id: ObjectID(id) },
        { $set: req.body },
        (err, data) => (err ? console.log("error editing") : res.send(data))
      );
  });
});

app.listen(4000, err =>
  err ? console.log("Error running") : console.log("server runnig in prot 4000")
);
