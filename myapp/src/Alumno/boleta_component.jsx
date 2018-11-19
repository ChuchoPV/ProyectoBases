import React  from 'react';
import { Table, Button } from 'react-bootstrap';
import { BoletaRow } from './boleta_row';
import $ from 'jquery';

export class BoletaComponent extends React.Component{
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
        this.serverRequest = $.get("http://localhost/~jesusperea/phpFilesCEDAC/boleta.php?CveA="+ this.props.CveA, 
        function (products) {
            this.setState({
                products: products.records
            });
        }.bind(this));
    }

    //on unmount, kill product fetching in case the request is still pending
    componentWillUnmount(){
        this.serverRequest.abort();
    }

    render(){

        var rows = this.state.products
        .map(function(product, i) {
            return (
                <BoletaRow
                    key={i}
                    product={product}
                    changeAppMode={this.props.changeAppMode} 
                    CveA = {this.props.CveA}/>
            );
        }.bind(this));
        
        return(
            <div>
                <button
                    onClick={() => this.props.changeAppMode('read')}
                    className='btn btn-primary m-r-1em'> Ver Alumnos
                </button> 
                <Button bsStyle='primary'
                        onClick={() => this.props.changeAppMode('boletaCreate', this.props.CveA)}> Crear Nueva Entrada</Button>
                <br></br>
                <br></br>   
                <Table striped bordered condensed hover>
                    <thead>
                        <tr>
                        <th>Actividad</th>
                        <th>Calificación</th>
                        <th>Fecha</th>
                        <th>Comentarios</th>
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