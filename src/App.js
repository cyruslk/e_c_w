import React, {useState, useEffect} from 'react';
import axios from "axios";
import Clock from "./Clock";
import ImgBackground from "./ImgBackground";
import './App.css';

function App() {

  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get("https://sheet.best/api/sheets/b88ebd9c-12bb-4dc7-a9b8-6b30253f25eb")
      .then((response => {
        const {data} = response;
        setData(data);
      }
    ));  
  }, []);

  if(!data){
    return null;
  }

  return (
    <div className="container">
      <Clock 
        id="1"
        imgArray={data} 
        position={"relative"}
      />
      <ImgBackground 
        imgArray={data} />
    </div>
  )
 }

export default App;
