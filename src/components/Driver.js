import React from 'react'
import './Driver.css'

// Este el componente que se renderizara en la parte de administracion

class Driver extends React.Component{

    constructor(props){
        super(props)
        this.driverName = props.driverName
        this.driverId = props.driverId
        this.driverAdds = props.driverAdds
        this.driverState = props.driverState
    }

    handleDelete(id){
        //console.log(id)
        this.props.deleteDriver(id)
    }

    handleConfirm(id){
        console.log("Confirmando Taxi")
    }


    render(){
        return (
            <div className="Driver">
                <div className="info">
                    <div>Name: &nbsp; {this.driverName}</div>
                    <div>Estado:
                        {
                            this.driverState
                            ? " Libre"
                            : " Ocupado"
                        }
                    </div>
                    <div>Tags: &nbsp;
                    {
                        // Revisamos si el Driver tiene algun Implemento
                        typeof this.driverAdds !== 'undefined' && this.driverAdds.length > 0
                        ? this.driverAdds.map((add,i) =>{
                            return (
                            <div className="tags" key={i}>
                                <span className="tags-span">{add}</span>&nbsp;
                            </div>
                            )
                        })
                        :<div className="tags" >
                            <span className="tags-none">none</span>&nbsp;
                        </div>
                    }
                    {
                        typeof this.props.deleteDriver !== 'undefined'
                        ? <div><span className="delete-span" onClick={() => this.handleDelete(this.driverId)}>Eliminar</span></div>
                        : <div><span className="confirm-span" onClick={() => this.handleConfirm(this.driverId)}>Confirmar</span></div>
                    }
                    
                    </div>
                </div>
                
            </div>
        )
        
    }
}

export default Driver;