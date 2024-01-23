import { useState, useEffect, useContext } from "react";
import "./Table.scss";

const Table = () => {
  const data = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Doe' },
    // Add more data as needed
  ];

  return (
    <table className="dark-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          {/* Add more columns as needed */}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            {/* Add more cells as needed */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
