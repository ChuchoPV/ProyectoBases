import React from 'react'
import $ from 'jquery'

export class CreateMateriaPComponent extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            nombre:'',
            CveM: '',
            successCreation:null
        }

        this.onNombreChange = this.onNombreChange.bind(this);
        this.onCveMChange = this.onCveMChange.bind(this);
        this.onSave =this.onSave.bind(this);
    }
    onNombreChange(e){
        this.setState({nombre: e.target.value})
    }
    onCveMChange(e){
        this.setState({CveM: e.target.value});
    }
    onSave(e){

        // data in the form
        var form_data = {
            nombre: this.state.nombre,
            CveM : this.state.CveM
        };

        // submit form data to api
        $.ajax({
            url: "http://localhost/~jesusperea/phpFilesCEDAC/Materias/create_materia.php",
            type : "POST",
            //contentType : 'application/json',
            data : JSON.stringify(form_data),
            success : function(response) {

                // api message
                this.setState({successCreation: response['message']});

                // empty form
                this.setState({nombre: ""});
                this.setState({CveM: ""});

            }.bind(this),
            error: function(xhr, resp, text){
                // show error to console
                console.log(xhr, resp, text);
            }
        });

        e.preventDefault();
    }
    render(){
        return (
            <div>
                {
                    this.state.successCreation === "Product was created." ?
                        <div className='alert alert-success'>
                            Materia creada exitosamente.
                        </div>
                        : null
                }

                {

                    this.state.successCreation === "Unable to create product." ?
                        <div className='alert alert-danger'>
                            No ha sido posible crear la materia. Asegurate que esten todos los campos llenos
                        </div>
                        : null
                }

                <button
                    onClick={() => this.props.changeAppMode('read')}
                    className='btn btn-primary margin-bottom-1em'> Ver Alumnos
                </button>


                <form onSubmit={this.onSave}>
                    <table className='table table-bordered table-hover'>
                        <tbody>
                        <tr>
                            <td>Clave de Actividad</td>
                            <td>
                                <input
                                    type='text'
                                    className='form-control'
                                    value={this.state.CveM}
                                    required
                                    onChange={this.onCveMChange} />
                            </td>
                        </tr>
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