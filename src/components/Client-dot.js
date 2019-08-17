import React from 'react';

const ClientDot = (props) => {
    return (
        <div>
            {
                props.clients.map( client => {
                    const style = {
                        left: `${client.location[0]}%`,
                        top: `${client.location[1]}%`
                    }
                    
                    if(!client.active)
                        style.background = "#777"

                    return (
                        <div className="client-dot"
                        key={client.name}
                        style={style}>
                            {client.name}
                        </div>
                    )
                })
            }
        </div>
    )

}

export default ClientDot;