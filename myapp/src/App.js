import React from 'react';
import './App.css';
import { ReadAlumnos } from './Alumno/render.jsx';
import { ReadMaterias } from './Materias/render.jsx';

// component that decides which main component to load: read or create/update
class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      currentMode: null
    }
    this.changeAppMode = this.changeAppMode.bind(this);
  }

  // used when use clicks something that changes the current mode
  changeAppMode(newMode){
    this.setState({
        currentMode: newMode
    });
  }

  // render the component based on current or selected mode
  render(){
      return(
        <div> 
            <button
                onClick={() => this.changeAppMode('readAlumnos')}
                className='btn btn-primary margin-bottom-1em'> Mostrar Alumno
            </button>
            &nbsp;&nbsp;&nbsp;
            <button
                onClick={() => this.changeAppMode('readMaterias')}
                className='btn btn-primary margin-bottom-1em'> Mostrar Actividades
            </button>

            {
                this.state.currentMode === "readAlumnos" ?
                    <ReadAlumnos></ReadAlumnos>
                : null
            }
     
            {
                this.state.currentMode === "readMaterias" ?
                    <ReadMaterias></ReadMaterias>
                : null
            }

        </div>
      );

  }
}


export default App;
