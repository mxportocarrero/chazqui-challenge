import React from 'react'
import Driver from './Driver.js';
import DriverCreate from './Driver-create.js';

import 'firebase/database';

import shortid from 'shortid'

// Formula que devuelve coordenadas aleatorias entre 1 y 98 (inclusive)
const getRandomCoordinates = () => {
    let min = 1;
    let max = 98;
    let x = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
    let y = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  
    return [x,y]
  }

class DriverAdmin extends React.Component {

    state = {
        drivers: []
    }

    constructor(props){
        super(props)
        this.props = props

        //Firebase
        this.driversRef = this.props.app_conn.database().ref('drivers');

        // Functions
        this.addDriver = this.addDriver.bind(this);
        this.deleteDriver = this.deleteDriver.bind(this);
        
    }

    // Eventos de React
    componentDidMount(){
        //const { drivers } = this.state;
        // Como escuchamos todos los updates de la lista
        // tenemos que refrescar nuestra lista en el state
        // asi cuando se agregue o se borre siempre se mostraran
        // las entradas verdaderas
        this.driversRef.on('value',snapShot => {
          const drivers = []
          snapShot.forEach( childSnapShot => {
            drivers.push({
              id: childSnapShot.key,
              name: childSnapShot.val().name,
              location: childSnapShot.val().location,
              adds: childSnapShot.val().adds,
              active:childSnapShot.val().active,
            })
          })
          this.setState({drivers})
        })
    }

    checkActiveDrivers(){
        let flag = false;
        for(let i = 0; i < this.state.drivers.length;i++){
            if(this.state.drivers[i].active){
                flag = true;
                break;
            }
        }
        return flag;
    }

    addDriver(driverName,driverTags){
        // let { drivers } = this.state;
        // drivers.push({
        //   id: drivers.length + 1,
        //   name: driverName,
        //   location: getRandomCoordinates(),
        //   adds: ["music"],
        //   active:true,
        // })
    
        // this.setState({ drivers });
        const newDriver = this.driversRef.push()
        newDriver.set({
          id: newDriver.key,
          name: driverName,
          location: getRandomCoordinates(),
          adds: driverTags,
          active:true,
        })
    }

    deleteDriver(id){
        this.driversRef.child(id).remove();
    }

    render(){
        return (
            <div className="drivers-admin">
                <h4>Drivers Admin Panel</h4>
                <div className="row">
                    <div className="column left">
                        <DriverCreate
                            tags={this.props.tags}
                            addDriver={this.addDriver}/>
                    </div>
                    <div className="column right">
                    Taxis Registrados
                    {
                        typeof this.state.drivers === 'undefined' || this.state.drivers.length <= 0
                        ? <p>Cargando..</p>
                        :
                            this.state.drivers.map( (driver,index) => {
                            return (
                                <Driver 
                                    driverId={driver.id}
                                    driverName={driver.name}
                                    driverAdds={driver.adds}
                                    driverActive={driver.active}
                                    deleteDriver={this.deleteDriver}
                                    key={shortid.generate()}
                                />
                            )
                            })
                    }
                    </div>
                </div>
                
            </div>
        )
    }

}

export default DriverAdmin;