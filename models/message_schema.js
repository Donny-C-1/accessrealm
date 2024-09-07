import mongoose from "mongoose";
import { Schema } from "mongoose";

const message = new Schema({
  title: String,
  content: String,
  author: String,
  createdOn: Date
});

export default mongoose.model("message", message);
