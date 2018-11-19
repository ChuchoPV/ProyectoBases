import React from 'react'
import $ from 'jquery'
export class DeleteMateriaComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            successCreation: null
        }
        this.onDelete = this.onDelete.bind(this);
    }

    onDelete(e) {

        // product to delete
        var CveM = this.props.CveM;
        // submit form data to api
        // this.serverRequestProd = $.get({"http://localhost/~jesusperea/phpFilesCEDAC/Materias/delete_materia.php?CveM=" + CveM,
        // success : function(response) {
        //     this.props.changeAppMode('read');
        // }.bind(this)})

        $.ajax({
            url: "http://localhost/~jesusperea/phpFilesCEDAC/Materias/delete_materia.php?CveM=" + CveM,
            type : "GET",
            success : function(response) {
                this.props.changeAppMode('read');
            }.bind(this),
            error: function(xhr, resp, text){
                // show error in console
                console.log(xhr, resp, text);
            }
        });

        $('.page-header h1').text('Update product');
    }
    render()
        {

            return (
                <div className='row'>
                    <div className='col-md-3'></div>
                    <div className='col-md-6'>
                        <div className='panel panel-default'>
                            <div className='panel-body text-align-center'>¿Está seguro que desea eliminar?</div>
                            <div className='panel-footer clearfix'>
                                <div className='text-align-center'>
                                    <button onClick={this.onDelete}
                                            className='btn btn-danger m-r-1em'>Sí
                                    </button>
                                    <button onClick={() => this.props.changeAppMode('read')}
                                            className='btn btn-primary'>No
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-3'></div>
                </div>
            );
        }
}
