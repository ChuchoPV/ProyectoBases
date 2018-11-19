import React from 'react';
import { Table } from 'react-bootstrap';
import { ProductRow } from './product_table_row.component';

// component for the whole products table
export class ProductsTable extends React.Component{
    render(){
        var rows = this.props.products
        .map(function(product, i) {
            return (
                <ProductRow
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
                            <th>ID Alumno</th>
                            <th>Nombre</th>
                            <th>Fecha de Nacimiento</th>
                            <th>Teléfono de Contacto</th>
                            <th>Dirección</th>
                            <th>E-mail</th>
                        </tr>  
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </Table>
        );
    }
}
