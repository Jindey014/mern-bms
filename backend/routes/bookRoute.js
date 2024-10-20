import express from "express"
import Book from "../model/bookModel.js"
import { addBook, deleteBook, getAllBooks, getBook, updateBook } from "../controller/bookController.js"

const router = express.Router()

router.get("/", getAllBooks)

router.get("/:id", getBook)

router.post("/", addBook)

router.delete("/:id", deleteBook)

router.put("/:id", updateBook)

export default router