import express from "express";
import cors from "cors";

import books from "./routes/booksRoute";
import authors from "./routes/authorRoute";
import publishers from "./routes/publisherRoute";
import genres from "./routes/genreRoute";

const app = express();
const port: number = 3000;

// middleware //
app.use(express.json());
app.use(cors());

// route prefix
app.use("/books", books);
app.use("/authors", authors);
app.use("/publishers", publishers);
app.use("/genres", genres);

// server running
app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`);
});
