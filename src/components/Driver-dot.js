import React from 'react';

// Por mientras lo pondremos como una funcion

const DriverDot = (props) => {
    return (
        <div>
            {props.drivers.map( driver => {
                const style = {
                    left: `${driver.location[0]}%`,
                    top: `${driver.location[1]}%`
                }
                if(!driver.state)
                    style.background = "#777"
                return (
                <div className="driver-dot" style={style} key={driver.name}>
                    {driver.name}
                </div>
                )
                })
            }
        </div>
    )
}

export default DriverDot; 