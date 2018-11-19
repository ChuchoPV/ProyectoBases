import React from 'react';
import $ from 'jquery';

// component that contains the logic to delete a product
export class DeleteBoletaComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            fecha: '',
            CveAlu: '',
            CveAct: '',
            successDelete: null
        }
        this.onDelete = this.onDelete.bind(this);
    }
 
    // handle single row deletion
    onDelete(e){

        // product to delete
        var form_data = {
            CveAlu : this.props.CveA,
            CveAct : this.props.CveAct,
            fecha : this.props.fechab
        }
    
        // submit form data to api
        $.ajax({
            url: "http://localhost/~jesusperea/phpFilesCEDAC/delete_boleta.php",
            type : "POST",
            //contentType : 'application/json',
            data : JSON.stringify(form_data),
            success : function(response) {
                this.setState({successDelete : response["message"]});
                this.props.changeAppMode('boleta',this.props.CveA);
            }.bind(this),
            error: function(xhr, resp, text){
                //console.log();
                this.setState({successDelete : "Unable to delete materia."});
                // show error in console
                //console.log(xhr, resp, text);
            }
        });

        console.log(this.state);

    }
    
    // render will be here
    render(){
 
        return (
            <div className='row'>
                <div className='col-md-3'></div>
                <div className='col-md-6'>
                    <div className='panel panel-default'>

                {
                    this.state.successDelete === "Materia was deleted." ?
                    <div className='alert alert-success'>
                        Se ha eliminado de manera satisfactoria
                    </div> :
                    null
                }

                {
                    this.state.successDelete === "Unable to delete materia." ?
                    <div className='alert alert-danger'>
                        Ha habido un problema. Probablemente aún existan alumnos asociados a esta materia.
                        Antes de eliminar por favor dé de baja a los alumnos inscritos en ella.
                    </div> :
                    null
                }
                        <div className='panel-body text-align-center'>¿Está seguro que desea eliminar?</div>
                        <div className='panel-footer clearfix'>
                            <div className='text-align-center'>
                                <button onClick={this.onDelete}
                                    className='btn btn-danger m-r-1em'>Sí</button>
                                <button onClick={() => this.props.changeAppMode('boleta', this.props.CveA)}
                                    className='btn btn-primary'>No</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-3'></div>
            </div>
        );
    }
}