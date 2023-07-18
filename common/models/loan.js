import Model from "./model";
import { parseDate, toFormDate } from "../utils/utils";

const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;


export default class Loan extends Model {
    constructor(loanData, index = null) {
        super();
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

    static fromFormData(formData, id = null, index = null) {
        let startDate = parseDate(formData.startDate);
        let duration = parseInt(formData.duration);
        let endDate = new Date(startDate.getTime());
        endDate.setDate(startDate.getDate() + duration);
        let currentDate = new Date();
        let daysRemaining = Math.ceil((endDate.getTime() - currentDate.getTime()) / MILLISECONDS_PER_DAY);
        return new Loan({
            _id: id,
            reader: formData.reader,
            phone: formData.phone,
            bookId: formData.bookId,
            bookTitle: formData.bookTitle,
            startDate: toFormDate(startDate),
            endDate: toFormDate(endDate),
            duration: duration,
            daysRemaining: daysRemaining,
            renew: formData.renew,
            late: endDate < currentDate
        }, index);
    }

    toRequestBody() {
        return {
            reader: this._reader,
            phone: this._phone,
            bookId: this._bookId,
            startDate: this._startDate.toISOString(),
            duration: this._duration,
            renew: this._renew
        };
    }

    toFormData() {
        return {
            reader: this._reader,
            phone: this._phone,
            bookId: this._bookId,
            startDate: toFormDate(this._startDate),
            duration: this._duration,
            renew: this._renew
        };
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