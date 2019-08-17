import React from 'react'

export default () => {
    return (
        <div className="client-instructions">
            <h4>Bienvenido!</h4>
            <p>Por favor, Lea las siguientes instrucciones antes de pedir su Taxi</p>
            <h4>Instrucciones:</h4>
            <ul>
                <li>Paso 1: Llene los datos del formulario y seleccione sus requerimientos en el servicio</li>
                <li>Paso 2: Haga Click en solicitar servicio</li>
                <li>Paso 3: Espere mientras el sistema busca las mejores opciones.
                    Se consultara la disponibilidad de los taxis seleccionados para realizar el servicio
                </li>
                <li>Paso 4: El sistema le ira mostrando opciones de taxis. Haga click en confirmar en el que Ud desee.
                Si rechaza todas las opciones o sino no hay taxis disponibles. Intente nuevamente en un momento.
                </li>
            </ul>
            <h4>Uso del Mapa</h4>
            <p>El Mapa muestra la ubicacion de los taxis en tiempo-real. Azul: taxis libres, Gris: taxis ocupados</p>
            <p>Cuando Ud. Solicite el servicio su punto de partida se colocara en colo Rojo y su punto de llegada en Verde</p>
            <p>Al confirmar el servicio. El taxi seleccionado comenzara su viaje hacia Ud. para realizar el servicio</p>
            <p>El mapa tiene Coordenadas invertidas. (0,0) esquina superior izquierda y (100,100) esquina inferior derecha</p>
        </div>
    )
}