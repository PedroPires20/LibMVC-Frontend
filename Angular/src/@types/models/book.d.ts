declare module "@common/models/book.js" {
    export default class Book {
        static fromFormData(formData: any, id?: string, index?: number): Book;
        
        constructor(bookData: any, index?: number);

        toRequestBody(): {
            isbn: string;
            title: string;
            author: string;
            categories: string[];
            publisher: string;
            edition: string;
            format: string;
            date: string;
            pages: number;
            copies: number;
            description: string;
            location: string;
        };
        
        toFormData(): {
            isbn: string;
            title: string;
            author: string;
            categories: string;
            publisher: string;
            edition: string;
            format: string;
            date: string;
            pages: string;
            copies: string;
            description: string;
            location: string;
        };

        getFieldsDiff(targetObject: Book): boolean;
        
        get id(): any;
        get isbn(): any;
        get title(): any;
        get author(): any;
        get categories(): string;
        get publisher(): any;
        get edition(): any;
        get format(): any;
        get date(): string;
        get pages(): any;
        get copies(): any;
        get description(): any;
        get location(): any;

        private _id: any;
        private _isbn: any;
        private _title: any;
        private _author: any;
        private _categories: any;
        private _publisher: any;
        private _edition: any;
        private _format: any;
        private _date: Date;
        private _pages: any;
        private _copies: any;
        private _description: any;
        private _location: any;
        private _index: any;
    }
}
