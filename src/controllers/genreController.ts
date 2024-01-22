import { Request, Response } from "express";
import * as genreService from "../services/genreService";

export const getGenre = async (req: Request, res: Response) => {
    try {
        const genres = await genreService.selectGenre();
        return res.json(genres);
    } catch (error) {
        return res.json(error);
    }
};

export const addGenre = async (req: Request, res: Response) => {
    try {
        const genreData = req.body;
        const genre = await genreService.insertGenre(genreData);
        return res.json(genre);
    } catch (error) {
        return res.json(error);
    }
};

export const editGenre = async (req: Request, res: Response) => {
    try {
        const genreId = parseInt(req.params.id);
        const genreData = req.body;
        const genre = await genreService.updateGenre(genreData, genreId);
        return res.json(genre);
    } catch (error) {
        return res.json(error);
    }
};

export const removeGenre = async (req: Request, res: Response) => {
    try {
        const genreId = parseInt(req.params.id);
        await genreService.deleteGenre(genreId);
        return res.json({
            message: "deleted!",
        });
    } catch (error) {
        return res.json(error);
    }
};
