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
  App,
  Login,
  CreatePost,
  TicketTable
} from "./components";



export default App;
const container = document.getElementById("root")
const root = createRoot(container)
root.render(
  <Router>
    <App />
    <Login/>
    <Navigation />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/blog" element={<Blog />}>
        <Route path="" element={<Posts />} />
        <Route path=":postSlug" element={<Post />} />
      </Route>
      <Route path="/CreatePost" element={<CreatePost />} />
      <Route path="/test" element={<Test />} />
      <Route path="/tickettable" element={<TicketTable />} />
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
