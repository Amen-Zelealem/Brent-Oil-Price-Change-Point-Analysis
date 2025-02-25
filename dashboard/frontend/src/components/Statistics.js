import React from 'react';
import './Statistics.css';

const Statistics = ({ analysis }) => {
    return (
        <div className="statistics-container border p-4 mb-4">
            <h2 className="text-center mb-4">📊 Key Analysis Metrics</h2>

            <div className="stat-section mb-4">
                <h4 className="stat-title">Volatility & Price Change</h4>
                <p className="stat-value"><strong>Volatility:</strong> {analysis.volatility ?? 'N/A'}</p>
                <p className="stat-value"><strong>Average Daily Price Change:</strong> {analysis.average_price_change ?? 'N/A'}</p>
                <p className="stat-value"><strong>Price Range:</strong> {analysis.min_price ?? 'N/A'} - {analysis.max_price ?? 'N/A'}</p>
                <p className="stat-value"><strong>Total Price Change:</strong> {analysis.total_price_change ?? 'N/A'}</p>
            </div>

            <div className="stat-section mb-4">
                <h4 className="stat-title">Correlation Metrics</h4>
                <p className="stat-value"><strong>Correlation with Time:</strong> {analysis.correlation ?? 'N/A'}</p>
            </div>

            <div className="stat-section">
                <h4 className="stat-title">Model Accuracy Metrics</h4>
                <p className="stat-value"><strong>RMSE:</strong> {analysis.model_accuracy?.RMSE ?? 'N/A'}</p>
                <p className="stat-value"><strong>MAE:</strong> {analysis.model_accuracy?.MAE ?? 'N/A'}</p>
            </div>
        </div>
    );
}

export default Statistics;