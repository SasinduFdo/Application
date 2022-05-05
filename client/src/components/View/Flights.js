import React, { useState, useEffect } from "react";
import { MDBDataTable, MDBBtn, MDBDataTableV5 } from "mdbreact";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Authentication from "../../services/Authentication";
const Flights = () => {
  let history = useHistory();
  const [flights, setFlights] = useState([]);
  const [passengerList, setPassengerList] = useState([]);
  const [showPassengers, setShowPassengers] = useState(false);


  if ("Logged" !== (localStorage.getItem('login'))) {
    history.push('/Login');
}


  const passengerTableData = {
    columns: [
      {
        label: "Flight Number",
        field: "passengerFlight",
        sort: "asc",
        width: 150,
      },
      {
        label: "Seat Number",
        field: "passengerSeatNumber",
        sort: "asc",
        width: 150,
      },
      {
        label: "Fore Name",
        field: "passengerForeName",
        sort: "asc",
        width: 150,
      },
      {
        label: "Family Name",
        field: "passengerFamilyName",
        sort: "asc",
        width: 150,
      },
      {
        label: "Passport Number",
        field: "passengerPassportNumber",
        sort: "asc",
        width: 150,
      },
      {
        label: "Country",
        field: "passengerCountry",
        sort: "asc",
        width: 150,
      },
    ],
    rows: passengerList,
  };

  useEffect(() => {
    getFlightList();
  }, []);

  const details = async (e) => {
    await axios
      .get(
        process.env.REACT_APP_API_URL+"viewPassengersByFlight?id=" +
          e.flightNumber, { headers: Authentication() }
      )
      .then((response) => {
        if (response.status !== 500 && response.message !== "Login") {
          setShowPassengers(true);
          setPassengerList(response.data);
          console.log(passengerList);
        }
      })
      .catch((error) => {
        console.log("error" + error.message);
      });
  };

  const handleClose = () => {
    setShowPassengers(false);
    setPassengerList([]);
  };

  const getFlightList = async () => {
    // Sending the request to get the flight data
    await axios
      .get(process.env.REACT_APP_API_URL+"viewFlight", { headers: Authentication() })
      .then((response) => {
        if (response.status !== 500) {
          setFlights(response.data);
          for (let a = 0; a < response.data.length; a++) {
            Object.assign(response.data[a], {
              getPassengers: (
                <Button
                  variant="success"
                  onClick={() => details(response.data[a])}
                  style={{
                    width: "50%",
                    fontFamily: "'Bebas Neue', cursive",
                    marginLeft: "25%",
                  }}
                >
                  VIEW
                </Button>
              ),
            });
          }
          setFlights({
            columns: [
              {
                label: "Flight Number",
                field: "flightNumber",
                sort: "asc",
                width: "10%",
              },
              {
                label: "Departure",
                field: "flightDeparture",
                sort: "asc",
                width: "10%",
              },
              {
                label: "Arrival",
                field: "flightArrival",
                sort: "asc",
                width: "10%",
              },
              {
                label: "Terminal",
                field: "flightTerminal",
                sort: "asc",
                width: "10%",
              },
              {
                label: "Aircraft",
                field: "flightAircraft",
                sort: "asc",
                width: "10%",
              },
              {
                label: "Capacity",
                field: "flightCapacity",
                sort: "asc",
                width: "10%",
              },
              {
                label: "Crew Members",
                field: "flightCrewNumber",
                sort: "asc",
                width: "10%",
              },
              {
                label: "View Passengers",
                field: "getPassengers",
                width: "10%",
              },
            ],
            rows: response.data,
          });
        }
      });
  };

  return (
    <>
      <Modal
        show={showPassengers}
        backdrop="static"
        size="xl"
        centered
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Passenger List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MDBDataTable
            style={{
              fontFamily: "'Roboto', sans-serif",
            }}
            striped
            bordered
            small
            data={passengerTableData}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <div
        style={{
          height: "auto",
          width: "80%",
          marginLeft: "340px",
          textAlign: "left",
        }}
      >
        <br />
        <MDBDataTable
          style={{
            fontFamily: "'Roboto', sans-serif",
          }}
          striped
          bordered
          small
          data={flights}
        />
      </div>
    </>
  );
};

export default Flights;
