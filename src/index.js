import React from "react";
import { createRoot } from "react-dom/client"
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Navigation,
  Footer,
  Home,
  About,
  Contact,
  Blog,
  Posts,
  Post,
  Test,
  Login,
<<<<<<< HEAD
  CreatePost,
  Ticket_Table
=======
  CreateTicket
>>>>>>> 71ce5dee58b1b19e3e656554646d251c6b05ba2c
} from "./components";


const container = document.getElementById("root")
const root = createRoot(container)
root.render(
  <Router>
    <Navigation />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/tickets" element={<Ticket_Table />} />
      <Route path="/blog" element={<Blog />}>
        <Route path="" element={<Posts />} />
        <Route path=":postSlug" element={<Post />} />
      </Route>
      <Route path="/createticket" element={<CreateTicket />} />
      <Route path="/test" element={<Test />} />
      <Route path="/login" element={<Login />} />
    </Routes>
    <Footer />
  </Router>

);

serviceWorker.unregister();

/*
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
*/
