import React from 'react';
import $ from 'jquery';

// component that contains the logic to delete a product
export class DeleteProductComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            nombre: '',
            CveA: '',
            fechanaci: '',
            successCreation: null
        }
        this.onDelete = this.onDelete.bind(this);
    }
    
    // handle single row deletion
    onDelete(e){

        // product to delete
        var CveA = this.props.CveA;
    
        // submit form data to api
        $.ajax({
            url: "http://localhost/~jesusperea/phpFilesCEDAC/delete.php",
            type : "POST",
            //contentType : 'application/json',
            data : JSON.stringify({'CveA' : CveA}),
            success : function(response) {
                this.props.changeAppMode('read');
            }.bind(this),
            error: function(xhr, resp, text){
                // show error in console
                console.log(xhr, resp, text);
            }
        });
    }
    
    // render will be here
    render(){
 
        return (
            <div className='row'>
                <div className='col-md-3'></div>
                <div className='col-md-6'>
                    <div className='panel panel-default'>
                        <div className='panel-body text-align-center'>¿Está seguro que desea eliminar?</div>
                        <div className='panel-footer clearfix'>
                            <div className='text-align-center'>
                                <button onClick={this.onDelete}
                                    className='btn btn-danger m-r-1em'>Sí</button>
                                <button onClick={() => this.props.changeAppMode('read')}
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