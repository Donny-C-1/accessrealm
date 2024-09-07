import mongoose from "mongoose";
const Schema = mongoose.Schema;

const user = new Schema({
  firstname: String,
  lastname: String,
  displayname: String,
  email: String,
  role: String,
  hash: Buffer,
  salt: Buffer
});

export default mongoose.model("user", user);
