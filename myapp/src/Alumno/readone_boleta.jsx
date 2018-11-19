import React from 'react';
import $ from 'jquery';

// component that contains the logic to read one product
export class ReadOneBoletaComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            materia: '',
            calificacion: '',
            fecha: '',
            comentarios :''
        }
    }
     
    // on mount, read product data and them as this component's state
    componentDidMount(){
     
        var CveAlu = this.props.CveA;
        var CveAct = this.props.CveAct;
        var fecha = this.props.fechab;

        this.serverRequestProd = $.get("http://localhost/~jesusperea/phpFilesCEDAC/readone_boleta.php?CveAlu="+CveAlu
                                                        +"&CveAct="+CveAct+"&fecha="+fecha,
            function (product) {
                this.setState({materia: product.CveAct});
                this.setState({calificacion: product.evaluacion});
                this.setState({fecha: product.fecha});
                this.setState({comentarios: product.comments});
            }.bind(this));

     
        $('.page-header h1').text('Read Product');
    }
     
    // on unmount, kill categories fetching in case the request is still pending
    componentWillUnmount(){
        this.serverRequestProd.abort();
    }
     
    // render component html will be here
    render(){
        return (
            <div>
                <button
                    onClick={() => this.props.changeAppMode('boleta', this.props.CveA)}
                    className='btn btn-primary margin-bottom-1em'>
                    Ver boleta
                </button>
     
                <form onSubmit={this.onSave}>
                    <table className='table table-bordered table-hover'>
                        <tbody>
                        <tr>
                            <td>Actividad</td>
                            <td>{this.state.materia}</td>
                        </tr>
     
                        <tr>
                            <td>calificacion</td>
                            <td>{this.state.calificacion}</td>
                        </tr>
     
                        <tr>
                            <td>Fecha</td>
                            <td>{this.state.fecha}</td>
                        </tr>

                        <tr>
                            <td>Comentarios </td>
                            <td>{this.state.comentarios}</td>
                        </tr>

                        </tbody>
                    </table>
                </form>
            </div>
        );
    }

}