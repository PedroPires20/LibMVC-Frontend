declare module "@common/utils/network_client.js" {
    export default class NetworkClient {
        constructor(baseUrl: string, booksPath?: string, loansPath?: string);
        
        fetchBooks(page?: number, booksPerPage?: number): Promise<any>;
        searchBooks(query: string, filters: any, sortBy: any, page?: number, booksPerPage?: number): Promise<any>;
        createBook(bookData: any): Promise<any>;
        updateBook(bookId: string, diffData: any): Promise<void>;
        deleteBook(bookId: string): Promise<void>;
        fetchLoans(filters: any, sortBy: any, page?: number, loansPerPage?: number): Promise<any>;
        createLoan(loanData: any): Promise<any>;
        updateLoan(loanId: string, diffData: any): Promise<void>;
        deleteLoan(loanId: string): Promise<void>;
        fetchBookFieldValues(fieldName: string): Promise<any>;
        fetchLoanFieldValues(fieldName: string): Promise<any>;
        
        private _fetchFieldValues(basePath: string, fieldName: string): Promise<any>;
        
        private _baseUrl: string;
        private _booksPath: string;
        private _loansPath: string;
    }    
}