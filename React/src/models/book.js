import Model from "./model";
import { parseDate, toFormDate } from "../utils/utils";


export default class Book extends Model {
    constructor(bookData, index = null) {
        super();
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

    static fromFormData(formData, id = null, index = null) {
        return new Book({
            _id: id,
            isbn: formData.isbn || "",
            title: formData.title,
            author: formData.author,
            categories: Array.isArray(formData.categories) ? formData.categories : [],
            publisher: formData.publisher || "",
            edition: formData.edition || "",
            format: formData.format || "",
            date: (formData.date && formData.date !== "") ? formData.date : undefined,
            pages: parseInt(formData.pages),
            copies: parseInt(formData.copies),
            description: formData.description || "",
            location: formData.location || ""
        }, index);
    }

    toRequestBody() {
        return {
            isbn: this._isbn,
            title: this._title,
            author: this._author,
            categories: this._categories,
            publisher: this._publisher,
            edition: this._edition,
            format: this._format,
            date: (this._date && this.date !== "") ? this._date.toISOString() : this._date,
            pages: this._pages,
            copies: this._copies,
            description: this._description,
            location: this._location
        };
    }

    toFormData() {
        return {
            isbn: this._isbn,
            title: this._title,
            author: this._author,
            categories: this._categories,
            publisher: this._publisher,
            edition: this._edition,
            format: this._format,
            date: (this._date && this.date !== "") ? toFormDate(this._date) : "",
            pages: this._pages.toString(),
            copies: this._copies.toString(),
            description: this._description,
            location: this._location
        };
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
