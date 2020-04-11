import React, { useState, useEffect } from "react";
import { getShipmentReport } from "./utils/apiUtil";
import { Title } from "./styles/AppStyles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import logo from "./logo.svg";
import "./App.css";
import Form from "./components/Form";
import GitSearch from "./components/GitSearch";
import QueryList from "./components/QueryList";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [shipmentData, setShipmentData] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    // Using an async function makes the callback function return a Promise instead of a cleanup function. Hence IIFE
    (async function anyNameFunction() {
      const shipmentList = await getShipmentReport(currentPage);
      shipmentList && setShipmentData(shipmentList);
    })();
  }, [currentPage]);

  const normalizeData = (rawData) => {
    return rawData[1].map(function (title, index) {
      return {
        title: title,
        paragraph: rawData[2][index],
        link: rawData[3][index],
      };
    });
  };

  const addNewResult = (queryResult) => {
    if (queryResult === null) {
      setData([]);
      return;
    }
    const searchResult = normalizeData(queryResult);
    setData(searchResult);
  };

  return (
    <Router>
      <Switch>
        <Route path="/search-details/:id">
          <div>your search page </div>
        </Route>
        <Route path="/">
          <div className="container">
              <h1>Iluvatar Search</h1>
              <Title>Programmer Search Engine vicicita !</Title>
            <a
              target="_blank" rel="noopener noreferrer"
              href="https://en.wikipedia.org/wiki/Special:Random"
            >
              <i className="fa fa-random" aria-hidden="true"></i>
            </a>
            <Form onInput={addNewResult} />
            <QueryList query={data} />
            <GitSearch />
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
