import React from "react";

function Home() {
  return (
    <div className="home">
      <div className="container">
        <div className="row align-items-center my-5">
          <div className="col-lg-7">
            <img
              className="img-fluid rounded mb-4 mb-lg-0"
              src="https://www.itarian.com/images/ticketing-system-banner-img.png"
              alt=""
            />
          </div>
          <div className="col-lg-5">
            <h1 className="font-weight-light">Home</h1>
            <p>
              Welcome to the Ticketmaster Website! This is a locally-hosted WebApp that provides developers a means to
              organize and resolve internal software queries through the ticket submission and ticket tracking features.
              By assigning different project issues to your team and monitoring what still needs to be done through our 
              status tracker, you can easily streamline your software projects.
              Happy Coding!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
