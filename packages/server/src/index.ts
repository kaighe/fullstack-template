import express from "express";
import * as dotenv from "dotenv";
import { Database } from "./database/sqlite.js";
import * as route from "./routes/index.js";
import { Authenticate } from "./middleware/authenticate.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.db = new Database({
    path: "main.db",
    startup_script: "src/database/startup.sql",
});

app.get("/ping", route.Ping);
app.post("/login", route.Login);
app.post("/create_account", route.CreateAccount);
app.get("/notes", Authenticate, route.Notes);
app.post("/delete_note", Authenticate, route.DeleteNote);
app.post("/add_note", Authenticate, route.AddNote);

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Listening on port ${process.env.SERVER_PORT}`)
})