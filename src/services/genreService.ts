import { Genre } from "@prisma/client";
import { prisma } from "../../config/db";
import moment from "moment";

export const selectGenre = async () => {
    return await prisma.genre.findMany();
};

export const insertGenre = async (newGenreData: Genre) => {
    return await prisma.genre.create({
        data: {
            name: newGenreData.name,
            description: newGenreData.description,
        },
    });
};

export const updateGenre = async (newGenreData: Genre, genreId: number) => {
    return await prisma.genre.update({
        where: {
            id: genreId,
        },
        data: {
            name: newGenreData.name,
            description: newGenreData.description,
            updateAt: moment().toISOString(),
        },
    });
};

export const deleteGenre = async (genreId: number) => {
    return await prisma.genre.delete({
        where: {
            id: genreId,
        },
    });
};
