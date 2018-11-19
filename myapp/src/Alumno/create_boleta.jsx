import React from 'react';
import $ from 'jquery';
import { FormControl } from 'react-bootstrap';

export class CreateBoletaComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            CveAct: '',
            CveAlu : '',
            fecha : '',
            comments : '',
            evaluacion : '',
            successCreation: null
        }

        this.onmateriaChange = this.onmateriaChange.bind(this);
        this.oncalificacionChange = this.oncalificacionChange.bind(this);
        this.onfechaChange = this.onfechaChange.bind(this);
        this.onCommentsChange = this.onCommentsChange.bind(this);
        this.onSave = this.onSave.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this)
    }
    
    componentDidMount(){
        var nombre = this.state.materia;
        this.serverRequestProd = $.get("http://localhost/~jesusperea/phpFilesCEDAC/Materias/clave_materia.php?nombrem=" + nombre,
        function (product) {
            this.setState({CveAct: product.CveAct});
        }.bind(this));
        $('.page-header h1').text('Create entry');
        
        console.log(this.state);
    }

    componentWillUnmount(){
        this.serverRequestProd.abort();
    }

    // handle form field changes here
    // handle materia change
    onmateriaChange(e){
        this.setState({materia: e.target.value});
        this.componentDidMount();
    }
    
    // handle calificacion change
    oncalificacionChange(e){
        this.setState({evaluacion: e.target.value});
        this.componentDidMount();

    }

    // handle calificacion change
    onfechaChange(e){
        this.setState({fecha: e.target.value});
        this.componentDidMount();
    }

    onCommentsChange(e){
        this.setState({comments : e.target.value});
        this.componentDidMount();
    }

    // handle save button clicked   
    onSave(e){
        // data in the form
        var form_data = {
            CveAct: this.state.CveAct,
            CveAlu: this.props.CveA,
            fecha: this.state.fecha,
            comments : this.state.comments,
            evaluacion: this.state.evaluacion
        };

        console.log(form_data);

    
        // submit form data to api
        $.ajax({    
            url: "http://localhost/~jesusperea/phpFilesCEDAC/create_boleta.php",
            type : "POST",
            //contentType : 'application/json',
            data : JSON.stringify(form_data),
            success : function(response) {
    
                // api message
                this.setState({successCreation: response['message']});
    
                // empty form
                this.setState({fecha: ""});
                this.setState({CveAct: ""});
                this.setState({CveAlu: ""});
                this.setState({evaluacion: ""});
                this.setState({comments: ""});
    
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
        return (
        <div>
            {
                this.state.successCreation === "Product was created." ?
                    <div className='alert alert-success'>
                        La entrada ha sido añadida. 
                    </div>
                : null
            }
     
            {
                this.state.successCreation === "Unable to create product." ?
                    <div className='alert alert-danger'>
                        Imposible guardar la nueva entrada. Intente de nuevo.
                    </div>
                : null
            }

            {
                this.state.successCreation === "Unable to create product. Data is incomplete." ?
                    <div className='alert alert-danger'>
                        Imposible guardar la nueva entrada. Intente de nuevo.
                    </div>
                : null
            }
     
            <button
                onClick={() => this.props.changeAppMode('boleta',this.props.CveA)}
                className='btn btn-primary margin-bottom-1em'> Read Alumnos
            </button>
     
            <form onSubmit={this.onSave}>
                <table className='table table-bordered table-hover'>
                <tbody>
                    <tr>
                        <td>Activdad</td>
                        <td>
                            <input
                            type='text'
                            className='form-control'
                            value={this.state.materia}
                            required
                            onChange={this.onmateriaChange} />
                        </td>
                    </tr>

                    <tr>
                        <td>Calificacion</td>
                        <td>
                            <input
                            type='text'
                            className='form-control'
                            value={this.state.calificacion}
                            required
                            onChange={this.oncalificacionChange}/>
                        </td>
                    </tr>
                    
                    <tr>
                        <td>Fecha</td>
                        <td>
                            <input
                            type='text'
                            className='form-control'
                            value={this.state.fecha}
                            required
                            onChange={this.onfechaChange}/>
                        </td>
                    </tr>

                    <tr>
                        <td>Comentarios</td>
                        <td>
                            <FormControl type='text area'
                            className='form-control'
                            value={this.state.comments}
                            required
                            onChange={this.onCommentsChange}
                            componentClass="textarea" />

                        </td>
                    </tr>

                    <tr>
                        <td></td>
                        <td>
                            <button
                            className='btn btn-primary'
                            onClick={this.Save}>Save</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </form>
        </div>
        );
    }
}