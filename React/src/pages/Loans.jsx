import { React, useState, useEffect } from "react";
import { useLoans } from "../hooks/useLoans";
import Button from "../components/button/Button";
import { TableCard, TableHeader, TableRow, TableCell, TableData } from "../components/table_card/TableCard";
import TableStatus from "../components/table_status/TableStatus";
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
    const [loanFinishStatus, setLoanFinishStatus] = useState({ processing: false, error: false });
    const { loans, loadStatus, filterLoans, createLoan, updateLoan, deleteLoan } = useLoans();

    useEffect(() => {
        document.title = "SimpleLibrary - Empréstimos"
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
            setTargetLoanIndex(null);
            return updateLoan(targetLoanIndex, loanData);
        }else {
            return createLoan(loanData);
        }
    }
    
    async function handleFinishDialog(action) {
        if(action === 0 && targetLoanIndex !== null) {
            setLoanFinishStatus({ processing: true, error: false });
            setTargetLoanIndex(null);
            let deleteStatus = await deleteLoan(targetLoanIndex);
            if(deleteStatus.error) {
                setLoanFinishStatus({ processing: false, error: true, errorMessage: deleteStatus.errorMessage });
                return;
            }else {
                setLoanFinishStatus({ processing: false, error: false });
            }
        }
        setShowFinishDialog(false);
    }
    
    return (
        <div className={`loans-page${(showContextMenu) ? " loans-page-menu" : ""}`}>
            <div className="loans-header">
                <h2>Empréstimos</h2>
                <Button
                    variant="primary"
                    onClick={() => setShowLoanDialog(true)}
                    disabled={loadStatus.loading || loadStatus.error}
                >
                    <div className="loans-add-button">
                        <img src={addIcon} alt="novo"/>
                        <span>Novo empréstimo</span>
                    </div>
                </Button>
            </div>
            <LoanInputs
                onSubmit={filterLoans}
                disabled={loadStatus.loading || loadStatus.error}
            />
            <TableCard menuActive={showContextMenu}>
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
                {(loadStatus.loading || loadStatus.error || loans.length === 0) ? (
                    <TableStatus
                        error={loadStatus.error}
                        loading={loadStatus.loading}
                        message={(loadStatus.loading) ? "Carregando dados dos empréstimos..." :
                        ((loadStatus.error) ? "Ocorreu um erro ao recuperar os dados dos empréstimos. Por favor, tente novamente." :
                        "Nenhum empréstimo foi encontrado")}
                    />
                ) : (
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
                )}
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
                    {(!loanFinishStatus.processing && !loanFinishStatus.error) ? (
                        <StateDialog
                            variant="success"
                            heading="Finalizar empréstimo?"
                            message={"Deseja finalizar esse empréstimo?\nUma vez finalizado, o livro é considerado como devolvido e os dados relacionados ao empréstimo são excluídos"}
                            buttonLabels={["Sim", "Não"]}
                            onClose={handleFinishDialog}
                        />
                    ) : (
                        <StateDialog
                        variant={(loanFinishStatus.error) ? "error" : "load"}
                        heading={(loanFinishStatus.error) ? "Erro" : "Salvando"}
                        message={(loanFinishStatus.error) ? "Ocorreu um erro ao salvar as alterações no sistema." : "As alterações estão sendo processadas pelo sistema"}
                        detailsSummary={(loanFinishStatus.errorMessage && loanFinishStatus.errorMessage !== "") && "Detalhes do erro"}
                        detailsContent={loanFinishStatus.errorMessage}
                        onClose={() => {
                            setShowFinishDialog(false);
                            setLoanFinishStatus({ processing: false, error: false });
                        }}
                    />  
                    )}
                </DialogBox>
            )}
        </div>
    )
}
