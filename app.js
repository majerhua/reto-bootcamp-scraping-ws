const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;
const express = require("express");

const app = express();

const port = process.env.PORT || 4000;

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: false, limit: "20mb" }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

mongoose.connect(
  "mongodb+srv://javier:123@cluster0.cdkll.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const db = mongoose.connection;

var Postulant = Schema({
  basicProfile: {
    name: String,
    about: String,
    resumen: String,
  },
});

var modelPostulant = mongoose.model("postulants", Postulant);

app.get("/api/postulante/listar", function (req, res) {
  modelPostulant.find({}, (err, postulants) => {
    if (err) res.status(500).json(err);
    res.status(200).json({ success: true, postulants });
  });
});

app.post("/api/postulante/registro", function (req, res) {
  var body = req.body;

  modelPostulant.create(body, (err, postulants) => {
    if (err) res.status(500).json(err);
    res.status(200).json({ success: true });
  });
});

app.listen(port, function () {
  console.log(`Corriendo en el puerto ${port}`);
});
