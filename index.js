const express = require("express");
const nunjucks = require("nunjucks");

const app = express();

nunjucks.configure("views", {
  autoescape: true,
  express: app,
  watch: true
});

app.use(
  express.urlencoded({
    extended: false
  })
);

app.set("view engine", "njk");

const checkQueryParam = (req, res, next) => {
  req.query.age ? next() : res.send('Idade não encontrada')
}

app.get("/", (req, res) => {
  return res.render("home");
});

app.post("/check", (req, res) => {
  let {
    age
  } = req.body;

  return age >= 18 ? res.redirect(`/major?age=${age}`) : res.redirect(`/minor?age=${age}`);
});

app.get("/major", checkQueryParam, (req, res) => {
  let age = req.query.age
  return res.render("major", {
    age
  });
});

app.get("/minor", checkQueryParam, (req, res) => {
  let age = req.query.age
  return res.render("minor", {
    age
  });
});

app.listen(3000);
