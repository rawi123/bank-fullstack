import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Add from './components/Add';
import Deposit from './components/Deposit';
import Withdrawal from './components/Withdrawal';
import Transfer from "./components/Transfer"
import axios from "axios"
import CreditChange from './components/CreditChange';

function App() {

  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(process.env.REACT_APP_API).then(data => {
      const dataSorted = data.data.sort((a, b) => a.passportID - b.passportID);
      setData(dataSorted);
      sessionStorage.setItem("data", JSON.stringify(dataSorted));
    })
  }, [])

  const setDataWithSort = (data) => {
    setData(data = data.sort((a, b) => a.passportID - b.passportID))
  }

  const updateSingleUser = (id, user) => {
    let dataTemp = [...data];
    const userTemp = dataTemp.find(user => user.passportID === id);
    for (const change in user) {
      userTemp[change] = user[change]
    }
    setData(dataTemp);

  }

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home data={data} setData={setData} updateSingleUser={updateSingleUser} />} />
        <Route path="/add" element={<Add data={data} setData={setDataWithSort} />} />
        <Route path="/deposit" element={<Deposit data={data} setData={setDataWithSort} updateSingleUser={updateSingleUser} />} />
        <Route path="/withdrawal" element={<Withdrawal data={data} setData={setDataWithSort} updateSingleUser={updateSingleUser} />} />
        <Route path="/credit-change" element={<CreditChange data={data} setData={setDataWithSort} updateSingleUser={updateSingleUser} />} />
        <Route path="/transfer" element={<Transfer data={data} setData={setDataWithSort} updateSingleUser={updateSingleUser} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
