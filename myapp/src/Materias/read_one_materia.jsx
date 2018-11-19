import React from 'react'
import $ from 'jquery'
import { Table } from 'react-bootstrap';

export class ReadOneMateriaComponent extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            CveM : '',
            nombre: ''
        }
    }
    componentDidMount(){

        var CveM = this.props.CveM;

        this.serverRequestProd = $.get("http://localhost/~jesusperea/phpFilesCEDAC/Materias/read_one_materia.php?CveM=" + CveM,
            function (product) {
                this.setState({nombre: product.nombre});
                this.setState({CveM: product.CveM});
            }.bind(this));

        $('.page-header h1').text('Read Product');
    }

    // on unmount, kill categories fetching in case the request is still pending
    componentWillUnmount(){
        this.serverRequestProd.abort();
    }
    render(){
        return (
            <div>
                <button
                    onClick={() => this.props.changeAppMode('read')}
                    className='btn btn-primary margin-bottom-1em'>
                    Ver Actividades
                </button>

                <form onSubmit={this.onSave}>
                    <Table className='table table-bordered table-hover'>
                        <tbody>
                        <tr>
                            <td>Clave de Actividad</td>
                            <td>{this.state.CveM}</td>
                        </tr>
                        <tr>
                            <td>Nombre</td>
                            <td>{this.state.nombre}</td>
                        </tr>
                        </tbody>
                    </Table>
                </form>
            </div>
        );
    }
}