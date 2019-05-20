import React,{Component} from 'react';
import './App.scss';
import InfoLayer from "./layers/InfoLayer";
import TodoLayer from "./layers/TodoLayer";

class App extends Component {
  render() {
    return(
      <div className="App">
        <InfoLayer/>
        <TodoLayer/>
      </div>
    );
  }
}

export default App;
