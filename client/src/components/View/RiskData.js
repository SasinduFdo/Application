import React, { useState, useEffect } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { Button, Modal } from "react-bootstrap";
import AirportRisk from "./AirportRisk";
import TerminalRisk from "./TerminalRisk";
import FlightRisk from "./FlightRisks";
import PassengerRisk from "./PassengerRisks";
import RiskTypeRisk from "./RiskTypeRisks";
import { useHistory } from "react-router-dom";


const RiskData = () => {
  let history = useHistory();
  const [showAirport, setShowAirport] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const [showFlight, setShowFlight] = useState(false);
  const [showPassenger, setShowPassenger] = useState(false);
  const [showRiskType, setShowRiskType] = useState(false);


  if ("Logged" !== (localStorage.getItem('login'))) {
    history.push('/Login');
}


  useEffect(() => {
    setShowAirport(true);
  }, []);



  const handleAirport = () => {
    setShowAirport(true);
    setShowTerminal(false);
    setShowFlight(false);
    setShowPassenger(false);
    setShowRiskType(false);

  };

  const handleTerminal = () => {
    setShowAirport(false);
    setShowTerminal(true);
    setShowFlight(false);
    setShowPassenger(false);
    setShowRiskType(false);
  };

  const handleFlight = () => {
    setShowAirport(false);
    setShowTerminal(false);
    setShowFlight(true);
    setShowPassenger(false);
    setShowRiskType(false);
  };

  const handlePassenger = () => {
    setShowAirport(false);
    setShowTerminal(false);
    setShowFlight(false);
    setShowPassenger(true);
    setShowRiskType(false);
  };

  const handleRiskType = () => {
    setShowAirport(false);
    setShowTerminal(false);
    setShowFlight(false);
    setShowPassenger(false);
    setShowRiskType(true);
  };


  return (
    <div>
      <div
        style={{
          height: "auto",
          width: "80%",
          marginLeft: "340px",
          textAlign: "left",
        }}
      >
        <br/>
        <div style={{height:"auto",width:"80%",margin:"auto"}}>
          <MDBRow>
            <MDBCol>
              <Button style={{ width: "150px" }} onClick={() => handleAirport()}>Aiport</Button>
            </MDBCol>
            <MDBCol>
              <Button style={{ width: "150px" }} onClick={() => handleTerminal()}>Terminal</Button>
            </MDBCol>
            <MDBCol>
              <Button style={{ width: "150px" }} onClick={() => handleFlight()}>Flight</Button>
            </MDBCol>
            <MDBCol>
              <Button style={{ width: "150px" }} onClick={() => handlePassenger()}>Passenger</Button>
            </MDBCol>
            <MDBCol>
              <Button style={{ width: "150px" }} onClick={() => handleRiskType()}>Risk Types</Button>
            </MDBCol>
          </MDBRow>
        </div>
        <br />
        {showAirport ? <>
        <AirportRisk/>
        </> : null}

        {showTerminal ? <>
            <TerminalRisk/>
            </> : null}

        {showFlight ? 
            <FlightRisk/> : null}

        {showPassenger ? 
            <PassengerRisk/> : null}
        {showRiskType ? 
            <RiskTypeRisk/> : null}
      </div>
    </div>
  );
};

export default RiskData;
