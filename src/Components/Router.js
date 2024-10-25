import React, { Component } from 'react'
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom'
import Home from './Home'
import MenuRutas from './MenuRutas'
import Serie from './Serie';
import CreatePersonaje from './CreatePersonaje';
import UpdatePersonaje from './UpdatePersonaje';

export default class Router extends Component {
    render() {

        function SerieElement(){
            var {idSerie} = useParams();
            return <Serie idserie={idSerie} />
        }



        return (
            <BrowserRouter>
            <MenuRutas/>
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/createpersonaje" element={<CreatePersonaje/>} />
                    <Route path="/updatepersonaje" element={<UpdatePersonaje/>} />
                    <Route path="/serie/:idSerie" element={<SerieElement/>}/>
                </Routes>
            </BrowserRouter>
        )
    }
}
