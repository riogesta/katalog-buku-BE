import express from "express";
import * as publisherController from "../controllers/publisherController";

const publishers = express.Router();

publishers.get("/", publisherController.getPublisher);
publishers.post("/", publisherController.addPublisher);
publishers.patch("/:id", publisherController.editPublisher);
publishers.delete("/:id", publisherController.removePublisher);

export default publishers;
