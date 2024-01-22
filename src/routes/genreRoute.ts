import express from "express";
import * as genreController from "../controllers/genreController";

const genres = express.Router();

genres.get("/", genreController.getGenre);
genres.post("/", genreController.addGenre);
genres.patch("/:id", genreController.editGenre);
genres.delete("/:id", genreController.removeGenre);

export default genres;
