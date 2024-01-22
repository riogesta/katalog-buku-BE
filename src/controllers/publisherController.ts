import { Request, Response } from "express";
import * as publisherService from "../services/publisherService";

export const getPublisher = async (req: Request, res: Response) => {
    try {
        const publishers = await publisherService.selectPublisher();
        return res.json(publishers);
    } catch (error) {
        return res.json(error);
    }
};

export const addPublisher = async (req: Request, res: Response) => {
    try {
        const publisherData = req.body;
        const publisher = await publisherService.insertPublisher(publisherData);
        return res.json(publisher);
    } catch (error) {
        return res.json(error);
    }
};

export const editPublisher = async (req: Request, res: Response) => {
    try {
        const publisherId = parseInt(req.params.id);
        const publisherData = req.body;
        const publisher = await publisherService.updatePublisher(
            publisherData,
            publisherId
        );
        return res.json(publisher);
    } catch (error) {
        return res.json(error);
    }
};

export const removePublisher = async (req: Request, res: Response) => {
    try {
        const publisherId = parseInt(req.params.id);
        await publisherService.deletePublisher(publisherId);
        return res.json({
            message: "deleted!",
        });
    } catch (error) {
        return res.json(error);
    }
};
