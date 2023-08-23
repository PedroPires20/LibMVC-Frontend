import { writable } from "svelte/store";
import NetworkClient from "@common/utils/network_client";
import Book from "@common/models/book";
import { objectEquals } from "@common/utils/utils";


export function createBooks() {
    let api = new NetworkClient(API_BASE_URL);
    let previousQuery;
    let previousFilters;
    const loadStatus = writable({ loading: false, error: false })
    const selectedBooks = writable([]);

    async function queryBooks(queryText = "", filters = {}) {
        if(queryText !== previousQuery && !objectEquals(filters, previousFilters)) {
            try {
                loadStatus.set({ loading: true, error: false });
                let booksData = await api.searchBooks(queryText, filters, { title: 1 });
                selectedBooks.set(booksData.map((bookData, index) => new Book(bookData, index)));
                loadStatus.set({ loading: false, error: false });
                previousQuery = queryText;
                previousFilters = filters;
            }catch(exception) {
                console.error("Error loading books: " + exception);
                loadStatus.set({ loading: false, error: true, errorMessage: exception.message });
            }
        }
    }

    return {
        loadStatus: { subscribe: loadStatus.subscribe },
        selectedBooks: { subscribe: selectedBooks.subscribe },
        queryBooks
    };
}
