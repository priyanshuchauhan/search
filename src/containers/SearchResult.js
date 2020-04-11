import React, { useState, useEffect } from "react";
import { getShipmentReport } from "../utils/apiUtil";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

import BottomNav from "../common/BottomNav";
import FloatingButton from "../common/FloatingButton";
import ButtonGroup from "../common/ButtonGroup";
import Breadcrumbs from "../common/Breadcrumbs";
import Stepper from "../common/Stepper";
import AppBar from "../common/AppBar";
import Card from "../common/Card";

import Accordion from "../common/Accordion";
import Progress from "../common/Progress";
import Dialog from "../common/Dialog";
import Snackbar from "../common/Snackbar";
import BackdropLoader from "../common/BackdropLoader";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);

  useEffect(() => {
    // Using an async function makes the callback function return a Promise instead of a cleanup function. Hence IIFE
    (async function anyNameFunction() {
      const shipmentList = await getShipmentReport(currentPage);
    })();
  }, [currentPage]);

  return (
    <div>
      <AppBar />
      <Box color="text.primary" clone>
        <Container maxWidth="sm">
          <br />
          <Breadcrumbs /> <br />
          <Grid container spacing={2}>
            <Accordion /> <br />
            <Progress /> <br />
            <Dialog /> <br />
            <Snackbar /> <br />
            <BackdropLoader /> <br />
            <FloatingButton /> <br />
            <BottomNav /> <br />
            <ButtonGroup /> <br />
            <Stepper /> <br />
            <Card />
          </Grid>
        </Container>
      </Box>
    </div>
  );
}

export default App;
