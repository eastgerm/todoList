import React from 'react';
import './App.scss';
import InfoLayer from "./layers/InfoLayer";
import EditLayer from "./layers/EditLayer";
import TodoLayer from "./layers/TodoLayer";

function App() {
  return (
    <div className="App">
      <InfoLayer/>
      <TodoLayer/>
      <EditLayer/>
    </div>
  );
}

export default App;
