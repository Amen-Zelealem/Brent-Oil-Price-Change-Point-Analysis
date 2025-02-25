// src/components/Sidebar.js

import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h2>📊 Dashboard</h2>
            <nav className="navbar">
                <a href="#statistics">📈 Statistics</a>
                <a href="#time-series">🕒 Time Series Analysis</a>
                <a href="#event-impact">🚨 Event Impact</a>
                <a href="#export">📥 Data Export</a>
            </nav>
        </div>
    );
};

export default Sidebar;