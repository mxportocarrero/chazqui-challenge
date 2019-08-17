import React from 'react'
import './Client-admin.css'
import ClientInstructions from './Client-instructions.js'
import Driver from './Driver.js';

import shortid from 'shortid'

class ClientAdmin extends React.Component{

    // requestState: "waiting, searching"
    state = {
        tags: [],
        requestState: "waiting",
        drivers: []
    }


    constructor(props){
        super(props)
        this.requestService = this.requestService.bind(this)
    }

    drawClientInfo(client){
        this.props.drawClientInfo(client)
    }

    // Funcion para validar los campos antes de solicitar los servicios
    validateServiceRequest(){
        // Checking valid Name
        if(!this.textInput.value)
            alert("Llene el nombre")
        // Checking coordinates
        if( !this.in_start_x.value || (this.in_start_x.value < 0 && this.in_start_x.value > 100) || 
            !this.in_start_y.value || (this.in_start_y.value < 0 && this.in_start_y.value > 100) ||
            !this.in_end_x.value || (this.in_end_x.value < 0 && this.in_end_x.value > 100) ||
            !this.in_end_y.value || (this.in_end_y.value < 0 && this.in_end_y.value > 100) )
                alert("Escriba las coordenadas de Partida y Destino entre 0 y 100")

    }

    requestService(){
        // Revisando que las coordenadas existan y sean 
        //console.log(`${this.in_start_x.value},${this.in_start_y.value}`)
        //console.log(`${this.in_end_x.value},${this.in_end_y.value}`)
        this.validateServiceRequest();
        this.setState({requestState:'searching'})

        const client = {
                name: this.textInput.value,
                startLocation: [this.in_start_x.value,this.in_start_y.value],
                endLocation: [this.in_end_x.value,this.in_end_y.value]
              }

        this.drawClientInfo(client);

        //console.log(this.props.drivers);

        // Cuando ya se haya encontrado los resultados
        setTimeout(() => this.setState({requestState:'done'}),2000);
        
    }

    handleCheckboxChange(event){
        const { tags } = this.state
        if(event.target.checked){
            tags.push(event.target.value)
            this.setState({ tags })
        } else {
            const index = tags.indexOf(event.target.value)
            if(index > -1)
                tags.splice(index,1);
        }
        console.log(tags);
    }

    render(){
        return (
            <div className="client-admin">
                <ClientInstructions/>
                <div className="row">
                    <div className="column left">
                        <h4>Info del Cliente</h4>
                        Nombre:<br></br>
                        <input ref={ input => this.textInput = input} placeholder="Escriba su Nombre" type="text"/><br></br>
                        Requerimientos:<br></br>
                        {
                            this.props.tags.map( tag => {
                                return (
                                    <div key={tag}>
                                        <input
                                            type="checkbox"
                                            name="check_me"
                                            value={tag}
                                            onChange={val => this.handleCheckboxChange(val)}>
                                        </input>
                                        <label>{tag}</label>
                                    </div>
                                    
                                )
                            })
                        }
                        <div>
                        Partida:&nbsp;
                        <input className="input-coord" ref={ in_start_x => this.in_start_x = in_start_x} type="text" placeholder="x"></input>
                        <input className="input-coord" ref={ in_start_y => this.in_start_y = in_start_y} type="text" placeholder="y"></input>
                        &nbsp;Destino:&nbsp;
                        <input className="input-coord" ref={ in_end_x => this.in_end_x = in_end_x} type="text" placeholder="x"></input>
                        <input className="input-coord" ref={ in_end_y => this.in_end_y = in_end_y} type="text" placeholder="y"></input>
                        </div>
                        <button onClick={this.requestService}>Solicitar Servicio</button>
                    </div>
                    <div className="column right">
                        {this.renderSwitch(this.state.requestState)}
                    </div>
                </div>
            </div>
            
        )
    }

    renderSwitch(val){
        switch(val){
            case 'waiting':
                return(
                    <div>Esperando su solicitud</div>
                )
            case 'searching':
                return(
                    <div>searching</div>
                )
            case 'done':
                return(
                    <div>
                    Taxis Disponibles
                    {
                        typeof this.props.drivers === 'undefined' || this.props.drivers.length <= 0
                        ? <p>No contamos con un vehiculo disponible para sus requerimientos por el momento</p>
                        :
                            this.props.drivers.map( (driver,index) => {
                            return (
                                <Driver 
                                    driverId={driver.id}
                                    driverName={driver.name}
                                    driverAdds={driver.adds}
                                    driverState={driver.state}
                                    confirmDriver={this.confirmDriver}
                                    key={shortid.generate()}
                                />
                            )
                            })
                    }
                    </div>
                )
            default: break;
        }
    }

}

export default ClientAdmin;
