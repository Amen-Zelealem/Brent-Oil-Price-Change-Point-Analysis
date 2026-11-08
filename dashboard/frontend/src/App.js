import React from 'react';
import './App.css'; 
import Sidebar from './components/Sidebar'; 
import Dashboard from './components/Dashboard';
import { createRequire } from 'module';
import { createRequire } from 'module';

var require = createRequire(import.meta.url);
var module = { exports: {} };

const require = createRequire(import.meta.url);

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
