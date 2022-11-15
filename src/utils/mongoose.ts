import { connect, connection } from "mongoose";
const { MONGODB_URL } = process.env;

console.log(MONGODB_URL)

const conn = {
  isConnected: 0
}

export const dbConnect = async () => {
  if (conn.isConnected) return;

  const db = await connect(MONGODB_URL as string);
  conn.isConnected = db.connections[0].readyState

  console.log(db.connection.db.databaseName)
};

connection.on("connected", () => {
  console.log("Mongodb is connected");
});

connection.on("error", (err) => {
  console.log(err);
});
