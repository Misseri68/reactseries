import React, { Component } from 'react'
import Global from '../Global';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

export default class CreatePersonaje extends Component {

    idSerie = 0;

    selectSerie = React.createRef();
    inputNombre = React.createRef();
    inputImagen = React.createRef();

    state = {
        series: [],
        status: false
    }

    loadSeries() {
        var request = "api/Series";
        var url = Global.apiSeries + request;

        axios.get(url).then(response => {
            console.log("Leyendo series desde el CREATE")
            this.setState({
                series: response.data
            })
        })
    }

    createPersonaje = () => {
        var serie = parseInt(this.selectSerie.current.value);
        var nombre = this.inputNombre.current.value;
        var imagen = this.inputImagen.current.value;

        let personaje = {
            "idPersonaje": 0,
            "nombre": nombre,
            "imagen": imagen,
            "idSerie": serie
        }

        this.idSerie = serie;

        let request = "api/personajes";
        let url = Global.apiSeries + request

        axios.post(url, personaje).then(response => {
            this.setState({ status: true })
            console.log(response)
        })
    }

    componentDidMount() {
        this.loadSeries();
    }

    render() {
        return (
            <div className="text-center" >

                {this.state.status && <Navigate to={"../serie/" + this.idSerie}/>}

                <h2 className="mt-3 mb-4">Crea un nuevo personaje</h2>
                <h4>Primero, elige la serie a la que pertenece:</h4>
                <select className="mt-3 border border-secondary rounded p-2" ref={this.selectSerie}>
                    {this.state.series.map((serie, index) => {
                        return (
                            <option key={index} value={serie.idSerie}>{serie.nombre}</option>
                        )
                    })}
                </select>

                <h5 className="mt-4">Introduce el nombre del personaje</h5>
                <input type="text" className="mt-3 border border-secondary rounded p-2" ref={this.inputNombre} />

                <h5 className="mt-4">Introduce una imagen del personaje</h5>
                <input type="text" className="mt-3 border border-secondary rounded p-2" ref={this.inputImagen} /><br />
                <button className="btn-success btn mt-5" onClick={this.createPersonaje}>Crear personaje!</button>
            </div>
        )
    }
}
