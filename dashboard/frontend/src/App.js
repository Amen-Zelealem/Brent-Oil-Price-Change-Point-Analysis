import React from 'react';
import './App.css'; 
import Sidebar from './components/Sidebar'; 
import Dashboard from './components/Dashboard';

function App() {
    return (
        <div className="app-container">
            <Sidebar /> 
            <main>
                <Dashboard /> 
            </main>
        </div>
    );
}

export default App;