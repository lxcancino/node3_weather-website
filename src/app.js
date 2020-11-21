const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config */
const publicDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory
app.use(express.static(publicDirectory));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather APP",
    name: "Ruben Cancino Ramos",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "Weather APP",
    name: "Ruben Cancino Ramos",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Weather APP",
    name: "Ruben Cancino Ramos",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Weather APP",
    name: "Ruben Cancino Ramos",
    message: "Help article not found",
  });
});

app.get("/weather", (req, res) => {
  const { address } = req.query;

  if (!address) {
    return res.send({
      error: "You mous provide an address",
    });
  }

  geocode(address, (error, { location, latitud, longitud } = {}) => {
    if (error) {
      return res.send({
        error,
      });
    }

    forecast(latitud, longitud, (err, fc) => {
      if (err) {
        return res.send({
          error: err,
        });
      }
      return res.send({
        forecast: fc,
        location,
        address,
      });
    });
  });
});

app.get("/products", (req, res) => {
  const { search, ratings } = req.query;
  if (!search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log("Params: ", search, ratings);
  res.send({
    products: {},
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Weather APP",
    name: "Ruben Cancino Ramos",
    message: "Page not found",
  });
});

app.listen(port, () => {
  console.log("Server is up on port:" + port);
});
