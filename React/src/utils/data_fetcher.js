import { NetworkError, HTTPError } from "./exceptions";

export default class DataFetcher {
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
                    headers: {
                        "Accept": "application/json",
                        "Accept-Encoding": "gzip, deflate, br"
                    }
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
}