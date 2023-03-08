import logo from './logo.svg';
import './test.css';

function Test() {
  return (
    <div className="Test">
      <header className="Test-header">
        <img src={logo} className="Test-logo" alt="logo" />
        <form>
          <input>Basic Input</input>
          <button type='submit'></button>
        </form>
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
