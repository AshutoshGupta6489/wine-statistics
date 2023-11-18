import React from 'react';

interface WineTableProps {
  measure: string;
  dataMap: Map<number, { data: number[]; mean: number; median: number; mode: number }>;
}

const WineTable: React.FC<WineTableProps> = ({ measure, dataMap }) => {
  return (
    <div>
      <h2>{measure} Statistics</h2>
      <table className="wine-table">
        <thead>
          <tr>
            <th>Class</th>
            {Array.from(dataMap.keys()).map((classKey) => (
              <th key={classKey}>Class {classKey}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{measure} Mean</td>
            {Array.from(dataMap.values()).map((value, index) => (
              <td key={index}>{value.mean.toFixed(3)}</td>
            ))}
          </tr>
          <tr>
            <td>{measure} Median</td>
            {Array.from(dataMap.values()).map((value, index) => (
              <td key={index}>{value.median.toFixed(3)}</td>
            ))}
          </tr>
          <tr>
            <td>{measure} Mode</td>
            {Array.from(dataMap.values()).map((value, index) => (
              <td key={index}>{value.mode.toFixed(3)}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default WineTable;
