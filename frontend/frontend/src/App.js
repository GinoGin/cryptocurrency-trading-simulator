import Loginpage from "./components/loginpage";
import React from 'react'
import { Route, Routes } from "react-router-dom";
import Registerpage from "./components/registerpage";
import Dashboard from "./components/dashboard";
import Coin from "./components/coin";

function App() {
  return (
    <div >
      <Routes>
        <Route path = '/' element={<Dashboard />} />
        <Route path='/login' element={<Loginpage />} />
        <Route path='/register' element={<Registerpage/>} />
        <Route path='/coin/:coin' element={<Coin/>} />
      </Routes>
    </div>
  );
}

export default App;
