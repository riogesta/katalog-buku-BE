import express from "express";
import * as bookController from "../controllers/bookController";
import { bookValidator } from "../validators/bookValidator";

const books = express.Router();

books.get("/", bookController.getAllBook);
books.get("/:slug", bookController.getDetailBook);
books.post("/", bookValidator, bookController.addBook);
books.patch("/:id", bookController.editBook);
books.delete("/:id", bookController.removeBook);

export default books;
