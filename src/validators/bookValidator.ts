import { body } from "express-validator";
import { isIsbnUnique } from "../services/bookService";
import moment from "moment";

export const bookValidator = [
    body("title").notEmpty().withMessage("Title is required."),
    body("isbn")
        .notEmpty()
        .custom(async (isbn) => {
            const isUnique = await isIsbnUnique(isbn);
            if (!isUnique) {
                throw new Error("ISBN must unique!");
            }
            return true;
        }),
    body("publishDate").custom(async (date: string | null) => {
        if (date == "" || date === undefined) {
            throw new Error("Date is required.");
        }
        if (moment(date, moment.ISO_8601, true)) {
            throw new Error("Format date not valid.");
        }
    }),
    body("pages").custom(async (pages: number | null) => {
        if (pages === null) {
            throw new Error("Pages is required.");
        }

        if (pages <= 20) {
            throw new Error("pages must 20 or more.");
        }
    }),
];
