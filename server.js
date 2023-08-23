const express = require("express");
const app = express();

require("dotenv").config();

let dbConnect = require("./dbConnect");

const Models = require("./models");
const Seeds = require("./seeds");

//moved init calls to here in order to async await create table, and then run seeds
async function init() {
  await Models.User.sync();
  // await Seeds.Users.seedUsers()
  await Models.Movie.sync();
  // await Seeds.Movies.seedMovies();
}

init();

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const movieRoutes = require('./routes/movieRoutes')

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes)

app.get("/", (req, res) => {
  res.json({ message: "Hello world!" });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is up and running on port: ${PORT}`);
});
