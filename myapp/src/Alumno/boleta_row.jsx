import React from 'react';
import $ from 'jquery';

export class BoletaRow extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            CveAct : ''
        }
    }

    componentDidMount(){
        var CveAct = this.props.product.nombrem;
        this.serverRequestProd = $.get("http://localhost/~jesusperea/phpFilesCEDAC/Materias/clave_materia.php?nombrem=" + CveAct,
        function (product) {
            this.setState({CveAct: product.CveAct});
        }.bind(this));
    }

    render() {
        return (
            <tr>
                <td>{this.props.product.nombrem}</td>
                <td>{this.props.product.calificacion}</td>
                <td>{this.props.product.fecha}</td>
                <td>{this.props.product.comments}</td>
                <td>
                <button
                    onClick={() => this.props.changeAppMode('readOneBoleta', this.props.CveA, this.state.CveAct, this.props.product.fecha)}
                    className='btn btn-info m-r-1em'> Read Info
                </button>   
                <button
                    onClick={() => this.props.changeAppMode('updateBoleta', this.props.CveA, this.state.CveAct, this.props.product.fecha)}
                    className='btn btn-primary m-r-1em'> Edit
                </button>
                <button
                    onClick={() => this.props.changeAppMode('deleteBoleta', this.props.CveA, this.state.CveAct, this.props.product.fecha)}
                    className='btn btn-danger'> Delete
                </button>
               
            </td>
            </tr>

        );
    }
}