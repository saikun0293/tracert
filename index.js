//SERVER
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Traceroute = require("nodejs-traceroute");
const axios = require("axios");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

async function tracert(url) {
  let flag = false;
  const data = {
    pid: "",
    destination: "",
    hop: [],
    code: null,
  };

  const tracer = new Traceroute();
  tracer
    .on("pid", (pid) => {
      console.log(`pid: ${pid}`);
      data.pid = pid;
    })
    .on("destination", (destination) => {
      console.log(`destination: ${destination}`);
      data.destination = destination;
    })
    .on("hop", (hop) => {
      console.log(`hop: ${JSON.stringify(hop)}`);
      data.hop.push(JSON.stringify(hop));
    })
    .on("close", (code) => {
      console.log(`close: code ${code}`);
      data.code = code;
      flag = true;
    });

  try {
    tracer.trace(url);
  } catch (ex) {
    console.log(ex);
  }

  return new Promise((resolve) => {
    (function waitForTracert() {
      if (flag) return resolve(data);
      setTimeout(waitForTracert, 30);
    })();
  });
}

app.post("/domain", async function(req, res) {
  const urlValue = req.body.url;

  let domainDetails = {};

  const API =
    "http://api.ipstack.com/" + urlValue + "?access_key=" + process.env.API_KEY;

  const domain = await axios.get(API);
  domainDetails = domain.data;

  res.send(domainDetails);
});

app.post("/route", async function(req, res) {
  let traceRoute = {};
  const urlValue = req.body.url;
  traceRoute = await tracert(urlValue);

  console.log(traceRoute);
  res.send(traceRoute);
});

app.listen(PORT, function() {
  console.log("App is running successfully on port 3000!");
});
