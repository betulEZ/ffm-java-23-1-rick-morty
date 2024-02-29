import './App.css'
import {useState} from "react";
import {Character, charactersResponse} from "./characters.ts";
import CharacterGallery from "./CharacterGallery.tsx";
import {Link, Navigate, Route, Routes} from "react-router-dom";
import CharacterDetails from "./CharacterDetails.tsx";

function App() {

    const [characters, setCharacters] = useState<Character[]>(charactersResponse.results)


    return (
        <>
            <nav>
                <Link to={"/Home/Welcome"}>Home Welcome Unsere Website</Link>
                <br/>
                <Link to={"/characters"}>Characters</Link>
            </nav>
            <Routes>
                <Route path={"/"} element={<Navigate replace to="/Home/Welcome"/>}/>
                <Route path="/characters" element={<CharacterGallery characters={characters}/>}/>
                <Route path={"/characters/:id"} element={<CharacterDetails characters={characters}/>}/>
            </Routes>

        </>
    )
}

export default App
