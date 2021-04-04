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
  const data = {
    pid: "",
    destination: "",
    hop: [],
    close: "",
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
      console.log(data);
    });

  try {
    tracer.trace(url);
  } catch (ex) {
    console.log(ex);
  }

  return new Promise((resolve) => {
    setTimeout(function () {
      resolve(data);
    }, 10000);
  });
}

app.post("/", async function (req, res) {
  const urlValue = req.body.url;

  let data = {
    domainDetails: {},
    traceRoute: {},
  };

  const API =
    "http://api.ipstack.com/" + urlValue + "?access_key=" + process.env.API_KEY;

  const domain = await axios.get(API);
  data.domainDetails = domain.data;

  data.traceRoute = await tracert(urlValue);

  console.log(data);
  res.send(data);
});

app.listen(PORT, function () {
  console.log("App is running successfully on port 3000!");
});