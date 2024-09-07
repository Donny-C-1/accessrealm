import express from "express";
import dotenv from "dotenv";
import router from "./routes/indexRouter.js";
import passport from "passport";
import passportConfig from "./config/passport.js";
import session from "./config/session.js";
import databaseConfig from "./config/database.js";

const app = express();

// Configure Settings
app.set("view engine", "pug");
app.set("views", "views");
dotenv.config();
passportConfig();
databaseConfig();

// Apply Middlewares
app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));

app.use(session());

app.use(passport.authenticate("session"));

// Router Middleware
app.use(router);

app.listen(process.env.PORT, (_) =>
  console.log("Listening at port: ", process.env.PORT)
);
