import React, { Component } from 'react';

class ListaDetailed extends Component {
    constructor(props) {
        super(props);
       
    }
    render() {
        return (
            <div>
            
         
    
            <div className="card" style={{width: "18rem"}}>
                <img  src={this.props.datos.poster} />
                <div className="card-body">
            <h5 className="card-title">{this.props.datos.name} </h5>
        <p className="card-text">{this.props.datos.description}</p>
        </div>
        </div>
            </div>
        );
    }
}

export default ListaDetailed;