import React  from 'react';
import { Table, Button } from 'react-bootstrap';
import { MateriaRow } from './materia_row';
import $ from 'jquery';

export class MateriaComponent extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            products : [],
            rows : [],
            flag : this.props.rows
        }
    }

    //on mount, fetch all products and stored them as this component's state
    componentDidMount(){
        this.serverRequest = $.get("http://localhost/~jesusperea/phpFilesCEDAC/materia.php?CveA="+ this.props.CveA,
            function (products) {
                this.setState({
                    products: products.records
                });
            }.bind(this));
    }

    declareRows(rows){

    }

    //on unmount, kill product fetching in case the request is still pending
    componentWillUnmount(){
        this.serverRequest.abort();
    }

    render(){
        var rows = this.state.products
            .map(function(product, i) {
                return (
                    <MateriaRow
                        key={i}
                        product={product}
                        changeAppMode={this.props.changeAppMode} />
                );
            }.bind(this));

        return(
            <div>
                <button
                    onClick={() => this.props.changeAppMode('read')}
                    className='btn btn-primary m-r-1em'> Read Alumnos
                </button>
                <Button bsStyle='primary'
                        onClick={() => this.props.changeAppMode('materiaCreate')}> Crear Nueva Entrada</Button>
                <br></br>
                <br></br>
                <Table striped bordered condensed hover>
                    <thead>
                    <tr>
                        <th>Materia</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rows}
                    </tbody>
                </Table>
            </div>
        );
    }
}