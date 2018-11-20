import React from 'react';
import { ReadProductComponent } from './read_products.jsx';
import { ReadOneProductComponent } from './read_one_product';
import { CreateProductComponent } from './create_product.component';
import { UpdateProductComponent } from './update_product';
import { DeleteProductComponent } from './delete_product.component';
import { BoletaComponent } from './boleta_component.jsx';
import { CreateBoletaComponent } from './create_boleta';
import { DeleteBoletaComponent } from './delete_boleta.jsx';
import { ReadOneBoletaComponent } from './readone_boleta.jsx';
import { UpdateBoletaComponent } from './edit_boleta.jsx';

// component that decides which main component to load: read or create/update
export class ReadAlumnos extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      currentMode: 'read',
      CveA: null,
      CveAct : null,
      fechab : null
    }
    this.changeAppMode = this.changeAppMode.bind(this);
  }
 
  // used when use clicks something that changes the current mode
  changeAppMode(newMode, Cvea, Cveact, fechaB){
      this.setState({
          currentMode: newMode,
          CveA: Cvea,
          CveAct : Cveact,
          fechab : fechaB
      });
  }


  // render the component based on current or selected mode
  render(){

      var modeComponent =
          <ReadProductComponent
          changeAppMode={this.changeAppMode} />;

      switch(this.state.currentMode){
          case 'read':
              break;
          case 'readOne':
              modeComponent = <ReadOneProductComponent CveA={this.state.CveA} changeAppMode={this.changeAppMode}/>;
              break;
          case 'create':
              modeComponent = <CreateProductComponent changeAppMode={this.changeAppMode}/>;
              break;
          case 'update':
              modeComponent = <UpdateProductComponent CveA={this.state.CveA} changeAppMode={this.changeAppMode}/>;
              break;
          case 'delete':
              modeComponent = <DeleteProductComponent CveA={this.state.CveA} changeAppMode={this.changeAppMode}/>;
              break;
          case 'boleta':
              modeComponent = <BoletaComponent rows={this.state.rows} CveA={this.state.CveA} CveAct = {this.state.CveAct} 
                                                fechab = {this.state.fechab} changeAppMode={this.changeAppMode}/> 
              break;
          case 'boletaCreate':
              modeComponent = <CreateBoletaComponent addRows={this.addRows} CveA={this.state.CveA} changeAppMode={this.changeAppMode}/> 
              break;
          case 'deleteBoleta':
              modeComponent = <DeleteBoletaComponent addRows={this.addRows} CveA={this.state.CveA} CveAct={this.state.CveAct} 
                                                    fechab = {this.state.fechab} changeAppMode={this.changeAppMode}/> 
              break;
          case 'readOneBoleta':
                modeComponent = <ReadOneBoletaComponent addRows={this.addRows} CveA={this.state.CveA} CveAct={this.state.CveAct} 
                                                    fechab = {this.state.fechab} changeAppMode={this.changeAppMode}/> 
                break;
          case 'updateBoleta':
                modeComponent = <UpdateBoletaComponent addRows={this.addRows} CveA={this.state.CveA} CveAct={this.state.CveAct} 
                                            fechab = {this.state.fechab} changeAppMode={this.changeAppMode}/> 
                break;
          default:
            break;
      }
      return modeComponent;
  }
}

