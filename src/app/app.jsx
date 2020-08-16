import React, { useState } from "react";
import MainComponent from "./movie-portal";
import { Header, ErrorBoundries } from "./_shared/components";
import { usePromiseTracker } from 'react-promise-tracker';
import Loader from 'react-promise-loader';
import 'toasted-notes/src/styles.css';
import AuthContext from './utils/auth.context';


function App() {
  const currentRole = localStorage.getItem('role');

  const [role, setRole] = useState(currentRole);

  const setAuthUserRole = (role) => {
    if (role) {
      localStorage.setItem('role', role);
    } else {
      localStorage.removeItem('role');
    }
    setRole(role);
  };

  return (
    <AuthContext.Provider value={{ role, setRole: setAuthUserRole }}>
      <div className="App">
        <div className="h-100 w-100">
          <Loader
            // className="d-flex align-items-center justify-content-center"
            style={{ position: 'relative', top: '50%', left: '50%'}}
            promiseTracker={usePromiseTracker}
            color="#282c34"
            background="rgba(255,255,255,0.200)"
          />
        </div>
        <ErrorBoundries>
          <Header className="navbar" />
          <br></br>
          <MainComponent />
        </ErrorBoundries>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
