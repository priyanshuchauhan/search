import React, { useState, useEffect } from "react";
import { getShipmentReport } from "./utils/apiUtil";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

import bgimageSrc from "./img/antoine-barres.jpg";
import Button from "@material-ui/core/Button";
import Search from '@material-ui/icons/Search';

import Form from "./components/Form";
import GitSearch from "./components/GitSearch";
import SOSearch from "./components/SOSearch";
import QueryList from "./components/QueryList";
import Drawer from "./common/Drawer";

import SearchResult from "./containers/SearchResult";

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
  const preventDefault = (event) => event.preventDefault();

  return (
    <div
      style={{
        backgroundImage: `url(${bgimageSrc})`,
      }}
    >
      <Router>
        <Switch>
          <Route path="/search-details/:id">
            <SearchResult />
          </Route>
          <Route path="/">
            <Drawer />
            <Box color="text.primary" clone>
              <Container maxWidth="sm">
                <div className="container">
                  <h1>Iluvatar Search</h1>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://en.wikipedia.org/wiki/Special:Random"
                  >
                    <i className="fa fa-random" aria-hidden="true"></i>
                  </a>
                  <Form onInput={addNewResult} />
                  <QueryList query={data} />
                  <GitSearch />
                  <SOSearch /> <br/>
                  <Button href="/search-details/23" color="primary"
                   variant="contained"
                   startIcon={<Search />}
                   >
                    Search Result
                  </Button > <br/><br/><br/> <br/><br/><br/>
                </div>
              </Container>
            </Box>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
