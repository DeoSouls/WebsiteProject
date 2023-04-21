import React, {useState} from "react";
import { Route, Routes} from 'react-router';
import { Registre } from "../Registration/Registre";
import { Auth } from "../Auth/Auth";
import { Home } from '../Home/Home';
import { AccountContext } from "./Context";
import styles from './App.css';

function App() {

    const [context, setContext] = useState('value');

    return (
        <>
            <AccountContext.Provider value={[context, setContext]}>
                <Routes>
                    <Route path='/*' element={<Home/>}></Route>
                    <Route path='/registre' element={<Registre/>}></Route>
                    <Route path='/authorization' element={<Auth/>}></Route>
                    <Route path='*' element={(<h1>Страница не найдена</h1>)}></Route>
                </Routes>
            </AccountContext.Provider>
        </>
    )
}

export default App;