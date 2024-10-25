import React, { Component } from 'react'
import Global from '../Global';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

export default class Serie extends Component {

    state = {
        serie: null,
        verPersonajes: false,
        personajes: []
    }

    loadSerie() {
        var request = "api/Series/" + this.props.idserie;
        var url = Global.apiSeries + request;
        axios.get(url).then(response => {
            console.log("Leyendo serie")
            this.setState({
                serie: response.data
            })
        })
    }

    verPersonajes = () => {
        console.log("Boton verPersonajes pulsado");
        this.setState({
            verPersonajes: true
        })
        this.loadPersonajes()

    }

    loadPersonajes() {
        var request = "api/Series/PersonajesSerie/" + this.props.idserie;
        let url = Global.apiSeries + request;

        axios.get(url).then(response => {
            console.log("Leyendo personaje")
            this.setState({
                personajes: response.data
            })
        })
    }

    componentDidUpdate(oldProps) {
        if (oldProps.idserie != this.props.idserie) {
            this.loadSerie()
            this.setState({
                verPersonajes: false
            })
        }
    }

    componentDidMount() {
        this.loadSerie()
    }

    render() {


        if (this.state.verPersonajes) {
            return (<div className="text-center">
                <button onClick={() => { this.setState({ verPersonajes: false }) }} className="btn btn-info ">&larr; Volver</button>
                {this.state.personajes.length > 0 &&
                    <table className="table table-striped table-dark table-hover text-center border">
                        <thead className="border-bottom">
                            <tr>
                                <th className="border text-center">Personaje</th>
                                <th className="border text-center">Imagen</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.personajes.map((personaje, index) => (
                                <tr key={index}>
                                    <td className="border">{personaje.nombre}</td>
                                    <td className="border">
                                        <img src={personaje.imagen} className="rounded" width="150px" alt={personaje.nombre} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>    
                }

            </div>)


        } else {
            return (
                <div className="text-center">
                    {
                        this.state.serie &&
                        <div >
                            <img src={this.state.serie.imagen} className="img rounded mb-3 mt-5" width="400px" />
                            <h3>{this.state.serie.nombre} ({this.state.serie.año})</h3>
                            <h4>Puntuación: {this.state.serie.puntuacion}</h4>
                            <hr />
                            <button onClick={this.verPersonajes} className="btn btn-primary">Ver personajes</button>
                        </div>
                    }
                </div>
            )
        }
    }
}
