import { NetworkError, HTTPError } from "./exceptions";

const BASE_REQUEST_HEADERS = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br"
}


export default class NetworkClient {
    constructor(baseUrl, booksPath = "/books", loansPath = "/loans") {
        this._baseUrl = baseUrl;
        this._booksPath = booksPath;
        this._loansPath = loansPath;
    }

    async fetchBooks(page, booksPerPage) {
        let requestUrl = new URL(this._booksPath, this._baseUrl);
        let requestParameters = new URLSearchParams();
        let response;
        if(page) {
            requestParameters.set("page", page);
        }
        if(booksPerPage) {
            requestParameters.set("ipp", booksPerPage);
        }
        requestUrl.search = requestParameters.toString();
        try {
            response = await fetch(
                requestUrl,
                {
                    method: "GET",
                    headers: BASE_REQUEST_HEADERS
                }
            );
        }catch(exception) {
            throw new NetworkError(exception.message);
        }
        if(!response.ok) {
            throw new HTTPError(response.status, response.statusText, "Fetching book data");
        }
        return response.json();
    }

    async searchBooks(query, filters, sortBy, page, booksPerPage) {
        let requestUrl = new URL(`${this._booksPath}/search`, this._baseUrl);
        let requestParameters = new URLSearchParams();
        let response;
        if(query) {
            requestParameters.set("query", query);
        }
        if(filters) {
            requestParameters.set("filter", encodeURI(JSON.stringify(filters)));
        }
        if(sortBy) {
            requestParameters.set("sort", encodeURI(JSON.stringify(sortBy)));
        }
        if(page) {
            requestParameters.set("page", page);
        }
        if(booksPerPage) {
            requestParameters.set("ipp", booksPerPage);
        }
        requestUrl.search = requestParameters.toString();
        try {
            response = await fetch(
                requestUrl,
                {
                    method: "GET",
                    headers: BASE_REQUEST_HEADERS
                }
            )
        }catch(exception) {
            throw new NetworkError(exception.message);
        }
        if(!response.ok) {
            throw new HTTPError(response.status, response.statusText, `Failed to run a search on books!\nSearch params: ${requestParameters}`);
        }
        return response.json();
    }

    async createBook(bookData) {
        let requestUrl = new URL(this._booksPath, this._baseUrl);
        let requestBody = JSON.stringify(bookData);
        let response;
        try {
            response = await fetch(
                requestUrl,
                {
                    method: "POST",
                    headers: BASE_REQUEST_HEADERS,
                    body: requestBody
                }
            );
        }catch(exception) {
            throw new NetworkError(exception.message);
        }
        if(!response.ok) {
            let responseBody = await response.text();
            throw new HTTPError(response.status, response.statusText, responseBody, `Failed to create a new book: the server returned an error.\nBook data: ${requestBody}`);
        }
        return response.json();
    }

    async updateBook(bookId, diffData) {
        let requestUrl = new URL(`${this._booksPath}/${bookId}`, this._baseUrl);
        let requestBody = JSON.stringify(diffData);
        let response;
        try {
            response = await fetch(requestUrl, {
                method: "PATCH",
                headers: BASE_REQUEST_HEADERS,
                body: requestBody
            })
        }catch(exception) {
            throw new NetworkError(exception.message);
        }
        if(!response.ok) {
            let responseBody = await response.text();
            throw new HTTPError(response.status, response.statusText, responseBody, `Failed to update a book: the server returned an error.\nRequest body: ${requestBody}`);
        }
    }

    async deleteBook(bookId) {
        let requestUrl = new URL(`${this._booksPath}/${bookId}`, this._baseUrl);
        let response;
        try {
            response = await fetch(requestUrl, {
                method: "DELETE",
                headers: BASE_REQUEST_HEADERS
            });
        }catch(exception) {
            throw new NetworkError(exception.message);
        }
        if(!response.ok) {
            let responseBody = await response.text();
            throw new HTTPError(response.status, response.statusText, responseBody, `Failed to delete book (id = ${bookId}): the server returned an error.`);
        }
    }

    async fetchLoans(filters, sortBy, page, loansPerPage) {
        let requestUrl = new URL(this._loansPath, this._baseUrl);
        let requestParameters = new URLSearchParams();
        let response;
        if(filters) {
            requestParameters.set("filter", encodeURI(JSON.stringify(filters)));
        }
        if(sortBy) {
            requestParameters.set("sort", encodeURI(JSON.stringify(sortBy)));
        }
        if(page) {
            requestParameters.set("page", page);
        }
        if(loansPerPage) {
            requestParameters.set("ipp", loansPerPage);
        }
        requestUrl.search = requestParameters.toString();
        try {
            response = await fetch(
                requestUrl,
                {
                    method: "GET",
                    headers: BASE_REQUEST_HEADERS
                }
            );
        }catch(exception) {
            throw new NetworkError(exception.message);
        }
        if(!response.ok) {
            throw new HTTPError(response.status, response.statusText, "Fetching loans data");
        }
        return response.json();
    }

    async fetchBookFieldValues(fieldName) {
        return this._fetchFieldValues(this._booksPath, fieldName);
    }

    async fetchLoanFieldValues(fieldName) {
        return this._fetchFieldValues(this._loansPath, fieldName);
    }

    async _fetchFieldValues(basePath, fieldName) {
        const fieldsPath = `${basePath}/fields/${fieldName}`;
        let requestUrl = new URL(fieldsPath, this._baseUrl);
        let response;
        try {
            response = await fetch(
                requestUrl,
                {
                    method: "GET",
                    headers: BASE_REQUEST_HEADERS
                }
            );
        }catch(exception) {
            throw new NetworkError(exception.message);
        }
        if(!response.ok) {
            throw new HTTPError(response.status, response.statusText, `Fetching field "${fieldName}"'s values`);
        }
        return response.json();       
    }
}