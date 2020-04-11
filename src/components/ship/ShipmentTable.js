import React from "react";
import PropTypes from "prop-types";
import { useSortableData } from "./TableUtil";
import { Link } from "react-router-dom";
import "./TableStyle.css";

export const ShipmentTable = ({ products, setCurrentPage }) => {
  const { items, updateSort } = useSortableData(products);
  
  return (
    <>
    {!products && "Loading..."}
    {products && (
      <div>
        <div handlePageChange={page => setCurrentPage(page)} />
        <div shipmentData={products} currentPage={products} />
      </div>
    )}
    <table>
      <thead>
        <tr>
          <th>
            <button type="button" onClick={() => updateSort("name")}>
              Name
            </button>
          </th>
          <th>
            <button type="button" onClick={() => updateSort("status")}>
              Status
            </button>
          </th>
          <th>
            <button type="button" onClick={() => updateSort("destination")}>
              Destination
            </button>
          </th>
          <th>
            <button type="button" onClick={() => updateSort("total")}>
              Total
            </button>
          </th>
          <th>Additional Details</th>
        </tr>
      </thead>
      <tbody>
        {items.map(item => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.status}</td>
            <td>{item.destination}</td>
            <td>${item.total}</td>
            <Link to={`/shipment-details/${item.id}`} > See Details </Link>
          </tr>
        ))}
      </tbody>
    </table>
    </>
  );
};

ShipmentTable.propTypes = {
  products: PropTypes.object.isRequired,
  setCurrentPage: PropTypes.func.isRequired
};

export default ShipmentTable;
