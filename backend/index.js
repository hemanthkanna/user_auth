const dotenv = require("dotenv");
const express = require("express");
const app = express();
const path = require("path");
const sequelize = require("./config/database");
const db = require("./model/db.index");
const Sequelize = require("sequelize");
const session = require("express-session");

dotenv.config({ path: path.join(__dirname, "config/config.env") });

app.use(express.json());

// const userRoutes = require("./routes/user.route");

db.sequelize
  .sync({ alter: true })
  .then(() => {
    console.log(`Database connection successfully`);
  })
  .catch((err) => {
    console.log(`Database connection failure`, err);
  });

// app.use("/api/v1/user", userRoutes);

// Session middleware
const SequelizeStore = require("connect-session-sequelize")(session.Store);

app.use(
  session({
    secret: "keyboard cat",
    store: new SequelizeStore({
      db: sequelize,
      checkExpirationInterval: 15 * 60 * 1000,
      expiration: 24 * 60 * 60 * 1000
    }),
    resave: false, // we support the touch method so per the express-session docs this should be set to false
    proxy: true, // if you do SSL outside of node.
  })
);

app.get("/", (req,res,next) => {
  console.log(req.session);

  if(req.session.viewCount) {
    req.session.viewCount = req.session.viewCount + 1;
  } else {
    req.session.viewCount = 1;
  }
  res.send(`<h1>You have visited this page ${req.session.viewCount} times</h1>`)
})

app.listen(process.env.PORT, () => {
  console.log(
    `Server is listening to the PORT ${process.env.PORT} in ${process.env.ENVIRONMENT}`
  );
});
