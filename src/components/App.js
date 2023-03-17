import React, { useState } from 'react';
import './App.css';
import { Route, Routes } from "react-router-dom";
import {
  Navigation,
  Footer,
  Home,
  About,
  Ticket,
  Login,
  Register,
  Profile,
  CreateTicket,
  TicketTable,
  NoPermission
} from "../components";

const App = () => {
  const [id, setId] = useState(JSON.parse(localStorage.getItem("userId")))
  const [, updateState] = useState({})

  return (
    <div className="App">
      <Navigation id={id} />
      <Routes>
        <Route path="/" element={id && id !== "" ? <TicketTable /> : <Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/table" element={id && id !== "" ? <TicketTable /> : <NoPermission />} />
        <Route path="/ticket">
          <Route path=":ticketSlug" element={id && id !== "" ? <Ticket /> : <NoPermission />} />
        </Route>
        <Route path="/createticket" element={id && id !== "" ? <CreateTicket /> : <NoPermission />} />
        <Route path="/login" element={<Login setId={setId} />} />
        <Route path="/register" element={<Register setId={setId} />} />
        <Route path="/profile" element={id && id !== "" ? <Profile id={id} setId={setId} updateState={updateState} /> : <NoPermission />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;