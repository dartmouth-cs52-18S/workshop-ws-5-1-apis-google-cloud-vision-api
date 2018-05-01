const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const vision = require("@google-cloud/vision");
const client = new vision.ImageAnnotatorClient();
require("dotenv").config();

app.use(bodyParser.json());

app.post("/upload", upload.single("myImage"), function(req, res) {
  client
    .webDetection(req.file.buffer)
    .then(results => {
      const webDetection = results[0].webDetection;
      var identification = { breed: webDetection.webEntities[0].description };
      console.log(webDetection.webEntities[0].description);
      res.json(webDetection.webEntities[0].description);
    })
    .catch(err => {
      console.error("ERROR:", err);
    });
});

app.listen(3001);
