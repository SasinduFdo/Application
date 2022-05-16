import React, { useState, useEffect } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import {
  Button,
  Modal,
  ButtonGroup,
  Table,
  Spinner,
  ListGroup,
  Alert
} from "react-bootstrap";
import axios from "axios";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Radar, Bar } from "react-chartjs-2";
import Authentication from "../../services/Authentication";
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const AirportRisk = () => {
  const [showAirr, setShowAirr] = useState(false);
  const [showDep, setShowDep] = useState(false);
  const [riskData, setRiskData] = useState([]);
  const [showRisk, setShowRisk] = useState(false);
  const [viewRisk, setViewRisk] = useState("");
  const [riskChart, setRiskChart] = useState("");
  const [error, setError] = useState("");


  useEffect(() => {
    setError("");
    getRiskData();
    setShowAirr(true);
    setShowRisk(false);
  }, []);

  const handleAirr = () => {
    setShowAirr(true);
    setShowDep(false);
  };

  const handleDep = () => {
    setShowDep(true);
    setShowAirr(false);
  };

  const details = async (e) => {
    setViewRisk(e);
    setShowRisk(true);
    const state = {
      labels: ["Terrorism", "Narcotics", "Smuggling", "Immigration", "Revenue"],
      datasets: [
        {
          label: "Risk %",
          data: [
            e.riskModelRiskData.riskDataTerrorism,
            e.riskModelRiskData.riskDataNarcotics,
            e.riskModelRiskData.riskDataSmuggling,
            e.riskModelRiskData.riskDataImmigration,
            e.riskModelRiskData.riskDataRevenue,
          ],
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    };

    setRiskChart(state);
  };

  const getRiskData = async () => {
    // Sending the request to get the risk data
    await axios
      .get(process.env.REACT_APP_API_URL + "viewRiskData", { headers: Authentication() })
      .then((response) => {
        if (response.status !== 500) {
          setRiskData(response.data);
        }
        else
        {
          setError("An Error Occurred!!.\nPlease Try Again.")
        }
      });
  };

  const handleClose = () => {
    setShowRisk(false);
    setViewRisk("");
    setRiskChart("");
  };

  return (
    <div>
      <Modal
        show={showRisk}
        backdrop="static"
        size="xl"
        centered
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>
            {viewRisk != "" ? (
              <>
                {"Risk Data of " +
                  viewRisk.riskModelPassengerData.passengerForeName +
                  " " +
                  viewRisk.riskModelPassengerData.passengerFamilyName}
              </>
            ) : null}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {viewRisk != "" ? (
            <>
              <div style={{ width: "100%" }}>
                <MDBRow style={{ width: "100%" }}>
                  <MDBCol style={{ width: "50%" }}>
                    <ListGroup as="ol" numbered>
                      <ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-start"
                      >
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">Passport Number</div>
                          {viewRisk.riskModelRiskData.riskDataPassportNumber}
                        </div>
                      </ListGroup.Item>
                      <ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-start"
                      >
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">Fore Name</div>
                          {viewRisk.riskModelPassengerData.passengerForeName}
                        </div>
                      </ListGroup.Item>
                      <ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-start"
                      >
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">Family Name</div>
                          {viewRisk.riskModelPassengerData.passengerFamilyName}
                        </div>
                      </ListGroup.Item>
                      <ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-start"
                      >
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">Gender</div>
                          {viewRisk.riskModelRiskData.riskDataGender}
                        </div>
                      </ListGroup.Item>
                      <ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-start"
                      >
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">Date Of Birth</div>
                          {viewRisk.riskModelRiskData.riskDataDOB}
                        </div>
                      </ListGroup.Item>
                      <ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-start"
                      >
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">Nationality</div>
                          {viewRisk.riskModelPassengerData.passengerCountry}
                        </div>
                      </ListGroup.Item>
                      <ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-start"
                      >
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">Flight Number</div>
                          {viewRisk.riskModelPassengerData.passengerFlight}
                        </div>
                      </ListGroup.Item>
                      <ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-start"
                      >
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">Seat Number</div>
                          {viewRisk.riskModelPassengerData.passengerSeatNumber}
                        </div>
                      </ListGroup.Item>
                      <ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-start"
                      >
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">Arrival Airport</div>
                          {viewRisk.riskModelFlightData.flightArrival}
                        </div>
                      </ListGroup.Item>
                      <ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-start"
                      >
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">Departing Airport</div>
                          {viewRisk.riskModelFlightData.flightDeparture}
                        </div>
                      </ListGroup.Item>
                      <ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-start"
                      >
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">Terminal</div>
                          {viewRisk.riskModelFlightData.flightTerminal}
                        </div>
                      </ListGroup.Item>
                    </ListGroup>
                  </MDBCol>


                  <MDBCol style={{ width: "50%" }}>
                    Risk Data
                    <br/>
                    <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>Terrorism %</th>
                            <th>Narcotics %</th>
                            <th>Smuggling %</th>
                            <th>Immigration %</th>
                            <th>Revenue %</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{viewRisk.riskModelRiskData.riskDataTerrorism}</td>
                            <td>{viewRisk.riskModelRiskData.riskDataNarcotics}</td>
                            <td>{viewRisk.riskModelRiskData.riskDataSmuggling}</td>
                            <td>{viewRisk.riskModelRiskData.riskDataImmigration}</td>
                            <td>{viewRisk.riskModelRiskData.riskDataRevenue}</td>
                          </tr>
                        </tbody>
                      </Table>
                    <Radar data={riskChart} options={{ responsive: true }} />
                    <Bar data={riskChart} options={{ responsive: true }} />
                  </MDBCol>
                </MDBRow>
              </div>
            </>
          ) : null}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <div>
        <MDBRow>
          <ButtonGroup size="lg" className="mb-2">
            <Button variant="info" onClick={() => handleAirr()}>
              Arrivals
            </Button>
            <Button variant="info" onClick={() => handleDep()}>
              Departures
            </Button>
          </ButtonGroup>
        </MDBRow>
      </div>

      <br />
      <div>{error !== "" ? <Alert variant="danger">{error}</Alert> : ''}</div>
      {showAirr ? (
        <div
          style={{
            height: "auto",
            width: "100%",
            textAlign: "left",
          }}
        >
          <Table
            id="data-table"
            striped
            bordered
            hover
            variant="dark"
            style={{ margin: "0 auto", height: "auto" }}
          >
            <thead>
              <tr>
                <th style={{ width: "10%", height: 5 }}>Airport IATA Code</th>
                <th style={{ width: "10%", height: 5 }}>Airport ISO Code</th>
                <th style={{ width: "15%", height: 5 }}>Airport Name</th>
                <th style={{ width: "15%", height: 3 }}>Airport Location</th>
                <th style={{ width: "10%", height: 3 }}>Passenger Name</th>
                <th style={{ width: "10%", height: 3 }}>Passport Number</th>
                <th style={{ width: "10%", height: 3 }}>Flight Number</th>
                <th style={{ width: "15%", height: 5 }}>View Risks</th>
              </tr>
            </thead>
          </Table>
          <Table
            id="data-table"
            striped
            bordered
            hover
            variant="light"
            style={{ height: "auto" }}
          >
            <tbody>
              {riskData.map((risk) => (
                <tr>
                  <td
                    style={{
                      width: "10%",
                      height: 5,
                      fontFamily: "'Padauk', sans-serif",
                      fontSize: 20,
                    }}
                  >
                    {risk.riskModelArrivalAirport.airportIATACode}
                  </td>
                  <td
                    style={{
                      width: "10%",
                      height: 5,
                      fontFamily: "'Padauk', sans-serif",
                      fontSize: 20,
                    }}
                  >
                    {risk.riskModelArrivalAirport.airportISOCode}
                  </td>
                  <td
                    style={{
                      width: "15%",
                      height: 5,
                      fontFamily: "'Padauk', sans-serif",
                      fontSize: 20,
                    }}
                  >
                    {risk.riskModelArrivalAirport.airportName}
                  </td>
                  <td
                    style={{
                      width: "15%",
                      height: 5,
                      fontFamily: "'Padauk', sans-serif",
                      fontSize: 20,
                    }}
                  >
                    {risk.riskModelArrivalAirport.airportLocation}
                  </td>
                  <td
                    style={{
                      width: "10%",
                      height: 5,
                      fontFamily: "'Padauk', sans-serif",
                      fontSize: 20,
                    }}
                  >
                    {risk.riskModelPassengerData.passengerForeName +
                      " " +
                      risk.riskModelPassengerData.passengerFamilyName}
                  </td>
                  <td
                    style={{
                      width: "10%",
                      height: 5,
                      fontFamily: "'Padauk', sans-serif",
                      fontSize: 20,
                    }}
                  >
                    {risk.riskModelPassengerData.passengerPassportNumber}
                  </td>
                  <td
                    style={{
                      width: "10%",
                      height: 5,
                      fontFamily: "'Padauk', sans-serif",
                      fontSize: 20,
                    }}
                  >
                    {risk.riskModelPassengerData.passengerFlight}
                  </td>
                  <td
                    style={{
                      width: "15%",
                      height: 5,
                      fontFamily: "'Padauk', sans-serif",
                      fontSize: 20,
                    }}
                  >
                    <Button
                      onClick={() => details(risk)}
                      style={{
                        width: "80%",
                        height: 40,
                        fontSize: 20,
                        maeginLeft: "10%",
                        fontFamily: "'Bebas Neue', cursive",
                      }}
                      color="green"
                    >
                      View Risks
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : null}

      {showDep ? (
        <div
          style={{
            height: "auto",
            width: "100%",
            textAlign: "left",
          }}
        >
          <Table
            id="data-table"
            striped
            bordered
            hover
            variant="dark"
            style={{ margin: "0 auto", height: "auto" }}
          >
            <thead>
              <tr>
                <th style={{ width: "10%", height: 5 }}>Airport IATA Code</th>
                <th style={{ width: "10%", height: 5 }}>Airport ISO Code</th>
                <th style={{ width: "15%", height: 5 }}>Airport Name</th>
                <th style={{ width: "15%", height: 3 }}>Airport Location</th>
                <th style={{ width: "10%", height: 3 }}>Passenger Name</th>
                <th style={{ width: "10%", height: 3 }}>Passport Number</th>
                <th style={{ width: "10%", height: 3 }}>Flight Number</th>
                <th style={{ width: "15%", height: 5 }}>View Risks</th>
              </tr>
            </thead>
          </Table>
          <Table
            id="data-table"
            striped
            bordered
            hover
            variant="light"
            style={{ height: "auto" }}
          >
            <tbody>
              {riskData.map((risk) => (
                <tr>
                  <td
                    style={{
                      width: "10%",
                      height: 5,
                      fontFamily: "'Padauk', sans-serif",
                      fontSize: 20,
                    }}
                  >
                    {risk.riskModelDepartureAirport.airportIATACode}
                  </td>
                  <td
                    style={{
                      width: "10%",
                      height: 5,
                      fontFamily: "'Padauk', sans-serif",
                      fontSize: 20,
                    }}
                  >
                    {risk.riskModelDepartureAirport.airportISOCode}
                  </td>
                  <td
                    style={{
                      width: "15%",
                      height: 5,
                      fontFamily: "'Padauk', sans-serif",
                      fontSize: 20,
                    }}
                  >
                    {risk.riskModelDepartureAirport.airportName}
                  </td>
                  <td
                    style={{
                      width: "15%",
                      height: 5,
                      fontFamily: "'Padauk', sans-serif",
                      fontSize: 20,
                    }}
                  >
                    {risk.riskModelDepartureAirport.airportLocation}
                  </td>
                  <td
                    style={{
                      width: "10%",
                      height: 5,
                      fontFamily: "'Padauk', sans-serif",
                      fontSize: 20,
                    }}
                  >
                    {risk.riskModelPassengerData.passengerForeName +
                      " " +
                      risk.riskModelPassengerData.passengerFamilyName}
                  </td>
                  <td
                    style={{
                      width: "10%",
                      height: 5,
                      fontFamily: "'Padauk', sans-serif",
                      fontSize: 20,
                    }}
                  >
                    {risk.riskModelPassengerData.passengerPassportNumber}
                  </td>
                  <td
                    style={{
                      width: "10%",
                      height: 5,
                      fontFamily: "'Padauk', sans-serif",
                      fontSize: 20,
                    }}
                  >
                    {risk.riskModelPassengerData.passengerFlight}
                  </td>
                  <td
                    style={{
                      width: "15%",
                      height: 5,
                      fontFamily: "'Padauk', sans-serif",
                      fontSize: 20,
                    }}
                  >
                    <Button
                      onClick={() => details(risk)}
                      style={{
                        width: "80%",
                        height: 40,
                        fontSize: 20,
                        maeginLeft: "10%",
                        fontFamily: "'Bebas Neue', cursive",
                      }}
                      color="green"
                    >
                      View Risks
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : null}

      {riskData.length == 0 ? (
        <>
          <Spinner style={{ marginLeft: "50%" }} animation="border" />
        </>
      ) : null}
    </div>
  );
};

export default AirportRisk;
