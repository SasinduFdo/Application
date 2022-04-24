import React, { useState, useEffect } from "react";
import { MDBDataTable } from "mdbreact";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Airports = () => {
  let history = useHistory();
  const [airports, setAirports] = useState([]);


  if ("Logged" !== (localStorage.getItem('login'))) {
    history.push('/Login');
}

  const data = {
    columns: [
      {
        label: "Airport IATA Code",
        field: "airportIATACode",
        sort: "asc",
        width: 150,
      },
      {
        label: "Airport ISO Code",
        field: "airportISOCode",
        sort: "asc",
        width: 150,
      },
      {
        label: "Airport Name",
        field: "airportName",
        sort: "asc",
        width: 150,
      },
      {
        label: "Airport Location",
        field: "airportLocation",
        sort: "asc",
        width: 150,
      },
    ],
    rows: airports,
  };

  useEffect(() => {
    getAirportList();
  }, []);

  const getAirportList = async () => {
    // Sending the request to get the airport data
    await axios
      .get(process.env.REACT_APP_API_URL+"viewAirport")
      .then((response) => {
        if (response.status !== 500) {
          setAirports(response.data);
        }
      });
  };

  return (
    <div style={{ width: "80%", margin: "0 auto", marginLeft: "340px" }}>
      <br />
      <div style={{ textAlign: "left" }}>
        <MDBDataTable
          style={{
            fontFamily: "'Roboto', sans-serif",
          }}
          striped
          bordered
          small
          data={data}
        />
      </div>
    </div>
  );
};

export default Airports;
