export class NetworkError extends Error {
    constructor(message) {
        this.name = "NetworkError";
        this.message = `Data fetching failed due to a network error!\nThe following error was encountered: ${message}`;
    }
}

export class HTTPError extends Error {
    constructor(statusCode, statusMessage, context = "") {
        this.name = "HttpError";
        this.message = `Data fetching failed! An error response was sent by the server:\nStatus: ${statusCode} - ${statusMessage}`
            + (context) ? `\nContext: ${context}` : "";
    }
}

