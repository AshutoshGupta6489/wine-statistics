import React from 'react';

interface WineTableProps {
  measure: string;
  dataMap: Map<number, { data: number[]; mean: number; median: number; mode: number }>;
}

const WineTable: React.FC<WineTableProps> = ({ measure, dataMap }) => {
  return (
    <div>
      {/* Header with the title of the table */}
      <h2>{measure} Statistics</h2>

      {/* Table displaying class-wise statistics for the given measure */}
      <table className="wine-table">
        <thead>
          <tr>
            <th>Class</th>
            {/* Generate table headers based on unique class keys in the dataMap */}
            {Array.from(dataMap.keys()).map((classKey) => (
              <th key={classKey}>Class {classKey}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Row for Mean values */}
          <tr>
            <td>{measure} Mean</td>
            {/* Populate cells with mean values for each class */}
            {Array.from(dataMap.values()).map((value, index) => (
              <td key={index}>{value.mean.toFixed(3)}</td>
            ))}
          </tr>

          {/* Row for Median values */}
          <tr>
            <td>{measure} Median</td>
            {/* Populate cells with median values for each class */}
            {Array.from(dataMap.values()).map((value, index) => (
              <td key={index}>{value.median.toFixed(3)}</td>
            ))}
          </tr>

          {/* Row for Mode values */}
          <tr>
            <td>{measure} Mode</td>
            {/* Populate cells with mode values for each class */}
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
