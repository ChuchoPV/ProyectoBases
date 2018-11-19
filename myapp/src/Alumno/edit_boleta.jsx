import React from 'react';
import $ from 'jquery';

// component that contains the logic to update a product
export class UpdateBoletaComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            CveA: this.props.CveA,
            calificacion : '',
            fecha: '',
            comentarios :'',
            materia : '',
            successUpdate: null
        }
        this.onMateriaChange = this.onMateriaChange.bind(this);
        this.onfechaChange = this.onfechaChange.bind(this);
        this.oncomentariosChange = this.oncomentariosChange.bind(this);
        this.oncalificacionChange = this.oncalificacionChange.bind(this);
        this.onSave = this.onSave.bind(this);
    }
     
    // on mount, fetch all categories and one product data to stored them as this component's state
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
        $('.page-header h1').text('Update product');
    }
         
    // handle nombre change
    onMateriaChange(e){
        this.setState({materia: e.target.value});
    }
    
    // handle fechanaci change
    onfechaChange(e){
        this.setState({fecha: e.target.value});
    }

    oncomentariosChange(e){
        this.setState({comentarios: e.target.value});
    }

    oncalificacionChange(e){
        this.setState({calificacion: e.target.value});
    }
    
    // handle save changes button here
    onSave(e){

        var form_data = {
            CveAct: this.state.materia,
            CveAlu: this.props.CveA,
            fecha: this.state.fecha,
            comments : this.state.comentarios,
            evaluacion: this.state.calificacion
        };

        console.log(form_data);

        // submit form data to api
        $.ajax({    
            url: "http://localhost/~jesusperea/phpFilesCEDAC/update_boleta.php",
            type : "POST",
            //contentType : 'application/json',
            data : JSON.stringify(form_data),
            success : function(response) {
    
                // api message
                this.setState({successUpdate: response['message']});
    
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
                    onClick={() => this.props.changeAppMode('boleta', this.props.CveA)}
                    className='btn btn-primary margin-bottom-1em'>
                    Ver boleta
                </button>
     
                <form onSubmit={this.onSave}>
                    <table className='table table-bordered table-hover'>
                        <tbody>
                        <tr>
                            <td>Actividad</td>
                            <td>
                                <input
                                    type='text'
                                    className='form-control'
                                    value={this.state.materia}
                                    required
                                    onChange={this.onMateriaChange} />
                            </td>
                        </tr>
     
                        <tr>
                            <td>Calificacion</td>
                            <td>
                                <textarea
                                    type='text'
                                    className='form-control'
                                    required
                                    value={this.state.calificacion}
                                    onChange={this.oncalificacionChange}></textarea>
                            </td>
                        </tr>

                        <tr>
                            <td>Fecha</td>
                            <td>
                                <textarea
                                    type='text'
                                    className='form-control'
                                    required
                                    value={this.state.fecha}
                                    onChange={this.onfechaChange}></textarea>
                            </td>
                        </tr>

                        <tr>
                            <td>Comentarios</td>
                            <td>
                                <textarea
                                    type='text'
                                    className='form-control'
                                    required
                                    value={this.state.comentarios}
                                    onChange={this.oncomentariosChange}></textarea>
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