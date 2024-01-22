import express, { Request, Response } from "express";
import * as authorController from "../controllers/authorController";

const authors = express.Router();

authors.get("/", authorController.getAuthor);
authors.post("/", authorController.addAuthor);
authors.patch("/:id", authorController.editAuthor);
authors.delete("/", authorController.removeAuthor);

export default authors;
