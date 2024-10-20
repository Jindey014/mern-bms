import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import Book from "./model/bookModel.js"
import bookRouter from './routes/bookRoute.js'
import path from 'path'

dotenv.config()
const app = express()
app.use(express.json())

const port = process.env.PORT || 5000;

app.use("/api/books", bookRouter)

const __dirname = path.resolve()
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "frontend/dist")))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
    })
}

//get all books
// app.get("/api/books", )

//add book
// app.post("/api/books", )

//delete book 
// app.delete("/api/books/:id", )

//update book
// app.put("/api/books/:id", )


app.listen(port, () => {
    connectDB()
    console.log(`Server is running on ${port}`)
})

