import React, { useState, useEffect } from "react";
import { getShipmentReport } from "./utils/apiUtil";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

import coverSrc from "./img/code1.jpg";
import coverVideo from "./img/code1.mp4";

import Button from "@material-ui/core/Button";
import Search from "@material-ui/icons/Search";

import Form from "./components/Form";
import GitSearch from "./components/GitSearch";
import SOSearch from "./components/SOSearch";
import QueryList from "./components/QueryList";
import Drawer from "./common/Drawer";

import SearchResult from "./containers/SearchResult";

import { Link } from "react-router-dom";

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

  setTimeout(() => {
    var vid = document.getElementById("bgvid");
    var pauseButton = document.querySelector("#polina button");

    if (window.matchMedia("(prefers-reduced-motion)").matches) {
      vid.removeAttribute("autoplay");
      vid.pause();
      pauseButton.innerHTML = "Paused";
    }
  }, 100);

  return (
    <div>
      <Router>
        <Switch>
          <Route path={"/search-details/:id"}>
            <SearchResult />
          </Route>
          <Route path={"/"}>
            <Drawer>
              {window.screen.availWidth > 700 && (
                <video
                  poster={coverSrc}
                  id="bgvid"
                  playsinline
                  autoPlay
                  muted
                  loop
                  style={{ zIndex: 0, margin: "165px 0 0 200px" }}
                >
                  <source src={coverVideo} type="video/mp4" />
                </video>
              )}

              <Box color="text.primary" clone>
                <Container maxWidth="sm">
                  <h1>Iluvatar Search</h1>
                  <br />
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
                  <SOSearch /> <br />
                  <Button
                    color="primary"
                    variant="contained"
                    startIcon={<Search />}
                  >
                    <Link to={`/search-details/21`}> Search Result </Link>
                  </Button>{" "}
                  <br /> <br /> <br /> <br /> <br /> <br />
                </Container>
              </Box>
            </Drawer>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
