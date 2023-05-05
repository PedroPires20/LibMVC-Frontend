import { React } from "react";
import searchIcon from "./assets/search_icon.svg";
import "./SearchBox.css";


export default function SearchBox({ searchQuery, onQueryChange }) {
    return (
        <div className="search-box">
            <input
                name="search-box"
                type="text"
                placeholder="Pesquise por título, descrição, autor, etc."
                value={searchQuery}
                onChange={(e) => onQueryChange && onQueryChange(e.target.value)}
            />
            <img src={searchIcon} alt="search"/>
        </div>
    )
}
