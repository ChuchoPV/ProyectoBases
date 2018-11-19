import React from 'react'
import { MateriaRow } from "./materia_row.jsx";
import { Table } from 'react-bootstrap';

export class MateriasTable extends React.Component{
    render(){
        var rows = this.props.products
            .map(function(product, i) {
                return (
                    <MateriaRow
                        key={i}
                        product={product}
                        changeAppMode={this.props.changeAppMode} />
                );
    }.bind(this));
        return(
            !rows.length
                ? <div className='alert alert-danger'>No products found.</div>
                :
                <Table className='table table-bordered table-hover'>
                    <thead>
                    <tr>
                        <th>Clave Actividad</th>
                        <th>Nombre</th>                    
                    </tr>
                    </thead>
                    <tbody>
                    {rows}
                    </tbody>
                </Table>
        );
    }
}