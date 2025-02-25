// frontend/src/components/PriceChart.js

import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import './PriceChart.css'; // Create a new CSS file for styling

const PriceChart = ({ data, chartType = 'line', dataKey = 'Price', xKey = 'Date', title = '' }) => {
    return (
        <div className="chart-container">
            {title && <h4 className="chart-title">{title}</h4>}
            <ResponsiveContainer width="100%" height={300}>
                {chartType === 'line' ? (
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                        <XAxis dataKey={xKey} tick={{ fill: '#8884d8' }} />
                        <YAxis tick={{ fill: '#8884d8' }} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey={dataKey} stroke="#007BFF" strokeWidth={2} dot={{ r: 3 }} />
                    </LineChart>
                ) : (
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                        <XAxis dataKey={xKey} tick={{ fill: '#8884d8' }} />
                        <YAxis tick={{ fill: '#8884d8' }} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey={dataKey} fill="#007BFF" />
                    </BarChart>
                )}
            </ResponsiveContainer>
        </div>
    );
}

export default PriceChart;