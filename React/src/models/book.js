import { parseDate } from "../utils/utils";


export default class Book {
    constructor(bookData, index = null) {
        this._id = bookData._id;
        this._isbn = bookData.isbn;
        this._title = bookData.title;
        this._author = bookData.author;
        this._categories = bookData.categories;
        this._publisher = bookData.publisher;
        this._edition = bookData.edition;
        this._format = bookData.format;
        this._date = parseDate(bookData.date);
        this._pages = bookData.pages;
        this._copies = bookData.copies;
        this._description = bookData.description;
        this._location = bookData.location;
        this._index = index;
    }

    get id() {
        return this._id;
    }

    get isbn() {
        return this._isbn || "-";
    }
    
    get title() {
        return this._title || "-";
    }
    
    get author() {
        return this._author || "-";
    }
    
    get categories() {
        return (Array.isArray(this._categories)) ? this._categories.join("; ") : "";
    }
    
    get publisher() {
        return this._publisher || "-";
    }
    
    get edition() {
        return this._edition || "-";
    }
    
    get format() {
        return this._format || "-";
    }
    
    get date() {
        return (this._date) ? this._date.toLocaleDateString() : "-";
    }
    
    get pages() {
        return this._pages || "-";
    }
    
    get copies() {
        return this._copies || "-";
    }
    
    get description() {
        return this._description || "-";
    }
    
    get location() {
        return this._location || "-";
    }    
}
