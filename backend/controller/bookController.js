import Book from "../model/bookModel.js"

export const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find({})
        res.status(200).json({ success: true, data: books, message: "Books fetched sucessfully" })
    } catch (error) {
        console.log("Error in fetching book", error.message)
        res.status({ success: false, messsage: "Server Error" })
    }
}

export const addBook = async (req, res) => {
    const book = req.body
    const newBook = new Book(book)
    try {
        await newBook.save()
        res.status(200).json({
            success: true, message: "Books sucessfully added", data: newBook
        })
    } catch (error) {
        console.log("Error in adding new books", error.message)
        res.status(500).json({ success: false, message: 'Server Error' })
    }
}

export const deleteBook = async (req, res) => {
    const { id } = req.params
    try {
        await Book.findByIdAndDelete(id)
        res.status(200).json({ success: true, message: "Books sucessfully deleted" })
    } catch (error) {
        console.log('Error in deleting the book', error.message)
        res.status(500).json({ success: false, message: "Server Error" })
    }
}

export const updateBook = async (req, res) => {
    const { id } = req.params
    const updatedBook = req.body
    try {
        await Book.findByIdAndUpdate(id, updatedBook, { new: true })
        res.status(200).json({ success: true, message: "Book Updated Sucessfuflly", data: updatedBook })
    } catch (error) {
        console.log("Error in updating the book", error.message)
        res.status(500).json({ success: false, message: "Server Error" })
    }
}