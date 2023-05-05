import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/header/Header";
import Collection from "./pages/Collection";
import Loans from "./pages/Loans";

function App() {

    return (
        <>
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path="/" element={<Navigate to="/collection" push/>}/>
                    <Route path="/collection" element={<Collection/>}/>
                    <Route path="/loans" element={<Loans/>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App;
