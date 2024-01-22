import { Request, Response } from "express";
import * as bookService from "../services/bookService";
import slugify from "slugify";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { validationResult } from "express-validator";

interface Book {
    id: number;
    title: string;
    slug: string;
    description: string | null;
    isbn: string;
    publishDate: Date;
    pages: number;
    coverUrl: string;
    authorId: number;
    genreId: number;
    publisherId: number;
    createAt: Date;
    updateAt: Date;
}

const slug = (text: string): string => {
    try {
        return slugify(text, {
            replacement: "-",
            lower: true,
        });
    } catch (error) {
        return "Title is required from slugify";
    }
};

export const getAllBook = async (req: Request, res: Response) => {
    try {
        // dengan params
        const books = await bookService.selectBook();
        return res.json({
            message: "Pengambilan data berhasil.",
            data: books,
        });
    } catch (error) {
        console.error(error);

        // Mengecek apakah error adalah instance dari Error
        if (error instanceof Error) {
            return res.status(500).json({
                message: "Terjadi kesalahan.",
                error: error.message, // Mengirim hanya pesan kesalahan
            });
        } else {
            // Jika bukan instance Error, bisa jadi objek atau tipe data lain
            return res.status(500).json({
                message:
                    "Terjadi kesalahan yang tidak diketahui saat menambahkan buku.",
                error: error, // Mengirim error sebagai objek atau tipe data aslinya
            });
        }
    }
};

export const getDetailBook = async (req: Request, res: Response) => {
    try {
        const slug = req.params.slug;
        const detailBook = await bookService.selectTitleBook(slug);
        return res.json({
            message: "Pengambilan data berhasil.",
            data: detailBook,
        });
    } catch (error) {
        return res.json({
            error: error,
        });
    }
};

export const addBook = async (req: Request, res: Response) => {
    const errorValidator = validationResult(req);
    if (!errorValidator.isEmpty()) {
        return res.status(400).json({
            errors: errorValidator.array(),
        });
    }

    try {
        const book = req.body;
        const bookData: Book = {
            id: book?.id,
            title: book.title,
            slug: slug(book.title),
            description: book?.description,
            isbn: book.isbn,
            publishDate: book.publishDate,
            pages: book.pages,
            coverUrl: book.coverUrl,
            authorId: book.authorId,
            genreId: book.genreId,
            publisherId: book.publisherId,
            createAt: book?.createAt,
            updateAt: book?.updateAt,
        };
        const newBook = await bookService.insertBook(bookData);
        return res.json({
            message: "Buku berhasil ditambahkan.",
            data: newBook,
        });
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            return res.status(400).json({
                error: error,
            });
        } else {
            console.error(error);
            return res.status(500).json({
                error: error,
            });
        }
    }
};

export const editBook = async (req: Request, res: Response) => {
    try {
        const bookId: number = parseInt(req.params.id);
        const bookData = req.body;
        const newData = await bookService.updateBook(bookData, bookId);
        return res.json({
            message: "Buku berhasil diperbarui.",
            data: newData,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "terjadi kesalahan saat memperbarui.",
            error: error,
        });
    }
};

export const removeBook = async (req: Request, res: Response) => {
    try {
        const bookId: number = parseInt(req.params.id);
        await bookService.deleteBook(bookId);
        return res.json({
            message: "Buku berhasil dihapus.",
        });
    } catch (error) {
        return res.status(500).json(error);
    }
};
