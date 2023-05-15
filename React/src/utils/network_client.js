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
        return this._fetchFieldValues(this._booksPath, fieldName);
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