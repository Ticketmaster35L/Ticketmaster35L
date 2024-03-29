import React from "react";
import { NavLink } from "react-router-dom";
import { default as Username } from "./Username"

function Navigation(props) {
  return (
    <div className="navigation">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            Ticketmaster
          </NavLink>
          <div>
            <ul className="navbar-nav ml-auto">
              {props.id && props.id !== "" ? <></> : <>
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                  <span className="sr-only">(current)</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  About
                </NavLink>
              </li>
              </>}
              {props.id && props.id !== "" ? <>
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Table
                </NavLink>
              </li>
              </> : <></>}
              <li className="nav-item">
                <NavLink className="nav-link" to={props.id && props.id !== "" ? "/profile" : "/login"}>
                  <b><Username id={props.id} /></b>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;
