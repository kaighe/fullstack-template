import express from "express";
import * as dotenv from "dotenv";
import { Database } from "./database/sqlite";
import * as route from "./routes";
import { Authenticate } from "./middleware/authenticate";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
app.use(cookieParser());
app.db = new Database({
    path: "main.db",
    startup_script: "src/database/startup.sql",
});

app.get("/login", route.Login);
app.get("/create_account", route.CreateAccount);
app.get("/notes", Authenticate, route.Notes);
app.get("/delete_note", Authenticate, route.DeleteNote);

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Listening on port ${process.env.SERVER_PORT}`)
})