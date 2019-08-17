import React from 'react';
//import logo from './logo.svg';
import './App.css';
import DriverDots from './components/Driver-dot.js';
import DriverAdmin from './components/Driver-admin.js';

import ClientDots from './components/Client-dot.js';
import ClientAdmin from './components/Client-admin';

// Librerias Firebase
import firebase from 'firebase';
import { DB_CONFIG } from './config.js';
import 'firebase/database';


class App extends React.Component {

  state = {
    drivers: [
      // {
      //   id: 1,
      //   name: "Pedro",
      //   location: getRandomCoordinates(),
      //   adds: ["pets","candies"],
      //   active:true
      // },
      // {
      //   id: 2,
      //   name: "Tomas",
      //   location: getRandomCoordinates(),
      //   adds: ["pets"],
      //   active:false,
      // },
      // {
      //   id: 3,
      //   name: "Miguel",
      //   location: getRandomCoordinates(),
      //   adds: ["music"],
      //   active:false,
      // },      
    ],
    client: {},
    tags: []
  }

  constructor(){
    super();

    //Firebase Connection
    this.app_conn = firebase.initializeApp(DB_CONFIG);
    this.driversRef = this.app_conn.database().ref('drivers');
    this.tagsRef = this.app_conn.database().ref('tags');

    // Functions
    this.drawClientInfo = this.drawClientInfo.bind(this);
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
              state:childSnapShot.val().state,
            })
          })
          this.setState({drivers})
        })

        // Recibiendo los tags
        this.tagsRef.on('value', snapShot =>{
          const tags = []
          snapShot.forEach( child => {
            tags.push(child.val())
          })
          this.setState({tags})
        })
  }

  drawClientInfo(client){
    this.setState({client: client})
  }

  availableDrivers(){
    // Seleccionaremos a los drivers disponibles
    const drivers = []
    this.state.drivers.forEach( driver =>{
      if(driver.state)
        drivers.push(driver)
    })
    return drivers;
  }

  render(){
    return (
      <div className="chazqui-app">
        <div className="app-header">
          <h1>Chazqui Challenge</h1>
        </div>
        <div className="app-body">
          <ClientAdmin 
            tags={this.state.tags}
            drawClientInfo={this.drawClientInfo}
            drivers={this.availableDrivers()}/>

          <div className="map-area">
            <DriverDots drivers={this.state.drivers} />
            {
              Object.entries(this.state.client).length !== 0
              ? <ClientDots client={this.state.client} />
              : <div></div>
            }
          </div>

          <DriverAdmin 
            tags={this.state.tags}
            app_conn={this.app_conn}/>

        </div>
        <div className="app-footer">
          Desarrollado por Max W. Portocarrero
        </div>
      </div>
    );
  }
  
} // Eof Class App

export default App;
