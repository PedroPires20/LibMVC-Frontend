import { React, createContext, useContext } from "react";
import "./TableCard.css";

const HeaderContext = createContext(false);


export function TableCard({ children }) {
    return (
        <div className="table-card-container">
            <table>
               {children}
            </table>
        </div>
    )
}


export function TableHeader({ children }) {
    return (
        <thead className="table-header">
            <HeaderContext.Provider value={true}>
                {children}
            </HeaderContext.Provider>
        </thead>
    )
}


export function TableData({ children }) {
    return (
        <tbody className="table-data">
            <HeaderContext.Provider value={false}>
                {children}
            </HeaderContext.Provider>
        </tbody>
    )
}


export function TableRow({ children, onClick }) {
    return (
        <tr onClick={onClick}>
            {children}
        </tr>
    )
}


export function TableCell({
    children,
    align = "center",
    valign = "center",
    wrap = false,
    minWidth = "10rem"
}) {
    const isHeader = useContext(HeaderContext);
    let elementStyles = {
        textAlign: (align && align !== "center") ? align : undefined,
        verticalAlign: (valign && valign !== "center") ? valign : undefined,
        whiteSpace: (wrap) ? "normal" : undefined,
        minWidth: (wrap) ? minWidth : undefined
    };

    return (isHeader) ?
    <th className="table-card-cell" style={elementStyles}>{children}</th> :
    <td className="table-card-cell" style={elementStyles}>{children}</td>;
}
