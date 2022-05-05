import React, { useState, useEffect } from "react";
import { MDBDataTable } from "mdbreact";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Authentication from "../../services/Authentication";

const Airlines = () => {
  let history = useHistory();
  const [airlines, setAirlines] = useState([]);

  if ("Logged" !== localStorage.getItem("login")) {
    history.push("/Login");
  }

  const data = {
    columns: [
      {
        label: "Airline Name",
        field: "airlineCompanyName",
        sort: "asc",
        width: 150,
      },
      {
        label: "Airline Code",
        field: "airlineCode",
        sort: "asc",
        width: 150,
      },
      {
        label: "Country",
        field: "airlineCountry",
        sort: "asc",
        width: 150,
      },
    ],
    rows: airlines,
  };

  useEffect(() => {
    getAirlineList();
  }, []);

  const getAirlineList = async () => {
    // Sending the request to get the airline data

    console.log(Authentication());
    await axios
      .get(process.env.REACT_APP_API_URL + "viewAirline", { headers: Authentication() })
      .then((response) => {
        if(response.data.message === "login")
        {
          history.push("/Login");
        }
        else if (response.status !== 500 ) {
          console.log(response.data.message);
          setAirlines(response.data);
        } else {
          history.push("/Login");
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

export default Airlines;
