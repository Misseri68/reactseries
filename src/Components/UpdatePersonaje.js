import React, { Component } from 'react'
import Global from '../Global';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

export default class UpdatePersonaje extends Component {

    selectSeries = React.createRef();
    selectPerosnajes = React.createRef();

    state = {
        series: [],
        personajes: [],
        serieSelec: null,
        persoSelec: null,
        status: false,
        idSerie: null
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

    cambioSerie = (e) => {
        console.log(e.target.value)
        var request = "api/Series/" + e.target.value;
        var url = Global.apiSeries + request;
        axios.get(url).then(response => {
            console.log("Leyendo serie")
            this.setState({
                serieSelec: response.data
            })
        })
    }


    cambioPersonaje = (e) => {
        console.log(e.target.value)
        var request = "api/Personajes/" + e.target.value;
        var url = Global.apiSeries + request;
        axios.get(url).then(response => {
            console.log("Leyendo personaje")
            this.setState({
                persoSelec: response.data
            })
        })
    }

    loadPersonajes() {
        var request = "api/Personajes";
        var url = Global.apiSeries + request;

        axios.get(url).then(response => {
            console.log("Leyendo...")
            this.setState({
                personajes: response.data
            })
        })
    }

    putPersonaje = ()=> { 
        let idPersonaje;
        let idSerie;
        if(this.state.persoSelec && this.state.serieSelec){
            idSerie = this.state.serieSelec.idSerie;
            idPersonaje = this.state.persoSelec.idPersonaje;
            console.log(idSerie + idPersonaje)
        }
        else{
            idSerie = this.selectSeries.current.value
            idPersonaje = this. selectPerosnajes.current.value
            console.log (idSerie + idPersonaje)
        }
        this.setState({idSerie: parseInt(idSerie)})

        let request= "api/Personajes/" + idPersonaje + "/" + idSerie 
        let url = Global.apiSeries + request
        axios.put(url).then( 
            this.setState({status:true})
        )
    }



    componentDidMount() {
        this.loadSeries();
        this.loadPersonajes();
    }



    render() {
        if(this.state.status){

           return <Navigate to={"/serie/" + this.state.idSerie}/>
        }else{
        return (
            <div className='text-center'>
                <h2 className="mt-3 mb-4 ">Cambia un personaje de serie!</h2>
                {
                    this.state.series.length > 0 && this.state.personajes.length > 0 &&

                    <div className='text-center'>
                        <select className="mt-3 border border-secondary rounded p-2" ref={this.selectSeries}
                            onChange={this.cambioSerie}>

                            {this.state.series.map((serie, index) => {
                                return (
                                    <option key={serie.idSerie} value={serie.idSerie}>{serie.nombre}</option>
                                )
                            })}

                        </select> <br />

                        <select className="mt-3 border border-secondary rounded p-2" ref={this.selectPerosnajes}
                        onChange={this.cambioPersonaje}>
                            {this.state.personajes.map((personaje, index) => {
                                return (
                                    <option key={index} value={personaje.idPersonaje}>{personaje.nombre}</option>
                                )
                            })}
                        </select>
                    </div>
                }
                <button className="btn mt-3 btn-warning" onClick={this.putPersonaje}>Cambiar personaje!</button>
                <hr></hr>
                <div className="row">
                    {this.state.serieSelec && (
                        <div className="col-md-6">
                            <img src={this.state.serieSelec.imagen} alt="Serie seleccionada" className="img-fluid" />
                        </div>
                    )}
                    {this.state.persoSelec && (
                        <div className="col-md-6">
                            <img src={this.state.persoSelec.imagen} alt="Personaje seleccionado" className="img-fluid" />
                        </div>
                    )}
                </div>

            </div>
        )
    }
}
}
