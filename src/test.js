import logo from './logo.svg';
import './test.css';
import './jsonEventHandler.js'
import './processJSON.js'

function Test() {
  return (
    <div className="Test">
      <header className="Test-header">
        <img src={logo} className="Test-logo" alt="logo" />
        <form id="inputForm">
          <input type="text" id="basicInput">Basic Input</input>
          <button type='submit'></button>
        </form>

        <script>
          const inForm = document.querySelector('inputForm');
          inForm.addEventListener('submit', parseJSON);

          function parseJSON(event) {'{'}
            let input = document.getElementById("basicInput");
            let inputArr = input.split(" ");
            let bugName = inputArr[0];
            let bugStatus = inputArr[1];
            let assignedPerson = inputArr[2];
    
            let dateBase = new Date();
            let currentDay = dateBase.getDate();
            let currentMonth = dateBase.getMonth();
            let currentYear = dateBase.getFullYear();
            let currentDate = `${currentDay}-${currentMonth}-${currentYear}`;
    
            const ticket = {'{'}name: bugName, status: bugStatus, creationDate: currentDate, assignedUser: assignedPerson{'}'};
    
            jsonString = JSON.stringify(ticket);
    
            module.exports = {'{'} 
                'jsonString': jsonString
              {'}'};
          {'}'}
        </script>
        <p>
          Edit <code>src/Test.js</code> and save to reload.
        </p>
        <a
          className="Test-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default Test;
