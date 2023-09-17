import { writable } from "svelte/store";
import NetworkClient from "@common/utils/network_client";
import Book from "@common/models/book";
import { objectEquals, removeEmptyFilters } from "@common/utils/utils";


export function createBooks() {
    let api = new NetworkClient(API_BASE_URL);
    let previousQuery;
    let previousFilters;
    const loadStatus = writable({ loading: false, error: false })
    const selectedBooks = writable([]);

    async function queryBooks(queryText = "", filters = {}) {
        let newFilters = removeEmptyFilters(filters);
        if(queryText !== previousQuery || !objectEquals(newFilters, previousFilters)) {
            try {
                loadStatus.set({ loading: true, error: false });
                let booksData = await api.searchBooks(queryText, newFilters, { title: 1 });
                selectedBooks.set(booksData.map((bookData, index) => new Book(bookData, index)));
                loadStatus.set({ loading: false, error: false });
                previousQuery = queryText;
                previousFilters = newFilters;
            }catch(exception) {
                console.error("Error loading books: " + exception);
                loadStatus.set({ loading: false, error: true, errorMessage: exception.message });
            }
        }
    }

    async function createBook(formData) {
        let newBook = Book.fromFormData(formData);
        try {
            let createdId = await api.createBook(newBook.toRequestBody());
            selectedBooks.update((books) => [...books, Book.fromFormData(formData, createdId)]);
        }catch(exception) {
            console.error("Error creating book: " + exception);
            return { error: true, errorMessage: exception?.message };
        }
        return { error: false };
    }

    async function updateBook(index, formData) {
        let currentlySelectedBooks;
        selectedBooks.subscribe((books) => currentlySelectedBooks = books)();
        let updatedBook = Book.fromFormData(formData, currentlySelectedBooks[index].id, index);
        let diff = currentlySelectedBooks[index].getFieldsDiff(updatedBook);
        if(Object.keys(diff).length > 0) {
            try {
                await api.updateBook(updatedBook.id, diff);
                selectedBooks.update((books) => [
                    ...books.slice(0, index),
                    updatedBook,
                    ...books.slice(index + 1)
                ]);
            }catch(exception) {
                console.error("Error updating book: " + exception);
                return { error: true, errorMessage: exception?.message };
            }
        }
        return { error: false };
    }

    async function deleteBook(index) {
        let currentlySelectedBooks;
        selectedBooks.subscribe((books) => currentlySelectedBooks = books)();
        try {
            await api.deleteBook(currentlySelectedBooks[index].id);
            selectedBooks.update((books) => [
                ...books.slice(0, index),
                ...books.slice(index + 1)
            ]);
        }catch(exception) {
            console.error("Error deleting books: " + exception);
            return { error: true, errorMessage: exception?.message };
        }
        return { error: false };
    }

    return {
        loadStatus: { subscribe: loadStatus.subscribe },
        selectedBooks: { subscribe: selectedBooks.subscribe },
        queryBooks,
        createBook,
        updateBook,
        deleteBook
    };
}
