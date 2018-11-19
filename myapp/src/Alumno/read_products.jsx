import React from 'react';
import $ from 'jquery'; 
import { TopActionsComponent } from './top_actions.component';
import { ProductsTable } from './product_table.component.jsx';

// component that contains all the logic and other smaller components
// that form the Read Products view
export class ReadProductComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            products: [],
            show : false
        }
    }

    // on mount, fetch all products and stored them as this component's state
    componentDidMount(){
        this.serverRequest = $.get("http://localhost/~jesusperea/phpFilesCEDAC/read.php", function (products) {
            this.setState({
                products: products.records
            });
        }.bind(this));
    }

    // on unmount, kill product fetching in case the request is still pending
    componentWillUnmount(){
        this.serverRequest.abort();
    }

    // render component on the page
    render(){  
        // list of products
        var filteredProducts = this.state.products;
        $('.page-header h1').text('Read Products');

        return (
            <div className='overflow-hidden'>
                <TopActionsComponent changeAppMode={this.props.changeAppMode} />

                <ProductsTable
                    products={filteredProducts}
                    changeAppMode={this.props.changeAppMode} />

            </div>
        );
    }
}

