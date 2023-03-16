import React from 'react';
import logo from './logo.svg';
import './App.css';
import Todo from './components/todo';

function App() {
  return (
    <div className="App h-screen w-screen  flex content-center items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500 ...">
      <Todo />
    </div>
  );
}

export default App;
