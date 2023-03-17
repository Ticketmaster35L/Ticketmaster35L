import React from "react";
import{ SmileFilled, SmileOutlined} from "@ant-design/icons";
import {Divider} from 'antd';

function About() {
  return (
    <div className="about">
      <div class="container">
        <div class="center my-15 color:#3f6600">
          <div class="center-lg-10 my-5">
            <h1 class="font-weight-dark">About</h1>
            <p style={{ fontFamily: "Arial", fontSize: "20px", icon: [<SmileOutlined key="copy-icon" />,
             <SmileFilled key="copied-icon" />], tooltips: ['click here', 'you clicked!!'] }}>
            This React-run website is apart of a cumulative project created for 2023 <br/ >Winter Quarter CS 35L. 
             This was created by a group of students. Josh Taylor, <br/ >Aryan Janolkar, Nate Carmon,Brian Young and David Marsh. 
            </p>
          <Divider/>
          <img
              className="img-fluid rounded mb-0 mb-lg-0"
              src=""
              alt=""
            />
        </div>
      </div>
    </div>
  </div>
)}

export default About;