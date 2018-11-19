import React from 'react';
import $ from 'jquery';

export class CreateProductComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            nombre: '',
            CveA: '',
            fechanaci: '',
            direccion: '',
            tel : '',
            mail : '',
            successCreation: null
        }

        this.onNombreChange = this.onNombreChange.bind(this);
        this.onCveAChange = this.onCveAChange.bind(this);
        this.onfechanaciChange = this.onfechanaciChange.bind(this);
        this.onDireccionChange = this.onDireccionChange.bind(this);
        this.onTelChange = this.onTelChange.bind(this);
        this.onMailChange = this.onMailChange.bind(this);
        this.onSave = this.onSave.bind(this);
    }
    
    // handle form field changes here
    // handle nombre change
    onNombreChange(e){
        this.setState({nombre: e.target.value});
    }
    
    // handle fechanaci change
    onfechanaciChange(e){
        this.setState({fechanaci: e.target.value});
    }

    // handle CveA change
    onCveAChange(e){
        this.setState({CveA: e.target.value});
    }

    // handle CveA change
    onDireccionChange(e){
        this.setState({direccion: e.target.value});
    }

    // handle CveA change
    onTelChange(e){
        this.setState({tel: e.target.value});
    }

    // handle CveA change
    onMailChange(e){
        this.setState({mail: e.target.value});
    }

    // handle save button clicked
    onSave(e){
    
        // data in the form
        var form_data = {
            nombre: this.state.nombre,
            fechanaci: this.state.fechanaci,
            CveA: this.state.CveA,
            direccion: this.state.direccion,
            tel: this.state.tel,
            mail: this.state.mail
        };
    
        // submit form data to api
        $.ajax({    
            url: "http://localhost/~jesusperea/phpFilesCEDAC/create.php",
            type : "POST",
            //contentType : 'application/json',
            data : JSON.stringify(form_data),
            success : function(response) {
    
                // api message
                this.setState({successCreation: response['message']});
    
                // empty form
                this.setState({nombre: ""});
                this.setState({fechanaci: ""});
                this.setState({CveA: ""});
                this.setState({tel: ""});
                this.setState({direccion: ""});
                this.setState({mail: ""});
    
            }.bind(this),
            error: function(xhr, resp, text){
                // show error to console

                console.log(xhr, resp, text);
            }
        });
    
        e.preventDefault();
    }
    // render component here
    render(){
        /*
        - tell the user if a product was created
        - tell the user if unable to create product
        - button to go back to products list
        - form to create a product
        */
        return (
        <div>
            {
                this.state.successCreation === "Product was created." ?
                    <div className='alert alert-success'>
                        Product was saved.
                    </div>
                : null
            }
     
            {
                this.state.successCreation === "Unable to create product." ?
                    <div className='alert alert-danger'>
                        Unable to save product. Please try again.
                    </div>
                : null
            }
     
            <button
                onClick={() => this.props.changeAppMode('read')}
                className='btn btn-primary margin-bottom-1em'> Read Alumnos
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
                        <td>Matrícula</td>
                        <td>
                            <input
                            type='text'
                            className='form-control'
                            value={this.state.CveA}
                            required
                            onChange={this.onCveAChange}/>
                        </td>
                    </tr>

                    <tr>
                        <td>Fecha de Nacimeinto</td>
                        <td>
                            <input
                            type='text'
                            className='form-control'
                            value={this.state.fechanaci}
                            required
                            onChange={this.onfechanaciChange}/>
                        </td>
                    </tr>

                    <tr>
                        <td>Teléfono de Contacto</td>
                        <td>
                            <input
                            type='text'
                            className='form-control'
                            value={this.state.tel}
                            required
                            onChange={this.onTelChange}/>
                        </td>
                    </tr>

                    <tr>
                        <td>Dirección</td>
                        <td>
                            <input
                            type='text'
                            className='form-control'
                            value={this.state.direccion}
                            required
                            onChange={this.onDireccionChange}/>
                        </td>
                    </tr>
     
                    <tr>
                        <td>E-mail</td>
                        <td>
                            <input
                            type='text'
                            className='form-control'
                            value={this.state.mail}
                            required
                            onChange={this.onMailChange}/>
                        </td>
                    </tr>

                    <tr>
                        <td></td>
                        <td>
                            <button
                            className='btn btn-primary'
                            onClick={this.onSave}>Save</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </form>
        </div>
        );
    }
}