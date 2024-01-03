import path from 'path';
import express from "express";

const app = express();

const __dirname = path.resolve();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "src", "public", "views"));
app.use(express.static(path.join(__dirname, "src", "public")));  // 수정된 부분

app.get("/", (req, res) => res.render("home.pug"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);
app.listen(3000, handleListen);
