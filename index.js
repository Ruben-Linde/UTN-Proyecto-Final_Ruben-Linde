require("./config/mongo");
const path = require('path');
const express = require("express");
const session = require("express-session");
const auth = require("./helpers/auth");
const hbs = require("express-handlebars");

const app = express();

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));

app.engine("hbs", hbs.engine({ extname:"hbs" }));
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "hbs");

app.use(express.static(path.join(__dirname, "/public")));


app.use(express.json());
app.use(express.urlencoded({ extended: false })); 


app.get("/", (req, res) => {
    res.render("home", { user: req.session.user });
});
app.get("/secret", auth, (req, res) => {
    res.render("secret", { user: `${req.session.user.name} ${req.session.user.lastName}`, id: req.session.user.id })
});
app.get("/noauth", (req, res) => {
    res.render("noAuth")
});
app.use("/users", require("./routes/usersRt"));

app.listen(8080, () => {
    console.log('server running on http://localhost:8080');
});