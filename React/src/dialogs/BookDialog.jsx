import { React } from "react";
import DialogBox from "../components/dialog_box/DialogBox";
import Input from "../components/input/Input";
import TextArea from "../components/textarea/TextArea";
import Select from "../components/select/Select";
import DatePicker from "../components/date_picker/DatePicker";
import "./BookDialog.css";


export default function BookDialog({ onClose }) {
    return (
        <DialogBox>
            <div className="book-dialog-container">
                <h3>Adicionar novo livro</h3>
                <p>Preencha as informações abaixo para cadastrar um novo livro</p>
                <form name="book-dialog-form" onSubmit={(e) => e.preventDefault()}>
                    <Input type="text" label="ISBN" supportingText="Entre o ISBN do livro"/>
                    <Input type="text" label="Título" supportingText="Entre o título do livro"/>
                    <Input type="text" label="Autor(es)" supportingText="Entre o(s) autor(es) do livro"/>
                    <Select
                        label="Categorias"
                        options={["Nova categoria"]}
                        placeholder="Entre a(s) categoria(s) do livro"
                        multiple
                        formVariant
                    />
                    <Input type="text" label="Editora" supportingText="Entre a editora do livro"/>
                    <Input type="text" label="Edição" supportingText="Entre a edição do livro"/>
                    <Input type="text" label="Formato" supportingText="Entre o formato do livro"/>
                    <DatePicker label="Data de publicação" supportingText="Selecione a data de publicação do livro"/>
                    <Input type="number" label="Páginas" supportingText="Entre o número de páginas do livro"/>
                    <Input type="number" label="Cópias" supportingText="Entre o número de cópias disponíveis do livro"/>
                    <TextArea label="Descrição" supportingText="Entre uma breve descrição para o livro"/>
                    <Input type="text" label="Localização" supportingText="Entre a localização do livro no acervo"/>
                    <div className="book-dialog-buttons">
                        <button
                            className="click-ripple-effect-light"
                            onClick={(e) => {
                                e.preventDefault();
                                onClose();
                            }}
                        >
                            Cancelar
                        </button>
                        <button
                            className="click-ripple-effect-light"
                            
                        >
                            Confirmar
                        </button>
                    </div>
                </form>
            </div>
        </DialogBox>
    )
}
