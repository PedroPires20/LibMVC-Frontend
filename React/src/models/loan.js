import { parseDate } from "../utils/utils";


export default class Loan {
    constructor(loanData, index = null) {
        this._id = loanData._id;
        this._reader = loanData.reader;
        this._phone = loanData.phone;
        this._bookId = loanData.bookId;
        this._bookTitle = loanData.bookTitle;
        this._startDate = parseDate(loanData.startDate);
        this._endDate = parseDate(loanData.endDate);
        this._duration = loanData.duration;
        this._daysRemaining = loanData.daysRemaining;
        this._renew = loanData.renew;
        this._late = loanData.late;
        this._index = index;
    }

    get id() {
        return this._id;
    }
    
    get reader() {
        return this._reader || "-";
    }
    
    get phone() {
        return this._phone || "-";
    }
    
    get bookId() {
        return this._bookId || "-";
    }
    
    get bookTitle() {
        return this._bookTitle || "-";
    }
    
    get startDate() {
        return (this._startDate) ? this._startDate.toLocaleDateString() : "-";
    }
    
    get endDate() {
        return (this._endDate) ? this._endDate.toLocaleDateString() : "-";
    }
    
    get duration() {
        return this._duration || "-";
    }
    
    get daysRemaining() {
        return this._daysRemaining || "-";
    }
    
    get renew() {
        if(this._renew === undefined) {
            return "-";
        }
        return (this._renew) ? "Sim" : "Não";
    }
    
    get late() {
        if(this._late === undefined) {
            return "-";
        }
        return (this._late) ? "Sim" : "Não";
    }
}