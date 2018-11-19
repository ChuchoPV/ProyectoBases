import React from 'react';
// component that contains the functionalities that appear on top of
// the products table: create product
export class TopActionsComponent extends React.Component{
    render(){
        return (
            <div>
                <button
                    onClick={() => this.props.changeAppMode('create')}
                    className='btn btn-primary margin-bottom-1em'> Create Alumno
                </button>
            </div>
        );
    }
}