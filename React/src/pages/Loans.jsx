import { React, useState, useEffect } from "react";
import { useLoans } from "../hooks/useLoans";
import Button from "../components/button/Button";
import { TableCard, TableHeader, TableRow, TableCell, TableData } from "../components/table_card/TableCard";
import LoanInputs from "../components/loan_inputs/LoanInputs";
import ContextMenu from "../components/context_menu/ContextMenu";
import addIcon from "./assets/add_icon.svg";
import "./Loans.css";


export default function Loans() {
    const [showContextMenu, setShowContextMenu] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
    const { loans, handleFilters } = useLoans();

    useEffect(() => {
        document.title = "LibMVC - Empréstimos"
    }, []);

    function handleRowClick(event) {
        const { top, left, width, height } = event.target.getBoundingClientRect();
        setContextMenuPosition({ x: left, y: top + height });
        setShowContextMenu(true);
        event.stopPropagation();
    }
    
    return (
        <div className={`loans-page${(showContextMenu) ? " loans-page-menu" : ""}`}>
            <div className="loans-header">
                <h2>Empréstimos</h2>
                <Button variant="primary">
                    <div className="loans-add-button">
                        <img src={addIcon} alt="novo"/>
                        <span>Novo empréstimo</span>
                    </div>
                </Button>
            </div>
            <LoanInputs onSubmit={handleFilters}/>
            <TableCard>
                <TableHeader>
                    <TableRow>
                        <TableCell>Leitor</TableCell>
                        <TableCell>Tel Contato</TableCell>
                        <TableCell>Obra</TableCell>
                        <TableCell>Data empréstimo</TableCell>
                        <TableCell>Duração</TableCell>
                        <TableCell>Data devolução</TableCell>
                        <TableCell>Dias restantes</TableCell>
                        <TableCell>Atrasado</TableCell>
                        <TableCell>Renovação</TableCell>
                    </TableRow>
                </TableHeader>
                <TableData>
                    {loans.map((loan) => (
                        <TableRow key={loan.id} onClick={handleRowClick}>
                            <TableCell>
                                {loan.reader}
                            </TableCell>
                            <TableCell>
                                {loan.phone}
                            </TableCell>
                            <TableCell minWidth="15rem" wrap>
                                {loan.bookTitle}
                            </TableCell>
                            <TableCell>
                                {loan.startDate}
                            </TableCell>
                            <TableCell>
                                {loan.duration}
                            </TableCell>
                            <TableCell>
                                {loan.endDate}
                            </TableCell>
                            <TableCell>
                                {loan.daysRemaining}
                            </TableCell>
                            <TableCell>
                                {loan.late}
                            </TableCell>
                            <TableCell>
                                {loan.renew}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableData>
            </TableCard>
            {showContextMenu && (
                <ContextMenu
                    position={contextMenuPosition}
                    onMenuClose={() => setShowContextMenu(false)}
                    loanVariant
                />
            )}
        </div>
    )
}
