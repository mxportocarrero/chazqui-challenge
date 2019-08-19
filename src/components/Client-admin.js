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
        drivers: [],
        availableDrivers: [],
        client:{}
    }


    constructor(props){
        super(props)
        this.requestService = this.requestService.bind(this)
        this.cancelService = this.cancelService.bind(this)
    }

    drawClientInfo(client){
        this.props.drawClientInfo(client)
    }

    // Funcion para validar los campos antes de solicitar los servicios
    validateServiceRequest(){
        // Checking valid Name
        if(!this.textInput.value){
            alert("Llene el nombre")
            return false;
        }
            
        // Checking coordinates
        if( !this.in_start_x.value || (this.in_start_x.value < 0 && this.in_start_x.value > 100) || 
            !this.in_start_y.value || (this.in_start_y.value < 0 && this.in_start_y.value > 100) ||
            !this.in_end_x.value || (this.in_end_x.value < 0 && this.in_end_x.value > 100) ||
            !this.in_end_y.value || (this.in_end_y.value < 0 && this.in_end_y.value > 100) ){
                alert("Escriba las coordenadas de Partida y Destino entre 0 y 100")
                return false;
            }
        return true;
    }

    requestService(){
        // Revisando que las coordenadas existan y sean 
        //console.log(`${this.in_start_x.value},${this.in_start_y.value}`)
        //console.log(`${this.in_end_x.value},${this.in_end_y.value}`)
        if(!this.validateServiceRequest()) return;
        
        const client = {
                name: this.textInput.value,
                startLocation: [this.in_start_x.value,this.in_start_y.value],
                endLocation: [this.in_end_x.value,this.in_end_y.value]
              }

        this.setState({requestState:'searching', client:client})

        this.drawClientInfo(client);

        //console.log(this.props.drivers);

        // Cuando ya se haya encontrado los resultados
        setTimeout(() => this.setState({requestState:'done'}),2000);
        
    }

    cancelService(){
        this.setState({tags: [],
            requestState: "waiting",
            drivers: []})
    }

    // Ordenando por distancia euclidea y
    // filtrando por los requerimientos
    sortAndFilterDrivers(){
        // sorting by euclidean distance
        const drivers = []
        this.props.drivers.forEach( driver => {
            let dist = Math.pow(this.state.client.startLocation[0] - driver.location[0],2)
            dist = dist + Math.pow(this.state.client.startLocation[1] - driver.location[1],2)
            dist = Math.sqrt(dist)
            driver.dist = dist
            //console.log(driver)

            if( typeof this.state.tags === 'undefined' || this.state.tags.length <= 0)
                drivers.push(driver)
            else {
                let flag = true
                this.state.tags.forEach(tag =>{
                    if(typeof driver.adds !== 'undefined' && this.state.tags.length > 0){
                        if(!driver.adds.includes(tag))
                            flag = false
                    } else {
                        flag = false
                    }
                    
                })
                if(flag)
                    drivers.push(driver)
            }
        });

        drivers.sort( (a,b) => (a.dist > b.dist) ? 1 : ((b.dist > a.dist) ? -1 : 0))

        return drivers
    }


    handleCheckboxChange(event){
        const { tags } = this.state
        if(event.target.checked){
            tags.push(event.target.value)
        } else {
            const index = tags.indexOf(event.target.value)
            if(index > -1)
                tags.splice(index,1);
        }
        console.log(tags);
        this.setState({ tags })
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
                        {this.renderSwitchButtons(this.state.requestState)}
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
                const filteredDrivers = this.sortAndFilterDrivers()
                return(
                    <div>
                    Taxis Disponibles
                    {
                        typeof filteredDrivers === 'undefined' || filteredDrivers.length <= 0
                        ? <p>No contamos con un vehiculo disponible para sus requerimientos por el momento</p>
                        :
                            filteredDrivers.map( (driver,index) => {
                            return (
                                <Driver 
                                    driverId={driver.id}
                                    driverName={driver.name}
                                    driverAdds={driver.adds}
                                    driverState={driver.state}
                                    confirmDriver={this.confirmDriver}
                                    driverDistance={driver.dist}
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

    renderSwitchButtons(val){
        switch(val){
            case 'waiting':
                return(
                    <button onClick={this.requestService}>Empezar búsqueda</button>
                )
            case 'searching':
                return(
                    <div></div>
                )
            case 'done':
                return(
                    <div>
                    <button onClick={this.requestService}>Actualizar Filtros</button>
                    <button onClick={this.cancelService} style={{background:"#f00"}}>Cancelar</button>
                    </div>
                )
            default: break;
        }
    }

}

export default ClientAdmin;
