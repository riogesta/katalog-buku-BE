import { Book } from "@prisma/client";
import { prisma } from "../../config/db";
import moment from "moment";

export const selectBook = async () => {
    return await prisma.book.findMany({
        include: {
            author: true,
            genre: true,
            publisher: true,
        },
    });
};

export const isIsbnUnique = async (isbn: string) => {
    const isExist = await prisma.book.findUnique({
        where: {
            isbn: isbn,
        },
    });

    return !isExist;
};

export const insertBook = async (newBookData: Book) => {
    return await prisma.book.create({
        data: {
            title: newBookData.title,
            slug: newBookData.slug,
            description: newBookData.description,
            isbn: newBookData.isbn,
            publishDate: moment(
                newBookData.publishDate,
                "YYYY-MM-DD"
            ).toISOString(),
            pages: newBookData.pages,
            coverUrl: newBookData.coverUrl,
            authorId: newBookData.authorId,
            genreId: newBookData.genreId,
            publisherId: newBookData.publisherId,
        },
    });
};

export const selectTitleBook = async (slugTitle: string) => {
    return await prisma.book.findFirst({
        where: {
            slug: slugTitle,
        },
        include: {
            author: true,
            genre: true,
            publisher: true,
        },
    });
};

export const updateBook = async (newBookData: Book, bookId: number) => {
    return await prisma.book.update({
        where: {
            id: bookId,
        },
        data: {
            title: newBookData.title,
            description: newBookData.description,
            isbn: newBookData.isbn,
            publishDate: newBookData.publishDate,
            pages: newBookData.pages,
            coverUrl: newBookData.coverUrl,
            authorId: newBookData.authorId,
            genreId: newBookData.genreId,
            publisherId: newBookData.publisherId,
            updateAt: moment().toISOString(),
        },
    });
};

export const deleteBook = async (bookId: number) => {
    return await prisma.book.delete({
        where: {
            id: bookId,
        },
    });
};
