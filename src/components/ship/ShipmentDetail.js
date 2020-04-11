import React, { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import { getShipmentReport, updateShipmentData } from "../utils/apiUtil";
import { Link } from "react-router-dom";

export const ShipmentDetail = () => {
  let { id } = useParams()
  const [product, setProduct] = useState({});

  useEffect(() => {
    (async function anyNameFunction() {
      const shipmentList = await getShipmentReport(1, id);
      setProduct(shipmentList[0]);
    })();
  }, []);

  return (
    <div>
      <h3>
        <Link to="/"> Home </Link>
      </h3>
      <div>ID={product.id}</div>
      <div>name={product.name}</div>
      <div>
        {product.cargo && product.cargo.map((item, index) => (
          <Fragment key={item.description}>
            <h4>Cargo {index + 1} </h4>
            <div>Cargo type={product.type}</div>
            <div>Cargo description={product.description}</div>
            <div>Cargo volume={product.volume}</div>
          </Fragment>
        ))}
      </div>
      <div>status={product.status}</div>
      <div>destination={product.destination}</div>
      <div>total={product.total}</div>
    </div>
  );
};

export default ShipmentDetail;
