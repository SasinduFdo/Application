import React from "react";
import { useHistory } from "react-router-dom";
import { Card } from "react-bootstrap";
const Home = () => {
  let history = useHistory();

  if ("Logged" !== localStorage.getItem("login")) {
    history.push("/Login");
  }

  return (
    <div
        class="bg_image"
        style={{
          backgroundImage: 'url(https://imgs.search.brave.com/JAKXJPbjlqHiAF43-ACl2-fm1f8zf4dOpU4Jb9YIbZQ/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXZlLmNv/bS93cC93cDI1NzQz/MTMuanBn)',
          backgroundSize: "cover",
          height: "100vh",
          color: "#f5f5f5"
        }}
      >
    <div style={{ width: "80%", margin: "0 auto", marginLeft: "340px" }}>
      <br/>
      <br/>
      <Card style={{ width: "80rem",margin:"auto" }}>
        <Card.Body>
          <Card.Title style={{color:"black",fontSize:"30px"}}>Welcome to Greenline System</Card.Title>
          <Card.Subtitle className="mb-2 text-muted" style={{fontSize:"23px"}}>
          A risk management solution that asses the risk of aircraft, crew, cargo and travelers.
          </Card.Subtitle>
          <Card.Text style={{fontSize:"17px",color:"black"}}>
            We provide our customers with the capability to improve
            decision-making in support of enforcement and facilitation
            regulatory mandates.  Started in 2002 by subject matter experts
            in border control, risk management, and logistics.
            <br />
            <br />
            Our offices are located in Washington DC, Ottawa, and The Hague, we
            are popularly known for delivering risk management solutions for a
            broad spectrum of defence, intelligence, law, and regulatory
            enforcement agencies. 
            <br />
            <br />
            Our solutions help analysts and decision-makers address risks to
            safety, security, health and revenue. Our solutions are operational
            in the United States, Canada, Europe, Central America, South
            America, Africa, and the Caribbean supporting defence,
            anti-smuggling, and regulatory enforcement missions.
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
    </div>
  );
};

export default Home;
