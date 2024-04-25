import logo from './logo.svg';
import './App.css';
import Routes from "./routes/index";
import React from "react";
import { AuthContextProvider } from './utils/AuthContext';
import Protected from './layout/CommonLayout/Protected';


function App() {
  return (
    <React.Fragment>
      <AuthContextProvider>
        {/* <Protected> */}
          <Routes />
        {/* </Protected> */}
      </AuthContextProvider>
    </React.Fragment>
  );
}

export default App;
