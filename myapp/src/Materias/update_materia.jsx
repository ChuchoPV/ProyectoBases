import React from 'react';
import $ from 'jquery';

// component that contains the logic to update a product
export class UpdateProductComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            nombre: '',
            CveM : '',
            successUpdate: null
        }
        this.onNombreChange = this.onNombreChange.bind(this);
        this.onCveMChange = this.onCveMChange.bind(this);
        this.onSave = this.onSave.bind(this);

    }

    // on mount, fetch all categories and one product data to stored them as this component's state
    componentDidMount(){

        // read one product data
        var CveM = this.props.CveM;
        this.serverRequestProd = $.get("http://localhost/~jesusperea/phpFilesCEDAC/Materias/read_one_materia.php?CveM=" + CveM,
            function (product) {
                this.setState({nombre: product.nombre});
                this.setState({CveM: product.CveM});
            }.bind(this));

        $('.page-header h1').text('Update product');
    }

    // handle nombre change
    onNombreChange(e){
        this.setState({nombre: e.target.value});
    }

    // handle carrera change
    onCveMChange(e){
        this.setState({CveM: e.target.value});
    }

    // handle save changes button here
    // handle save changes button clicked
    onSave(e){

        console.log(this.state);
        // data in the form
        $.ajax({
            url: "http://localhost/~jesusperea/phpFilesCEDAC/Materias/update_materias.php?CveM=" + this.state.CveM + 
                                    "&nombrem=" + this.state.nombre
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
                    Ver Actividad
                </button>

                <form onSubmit={this.onSave}>
                    <table className='table table-bordered table-hover'>
                        <tbody>

                        <tr>
                            <td>Clave de Actividad</td>
                            <td>
                                <textarea
                                    type='text'
                                    className='form-control'
                                    required
                                    value={this.state.CveM}
                                    onChange={this.onCveMChange}></textarea>
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