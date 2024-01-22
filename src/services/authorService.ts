import { Author } from "@prisma/client";
import { prisma } from "../../config/db";
import moment from "moment";

export const selectAuthor = async () => {
    return await prisma.author.findMany();
};

export const insertAuthor = async (newAuthorData: Author) => {
    return await prisma.author.create({
        data: {
            name: newAuthorData.name,
        },
    });
};

export const updateAuthor = async (newAuthorData: Author, authorId: number) => {
    return await prisma.author.update({
        where: {
            id: authorId,
        },
        data: {
            name: newAuthorData.name,
            updateAt: moment().toISOString(),
        },
    });
};

export const deleteAuthor = async (authorId: number) => {
    return await prisma.author.delete({
        where: {
            id: authorId,
        },
    });
};
