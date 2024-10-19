import { create } from 'zustand'

export const useBookStore = create((set) => ({
    books: [],
    setBooks: (books) => set({ books }),
    createBook: async (newBook) => {
        if (!newBook.name || !newBook.author) {
            return { success: false, message: "Fill all fields" }
        }
        const res = await fetch("/api/books", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify(newBook)
        })
        const data = await res.json()
        if (!data.success) {
            return { success: false, message: data.message }
        }
        set((state) => ({ books: [...state.books, data.data] }))
        return { success: true, message: data.message }
    },
    getBooks: async () => {
        const res = await fetch("/api/books")
        const data = await res.json()
        set({ books: data.data })
    },
    deleteBook: async (pid) => {
        const res = await fetch(`/api/books/${pid}`, {
            method: "DELETE"
        })
        const data = await res.json()
        set((state) => ({ books: state.books.filter((book) => pid !== book._id) }))
        return { success: true, message: data.message }
    },
    updateBook: async (pid, updatedBook) => {
        const res = await fetch(`/api/books/${pid}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(updatedBook)
        })
        const data = await res.json()
    }
}))


