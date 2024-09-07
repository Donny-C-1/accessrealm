import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";

function sessionMiddleware() {
  const sessionStore = MongoStore.create({
    client: mongoose.connection.getClient(),
    dbName: process.env.DB_NAME
  });

  const sessionConfig = session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 14 }
  });
  return sessionConfig;
}

export default sessionMiddleware;
