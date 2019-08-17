import React from 'react'
import './Driver-create.css'

class DriverCreate extends React.Component{

    state = {
        tags: []
    }

    constructor(props){
        super(props)
        this.props = props
        this.addDriver = this.addDriver.bind(this)
    }

    addDriver(){
        console.log(this.state.tags)
        if(this.textInput.value){
            this.props.addDriver(this.textInput.value, this.state.tags);
        }else{
            alert("Llene el nombre");
        }
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
        return(
            <div className="driver-form">
                Name:<br></br>
                <input ref={ input => this.textInput = input} placeholder="Escriba su Nombre" type="text"/><br></br>
                Addons:<br></br>
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
                <button onClick={this.addDriver}>Create Taxi</button>
            </div>
        )
    }

}

export default DriverCreate;