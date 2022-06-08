import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {Button} from '@mui/material';

function App() {
    return (
        <>
        {/* <div className="App">
          <header className="App-header">
            <img src="logo.png" alt="logo" />
            <div>
              We're building an amazing site for patients!
            </div>
          </header>
        </div> */}
        <div className="container-fluid d-flex flex-column justify-content-center align-items-center my-5">
            <img className="" src="logo.png" alt="logo" />
            <div className="display-3 text-center my-5">Come back soon</div>
            <div className="display-5 text-center my-2">We are building and amazing site for doctors and patients</div>
            <p>learn react</p>
        </div>
        </>
    );
}

function MyApp() {
  return (
    <Button variant="outlined">Click me!</Button>
  );
}

export default App;
export {MyApp}
