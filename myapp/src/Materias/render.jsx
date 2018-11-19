import React from 'react';
import { ReadMateriasComponent } from './read_materias.jsx';
import { ReadOneMateriaComponent } from './read_one_materia.jsx';
import { CreateMateriaPComponent } from './create_materia.component.jsx';
import { UpdateProductComponent } from './update_materia.jsx';
import { DeleteMateriaComponent } from './delete_materia.component.jsx';
import { MateriaComponent } from './materia_component.jsx';

// component that decides which main component to load: read or create/update
export class ReadMaterias extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            currentMode: 'read',
            rows : false,
            CveM: null
        }
        this.changeAppMode = this.changeAppMode.bind(this);
    }

    // used when use clicks something that changes the current mode
    changeAppMode(newMode, CveM){
        this.setState({
            currentMode: newMode,
            CveM: CveM
        });

    }

    addRows(value){
        console.log(value)
        this.setState({
            rows : value
        });
    }

    // render the component based on current or selected mode
    render(){

        var modeComponent =
            <ReadMateriasComponent
                changeAppMode={this.changeAppMode} />;


        switch(this.state.currentMode){
            case 'read':
                break;
            case 'readOne':
                modeComponent = <ReadOneMateriaComponent CveM={this.state.CveM} changeAppMode={this.changeAppMode}/>;
                break;
            case 'create':
                modeComponent = <CreateMateriaPComponent changeAppMode={this.changeAppMode}/>;
                break;
            case 'update':
                modeComponent = <UpdateProductComponent CveM={this.state.CveM} changeAppMode={this.changeAppMode}/>;
                break;
            case 'delete':
                modeComponent = <DeleteMateriaComponent CveM={this.state.CveM} changeAppMode={this.changeAppMode}/>;
                break;
            case 'materia':
                modeComponent = <MateriaComponent rows={this.state.rows} CveM={this.state.CveM} changeAppMode={this.changeAppMode}/>
                break;
            default:
                break;
        }
        return modeComponent;
    }
}