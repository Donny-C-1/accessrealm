import { connect as _connect } from "mongoose";

const connectDB = async () => {
  try {
    const connect = await _connect(process.env.MONGODB_URI);
    console.log(
      "Database Connected: ",
      connect.connection.host,
      connect.connection.name
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export default connectDB;
