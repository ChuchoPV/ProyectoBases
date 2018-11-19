import React from 'react';

export class MateriaRow extends React.Component{
    render() {
        return (
            <tr>
                <td>{this.props.product.CveM}</td>
                <td>{this.props.product.nombre}</td>
                <td>
                <button
                    onClick={() => this.props.changeAppMode('readOne', this.props.product.CveM)}
                    className='btn btn-info m-r-1em'> Read Info
                </button>   
                <button
                    onClick={() => this.props.changeAppMode('update', this.props.product.CveM)}
                    className='btn btn-primary m-r-1em'> Edit
                </button>
                <button
                    onClick={() => this.props.changeAppMode('delete', this.props.product.CveM)}
                    className='btn btn-danger'> Delete
                </button>
               
                </td>
            </tr>

        );
    }       
}