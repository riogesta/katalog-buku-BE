import { Request, Response } from "express";
import * as authorService from "../services/authorService";

export const getAuthor = async (req: Request, res: Response) => {
    try {
        const authors = await authorService.selectAuthor();
        return res.json(authors);
    } catch (error) {
        return res.json(error);
    }
};

export const addAuthor = async (req: Request, res: Response) => {
    try {
        const authorData = req.body;
        const author = await authorService.insertAuthor(authorData);
        return res.json(author);
    } catch (error) {
        console.error(error);
        return res.json(error);
    }
};

export const editAuthor = async (req: Request, res: Response) => {
    try {
        const authorId = parseInt(req.params.id);
        const authorData = req.body;
        const author = await authorService.updateAuthor(authorData, authorId);
        return res.json(author);
    } catch (error) {
        return res.json(error);
    }
};

export const removeAuthor = async (req: Request, res: Response) => {
    try {
        const authorId = parseInt(req.params.id);
        await authorService.deleteAuthor(authorId);
        return res.json({
            message: "deleted!",
        });
    } catch (error) {
        return res.json(error);
    }
};
