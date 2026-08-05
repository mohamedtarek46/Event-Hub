import mongoose from "mongoose";
import dns from "dns";

// Fix Node.js DNS resolution issue for MongoDB SRV records on certain networks/ISPs
dns.setServers(["8.8.8.8", "8.8.4.4"]);

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(
      process.env.MONGODB_CONNECTION_STRING
    );
  }

  cached.conn = await cached.promise;

  console.log("Database connected");

  return cached.conn;
};

export default connectDB;