import React from 'react';
import $ from 'jquery';

// component that contains the logic to update a product
export class UpdateProductComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            CveA: this.props.CveA,
            nombre: '',
            fechanaci: '',
            direccion :'',
            tel :'',
            mail: '',
            successUpdate: null
        }
        this.componentDidMount = this.componentDidMount.bind(this);
        this.onNombreChange = this.onNombreChange.bind(this);
        this.onfechanaciChange = this.onfechanaciChange.bind(this);
        this.onDireccionChange = this.onDireccionChange.bind(this);
        this.onTelChange = this.onTelChange.bind(this);
        this.onMailChange = this.onMailChange.bind(this);
        this.onSave = this.onSave.bind(this);
    }
     
    // on mount, fetch all categories and one product data to stored them as this component's state
    componentDidMount(){

        // read one product data
        var CveA = this.props.CveA;
        this.serverRequestProd = $.get("http://localhost/~jesusperea/phpFilesCEDAC/read_one.php?CveA=" + CveA,
            function (product) {
                this.setState({nombre: product.nombre});
                this.setState({fechanaci: product.fechanaci});  
                this.setState({tel: product.tel});
                this.setState({direccion: product.direccion});
                this.setState({mail: product.mail});
            }.bind(this));
        $('.page-header h1').text('Update product');
    }
         
    // handle nombre change
    onNombreChange(e){
        this.setState({nombre: e.target.value});
    }
    
    // handle fechanaci change
    onfechanaciChange(e){
        this.setState({fechanaci: e.target.value});
    }

    onDireccionChange(e){
        this.setState({direccion: e.target.value});
    }

    onTelChange(e){
        this.setState({tel: e.target.value});
    }

    onMailChange(e){
        this.setState({mail: e.target.value});
    }
    
    // handle save changes button here
    onSave(e){
        // submit form data to api
        $.ajax({
            url: "http://localhost/~jesusperea/phpFilesCEDAC/updateTest.php?CveA=" + this.state.CveA + 
                                    "&nombre=" + this.state.nombre +
                                    "&fechanaci="+ this.state.fechanaci +
                                    "&tel="+ this.state.tel+
                                    "&direccion="+ this.state.direccion+
                                    "&mail="+ this.state.mail
        });
        this.setState({ successUpdate : 'Product was updated.' });
        e.preventDefault();
    }
    
    // render component here
    render(){
        return (
            <div>
                {
                    this.state.successUpdate === "Product was updated." ?
                        <div className='alert alert-success'>
                            Product was updated.
                        </div>
                    : null
                }
     
                {
                    this.state.successUpdate === "Unable to update product." ?
                        <div className='alert alert-danger'>
                            Unable to update product. Please try again.
                        </div>
                    : null
                }
     
                <button
                    onClick={() => this.props.changeAppMode('read')}
                    className='btn btn-primary margin-bottom-1em'>
                    Read Alumnos
                </button>
     
                <form onSubmit={this.onSave}>
                    <table className='table table-bordered table-hover'>
                        <tbody>
                        <tr>
                            <td>Nombre</td>
                            <td>
                                <input
                                    type='text'
                                    className='form-control'
                                    value={this.state.nombre}
                                    required
                                    onChange={this.onNombreChange} />
                            </td>
                        </tr>
     
                        <tr>
                            <td>Fecha de Nacimiento</td>
                            <td>
                                <textarea
                                    type='text'
                                    className='form-control'
                                    required
                                    value={this.state.fechanaci}
                                    onChange={this.onfechanaciChange}></textarea>
                            </td>
                        </tr>

                        <tr>
                            <td>Dirección</td>
                            <td>
                                <textarea
                                    type='text'
                                    className='form-control'
                                    required
                                    value={this.state.direccion}
                                    onChange={this.onDireccionChange}></textarea>
                            </td>
                        </tr>

                         <tr>
                            <td>Telefono</td>
                            <td>
                                <textarea
                                    type='text'
                                    className='form-control'
                                    required
                                    value={this.state.tel}
                                    onChange={this.onTelChange}></textarea>
                            </td>
                        </tr>

                         <tr>
                            <td>Mail</td>
                            <td>
                                <textarea
                                    type='text'
                                    className='form-control'
                                    required
                                    value={this.state.mail}
                                    onChange={this.onMailChange}></textarea>
                            </td>
                        </tr>

                        <tr>
                            <td></td>
                            <td>
                                <button
                                    className='btn btn-primary'
                                    onClick={this.onSave}>Save Changes</button>
                            </td>
                        </tr>
     
                        </tbody>
                    </table>
                </form>
            </div>
        );
    }

}