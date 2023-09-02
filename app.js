import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import todosRoutes from "./routes/todosRoutes.js";
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = 10000;

app.use(express.json());
app.use(cors());

const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI)
    .then(() => console.log("Connected to MongoDB"))
    .catch(console.error);

app.use("/todos", todosRoutes);

app.listen(port, () => {
    console.log("Listening on port", port);
});