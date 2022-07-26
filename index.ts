import express, { Express } from "express";
import dotenv from "dotenv";
import path from "path";

import newsRouter from "./routes/newsy";
import keysRouter from "./routes/keywords";

dotenv.config();

const app: Express = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use("/newsy", newsRouter);
app.use("/keywords", keysRouter);

app.listen(5000, () => {
    console.log("Running the News");
});