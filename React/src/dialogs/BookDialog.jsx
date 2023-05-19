import { React, useState } from "react";
import DialogBox from "../components/dialog_box/DialogBox";
import Input from "../components/input/Input";
import TextArea from "../components/textarea/TextArea";
import Select from "../components/select/Select";
import DatePicker from "../components/date_picker/DatePicker";
import "./BookDialog.css";


export default function BookDialog({ onClose, onSubmit }) {
    const [bookData, setBookData] = useState({
        isbn: "",
        title: "",
        author: "",
        categories: "",
        publisher: "",
        edition: "",
        format: "",
        date: "",
        pages: "",
        copies: "",
        description: "",
        location: ""
    });

    function handleInputChange(name, value) {
        setBookData({ ...bookData, [name]: value });
    }

    function handleFormSubmit(event) {
        event.preventDefault();
        const formElement = event.target;
        if(!formElement.checkValidity()) {
            const firstInvalidInput = formElement.querySelector(":invalid");
            firstInvalidInput && firstInvalidInput.focus();
        }else {
            onSubmit(bookData);
            onClose();
        }
    }

    return (
        <DialogBox>
            <div className="book-dialog-container">
                <h3>Adicionar novo livro</h3>
                <p>Preencha as informações abaixo para cadastrar um novo livro</p>
                <form name="book-dialog-form" noValidate onSubmit={handleFormSubmit}>
                    <Input
                        name="isbn"
                        type="text"
                        label="ISBN"
                        supportingText="Entre o ISBN do livro"
                        value={bookData.isbn}
                        onChange={handleInputChange}
                        required
                    />
                    <Input
                        name="title"
                        type="text"
                        label="Título"
                        supportingText="Entre o título do livro"
                        value={bookData.title}
                        onChange={handleInputChange}
                        required
                    />
                    <Input
                        name="author"
                        type="text"
                        label="Autor(es)"
                        supportingText="Entre o(s) autor(es) do livro"
                        value={bookData.author}
                        onChange={handleInputChange}
                        required
                    />
                    <Select
                        name="categories"
                        label="Categorias"
                        options={["Nova categoria"]}
                        placeholder="Entre a(s) categoria(s) do livro"
                        value={bookData.categories}
                        onChange={handleInputChange}
                        multiple
                        formVariant
                    />
                    <Input
                        name="publisher"
                        type="text"
                        label="Editora"
                        supportingText="Entre a editora do livro"
                        value={bookData.publisher}
                        onChange={handleInputChange}
                    />
                    <Input
                        name="edition"
                        type="text"
                        label="Edição"
                        supportingText="Entre a edição do livro"
                        value={bookData.edition}
                        onChange={handleInputChange}
                    />
                    <Input
                        name="format"
                        type="text"
                        label="Formato"
                        supportingText="Entre o formato do livro"
                        value={bookData.format}
                        onChange={handleInputChange}
                    />
                    <DatePicker
                        name="date"
                        label="Data de publicação"
                        supportingText="Selecione a data de publicação do livro"
                        value={bookData.date}
                        onChange={handleInputChange}
                    />
                    <Input
                        name="pages"
                        type="number"
                        label="Páginas"
                        supportingText="Entre o número de páginas do livro"
                        minValue={1}
                        value={bookData.pages}
                        onChange={handleInputChange}
                        required
                    />
                    <Input
                        name="copies"
                        type="number"
                        label="Cópias"
                        supportingText="Entre o número de cópias disponíveis do livro"
                        minValue={1}
                        value={bookData.copies}
                        onChange={handleInputChange}
                        required
                    />
                    <TextArea
                        name="description"
                        label="Descrição"
                        supportingText="Entre uma breve descrição para o livro"
                        value={bookData.description}
                        onChange={handleInputChange}
                    />
                    <Input
                        name="location"
                        type="text"
                        label="Localização"
                        supportingText="Entre a localização do livro no acervo"
                        value={bookData.location}
                        onChange={handleInputChange}
                    />
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
