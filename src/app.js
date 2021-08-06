const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const log = console.log;

//define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//for dynamic files
//setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

const info = {
  title: "Weather",
  author: "himani",
};

app.get("", (req, res) => {
  res.render("index", info);
});

app.get("/about", (req, res) => {
  res.render("about", {
    ...info,
    title: "About",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    ...info,
    title: "Help",
    msg: "Need Help?",
  });
});

app.get("/weather", (req, res) => {
  log(req.query);
  if (!req.query.address) {
    return res.send({
      error: "You must provide a address term",
    });
  }
  geocode(req.query.address, (error, geocodeData = {}) => {
    //log(error);
    if (error === null) {
      const lat = Number.parseFloat(geocodeData.latitude).toPrecision(8);
      const long = Number.parseFloat(geocodeData.longitute).toPrecision(8);
      forecast(lat, long, (error, forecastdata) => {
        if (error === null) {
          res.send({
            location: geocodeData.location,
            forecast: forecastdata,
            address: req.query.address,
          });
        } else res.send({ error });
      });
    } else res.send({ error });
  });
  // res.send({
  //   weather: 45,
  //   forcast: "sunny",
  //   address: req.query.address,
  // });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    ...info,
    title: "404",
    message: "Help article not found.",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    ...info,
    title: "404",
    message: "Page not found",
  });
});

app.listen(3000, () => log("welcome"));
