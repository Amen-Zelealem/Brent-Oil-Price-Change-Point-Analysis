// import React from 'react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// const Chart = ({ data, title }) => (
//   <div>
//     <h2>{title}</h2>
//     <LineChart width={600} height={300} data={data}>
//       <CartesianGrid strokeDasharray="3 3" />
//       <XAxis dataKey="Date" />
//       <YAxis />
//       <Tooltip />
//       <Legend />
//       <Line type="monotone" dataKey="Price" stroke="#8884d8" />
//     </LineChart>
//   </div>
// );

// export default Chart;





import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Chart = ({ data, title }) => (
  <div className="chart-container">
    <h2 className="chart-title">{title}</h2>
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
        <XAxis dataKey="dates" tick={{ fill: '#555' }} />
        <YAxis tick={{ fill: '#555' }} />
        <Tooltip contentStyle={{ backgroundColor: '#333', color: '#fff', borderRadius: '5px' }} />
        <Legend wrapperStyle={{ fontSize: '14px' }} />
        <Line type="monotone" dataKey="prices" stroke="#4c6ef5" strokeWidth={2} dot={{ r: 4, fill: '#4c6ef5' }} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default Chart;

