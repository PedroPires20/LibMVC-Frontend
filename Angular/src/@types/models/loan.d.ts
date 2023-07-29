declare module "@common/models/loan.js" {
    export default class Loan {
        static fromFormData(formData: any, id?: string, index?: number): Loan;

        constructor(loanData: any, index?: number);
        
        toRequestBody(): {
            reader: string;
            phone: string;
            bookId: string;
            startDate: string;
            duration: number;
            renew: boolean;
        };

        toFormData(): {
            reader: string;
            phone: string;
            bookId: string;
            startDate: string;
            duration: string;
            renew: string;
        };

        getFieldsDiff(targetObject: Loan): boolean;

        get id(): string;
        get reader(): string;
        get phone(): string;
        get bookId(): string;
        get bookTitle(): string;
        get startDate(): string;
        get endDate(): string;
        get duration(): string | number;
        get daysRemaining(): string | number;
        get renew(): "-" | "Sim" | "Não";
        get late(): "-" | "Sim" | "Não";

        private _id: any;
        private _reader: any;
        private _phone: any;
        private _bookId: any;
        private _bookTitle: any;
        private _startDate: Date;
        private _endDate: Date;
        private _duration: any;
        private _daysRemaining: any;
        private _renew: any;
        private _late: any;
        private _index: any;
    }
}
