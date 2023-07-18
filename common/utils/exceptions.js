export class NetworkError extends Error {
    constructor(message) {
        super(`The request failed due to a network error!\nThe following error was encountered: ${message}`);
        this.name = "NetworkError";
    }
}

export class HTTPError extends Error {
    constructor(statusCode, statusMessage, responseBody = "", context = "") {
        super(`An error response was sent by the server:\nStatus: ${statusCode} - ${statusMessage}`);
        this.name = "HttpError";
        if(!!responseBody) {
            this.message += `\nResponse: ${responseBody}`
        }
        if(!!context) {
            this.message += `\nContext: ${context}`
        }
    }
}

