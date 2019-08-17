import React from 'react';

const ClientDot = (props) => {
    const style_start = {
        left: `${props.client.startLocation[0]}%`,
        top: `${props.client.startLocation[1]}%`
    }
    const style_end = {
        left: `${props.client.endLocation[0]}%`,
        top: `${props.client.endLocation[1]}%`
    }
    return (
        <div>
            <div className="client-dot" style={style_start}>
                Inicio {props.client.name}
            </div>
            <div className="client-dot" style={style_end}>
                Fin {props.client.name}
            </div>
        </div>
    )

}

export default ClientDot;