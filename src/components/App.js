import React, { useState } from 'react';
import './App.css';
import { Route, Routes } from "react-router-dom";
import {
  Navigation,
  Footer,
  Home,
  About,
  Contact,
  Ticket,
  Login,
  Register,
  Profile,
  CreateTicket,
  TicketTable
} from "../components";

const App = () => {
  const [id, setId] = useState(JSON.parse(localStorage.getItem("userId")))
  const [, updateState] = useState({})

  return (
    <div className="App">
      <Navigation id={id} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/table" element={<TicketTable />} />
        <Route path="/ticket">
          <Route path=":ticketSlug" element={<Ticket />} />
        </Route>
        <Route path="/createticket" element={<CreateTicket />} />
        <Route path="/login" element={<Login setId={setId} />} />
        <Route path="/register" element={<Register setId={setId} />} />
        <Route path="/profile" element={<Profile id={id} setId={setId} updateState={updateState} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;