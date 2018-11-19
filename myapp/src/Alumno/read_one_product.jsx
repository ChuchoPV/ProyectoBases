import React from 'react';
import $ from 'jquery';

// component that contains the logic to read one product
export class ReadOneProductComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            CveA: '',
            nombre: '',
            fechanaci: '',
            tel :'',
            direccion : '',
            mail : ''
        }
    }
     
    // on mount, read product data and them as this component's state
    componentDidMount(){
     
        var CveA = this.props.CveA;
     
        this.serverRequestProd = $.get("http://localhost/~jesusperea/phpFilesCEDAC/read_one.php?CveA=" + CveA,
            function (product) {
                this.setState({CveA: product.CveA});
                this.setState({nombre: product.nombre});
                this.setState({fechanaci: product.fechanaci});
                this.setState({tel: product.tel});
                this.setState({direccion: product.direccion});
                this.setState({mail: product.mail});
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
                    onClick={() => this.props.changeAppMode('read')}
                    className='btn btn-primary margin-bottom-1em'>
                    Read Products
                </button>
     
                <form onSubmit={this.onSave}>
                    <table className='table table-bordered table-hover'>
                        <tbody>
                        <tr>
                            <td>ID Alumno</td>
                            <td>{this.state.CveA}</td>
                        </tr>
     
                        <tr>
                            <td>Nombre</td>
                            <td>{this.state.nombre}</td>
                        </tr>
     
                        <tr>
                            <td>Fecha de Nacimeinto</td>
                            <td>{this.state.fechanaci}</td>
                        </tr>

                        <tr>
                            <td>Teléfono de Contacto </td>
                            <td>{this.state.tel}</td>
                        </tr>

                        <tr>
                            <td>Dirección</td>
                            <td>{this.state.direccion}</td>
                        </tr>

                        <tr>
                            <td>E-mail</td>
                            <td>{this.state.mail}</td>
                        </tr>

                        </tbody>
                    </table>
                </form>
            </div>
        );
    }

}