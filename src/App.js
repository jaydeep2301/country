import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [allCountry, setAllCountry] = useState([]);
  useEffect(() => {
    getAllCountry();
  }, []);
  const getAllCountry = async () => {
    let data = await fetch("https://restcountries.com/v3.1/all");
    data = await data.json();
    console.log(data);
  };

  return <div className="App"></div>;
}

export default App;
