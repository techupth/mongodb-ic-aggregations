import { MongoClient } from "mongodb";
import { orders } from "./orders.js";

const connectionString = "mongodb://localhost:27017";

console.log("------- Start connecting to MongDB -------");
export const client = new MongoClient(connectionString, {
  useUnifiedTopology: true,
});

await client.connect();
console.log("------- Connecting to MongoDB Successfully -------");

const db = await client.db("practice-mongo");
console.log("------- Create database successfully -------");

try {
  await db.createCollection("tamsangOrders");
  console.log("------- Create collection successfully -------");
} catch {
  console.log("Collection already exists !");
}

const collection = db.collection("tamsangOrders");

await collection.insertMany(
  orders.map((order) => {
    return {
      ...order,
      created_date: new Date(order.created_date),
    };
  })
);

console.log("------- Insert documents successfully -------");

await client.close();
