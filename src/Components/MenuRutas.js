import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Global from '../Global';
import axios from 'axios';

export default class MenuRutas extends Component {

    state = {
        series: []
    }

    loadSeries() {
        var request = "api/Series";
        var url = Global.apiSeries + request;

        axios.get(url).then(response => {
            console.log("Leyendo...")
            this.setState({
                series: response.data
            })
        })
    }

    componentDidMount() {
        this.loadSeries();
    }





    render() {
        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark" aria-label="Third navbar example">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse " id="navbarsExample03">
                        <ul className="navbar-nav me-auto mb-2 mb-sm-0 w-100 justify-content-around">
                            <li className="nav-item">
                                <NavLink to="/" className="nav-link active fw-bold">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/createpersonaje" className="nav-link active">Crear personaje</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/updatepersonaje" className="nav-link active">Editar personaje</NavLink>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">Series</a>
                                <ul className="dropdown-menu bg-dark">
                                    {
                                        this.state.series.length > 0 &&
                                        this.state.series.map((serie, index) => {
                                            return (<li key={serie.idSerie} className="dropdown-item bg-dark text-white">
                                                <NavLink className="nav-link text-white text-decoration-none" to={"serie/" + serie.idSerie}>{serie.nombre}</NavLink>
                                            </li>)
                                        })
                                    }
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}
