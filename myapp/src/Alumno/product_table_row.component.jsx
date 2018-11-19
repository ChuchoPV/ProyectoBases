import React from 'react';
import { Button } from 'react-bootstrap';


// component that renders a single product
export class ProductRow extends React.Component{
    render() {
    return (
        <tr>
            <td>{this.props.product.CveA}</td>
            <td>{this.props.product.nombre}</td>
            <td>{this.props.product.fechanaci}</td>
            <td>{this.props.product.tel}</td>
            <td>{this.props.product.direccion}</td>
            <td>{this.props.product.mail}</td>
            <td>
                <button
                    onClick={() => this.props.changeAppMode('readOne', this.props.product.CveA)}
                    className='btn btn-info m-r-1em'> Read Info
                </button>   
                <Button
                    onClick={() => this.props.changeAppMode('boleta', this.props.product.CveA)}
                    bsStyle="success"
                    className='m-r-1em'> Boleta
                </Button>
                <button
                    onClick={() => this.props.changeAppMode('update', this.props.product.CveA)}
                    className='btn btn-primary m-r-1em'> Edit
                </button>
               
            </td>
        </tr>
        );
    }
}