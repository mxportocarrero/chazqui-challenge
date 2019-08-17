import React from 'react'
import './Client-admin.css'
import ClientInstructions from './Client-instructions.js'

class ClientAdmin extends React.Component{

    // requestState: "waiting, searching"
    state = {
        tags: [],
        start:[0,0],
        end:[0,0],
        requestState: "waiting"
    }


    constructor(props){
        super(props)
        this.requestService = this.requestService.bind(this)
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
        this.setState({start:[this.in_start_x.value,this.in_start_y.value],
                        end:[this.in_end_x.value,this.in_end_y.value],
                        requestState:'searching'})


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
                    <div>waiting</div>
                )
            case 'searching':
                return(
                    <div>searching</div>
                )
            case 'done':
                return(
                    <div>search done</div>
                )
            default: break;
        }
    }

}

export default ClientAdmin;