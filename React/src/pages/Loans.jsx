import { React, useState, useEffect } from "react";
import { useLoans } from "../hooks/useLoans";
import Button from "../components/button/Button";
import { TableCard, TableHeader, TableRow, TableCell, TableData } from "../components/table_card/TableCard";
import LoanInputs from "../components/loan_inputs/LoanInputs";
import ContextMenu from "../components/context_menu/ContextMenu";
import LoanDialog from "../dialogs/LoanDialog";
import DialogBox from "../components/dialog_box/DialogBox";
import StateDialog from "../dialogs/StateDialog";
import addIcon from "./assets/add_icon.svg";
import "./Loans.css";


export default function Loans() {
    const [showContextMenu, setShowContextMenu] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0, targetIndex: 0 });
    const [targetLoanIndex, setTargetLoanIndex] = useState(null);
    const [showLoanDialog, setShowLoanDialog] = useState(false);
    const [showFinishDialog, setShowFinishDialog] = useState(false);
    const { loans, filterLoans, createLoan, updateLoan, deleteLoan } = useLoans();

    useEffect(() => {
        document.title = "LibMVC - Empréstimos"
    }, []);

    function handleRowClick(event, targetIndex) {
        const { top, left, width, height } = event.target.getBoundingClientRect();
        setContextMenuPosition({ x: left, y: top + height, targetIndex });
        setShowContextMenu(true);
        event.stopPropagation();
    }

    function handleContextMenuClick(action) {
        setTargetLoanIndex(contextMenuPosition.targetIndex);
        setShowContextMenu(false);
        if(action === 0) {
            setShowLoanDialog(true);
        }else if(action == 1) {
            setShowFinishDialog(true);
        }
    }

    function handleLoanDialogSubmit(loanData) {
        if(targetLoanIndex !== null) {
            updateLoan(targetLoanIndex, loanData);
            setTargetLoanIndex(null);
        }else {
            createLoan(loanData);
        }
    }
    
    function handleFinishDialog(action) {
        if(action === 0 && targetLoanIndex !== null) {
            deleteLoan(targetLoanIndex);
            setTargetLoanIndex(null);
        }
        setShowFinishDialog(false);
    }
    
    return (
        <div className={`loans-page${(showContextMenu) ? " loans-page-menu" : ""}`}>
            <div className="loans-header">
                <h2>Empréstimos</h2>
                <Button variant="primary" onClick={() => setShowLoanDialog(true)}>
                    <div className="loans-add-button">
                        <img src={addIcon} alt="novo"/>
                        <span>Novo empréstimo</span>
                    </div>
                </Button>
            </div>
            <LoanInputs onSubmit={filterLoans}/>
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
                    {loans.map((loan, index) => (
                        <TableRow key={loan.id} onClick={(e) => handleRowClick(e, index)}>
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
                    onMenuClick={handleContextMenuClick}
                    loanVariant
                />
            )}
            {showLoanDialog && (
                <LoanDialog
                    updateTarget={(targetLoanIndex !== null) && loans[targetLoanIndex]}
                    onSubmit={handleLoanDialogSubmit}
                    onClose={() => setShowLoanDialog(false)}
                />
            )}
            {showFinishDialog && (
                <DialogBox>
                    <StateDialog
                        variant="success"
                        heading="Finalizar empréstimo?"
                        message={"Deseja finalizar esse empréstimo?\nUma vez finalizado, o livro é considerado como devolvido e os dados relacionados ao empréstimo são excluídos"}
                        buttonLabels={["Sim", "Não"]}
                        onClose={handleFinishDialog}
                    />
                </DialogBox>
            )}
        </div>
    )
}
