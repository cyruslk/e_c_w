import React, { useState, useEffect } from 'react';
import './Clock.css';
let converter = require('number-to-words');


function Clock(props){

  const {
    imgArray, 
    position, 
    id, 
    passImgToParent
  } = props;

  useEffect(() => {

    function cloneTicks() {
      for (let i = 1; i <= 12; i++) {
      let el = document.querySelector(".fiveminutes");
      let clone = el.cloneNode(true);
      clone.setAttribute('class', `fiveminutes f${i}`);
      let app = document.getElementById("clockface").appendChild(clone)
      let el2 = document.querySelector(`.f${i}`);
      el2.style.transform = `rotate(${30 * i}deg)`;
      }
      
      for (let i = 1; i <= 60; i++) {
        let el = document.querySelector(".minutes");
        let clone = el.cloneNode(true);
        clone.setAttribute('class', `minutes m${i}`);
        let app = document.getElementById("clockface").appendChild(clone)
        let el2 = document.querySelector(`.m${i}`);
        el2.style.transform = `rotate(${6 * i}deg)`;
          }
      }
    
    const sechand = document.querySelector('.sec')
    const minhand = document.querySelector('.min')
    const hourhand = document.querySelector('.hour')
    
    let sec, min, hour;
    
    function setTime() {
      const now = new Date();
      
      sec = now.getSeconds();


      const secdeg = ((sec / 60) * 360);
      sechand.style.transform = `rotate(${secdeg}deg)`;
      
      min = now.getMinutes();
      const mindeg = ((min / 60) * 360);
      minhand.style.transform = `rotate(${mindeg}deg)`;
      
      hour = now.getHours();
      const hourdeg = ((hour + min/60) / 12 * 360);
      hourhand.style.transform = `rotate(${hourdeg}deg)`;
    }
    
    cloneTicks();	
    setInterval(setTime, 1000);


  }, []);
  
  return (
      <div 
        style={{position: `${position}`}}
        className="clock">
          <div id="clockface">
              <div className="hand hour">
                {renderImgArray(imgArray, 4, "hour")}
              </div>
              <div className="hand min">
                {renderImgArray(imgArray, 4, "min")}
              </div>
              <div className="hand sec">
                {renderImgArray(imgArray, 5, "sec")}
              </div>
              <div className="centerpoint"></div>
              {renderImgArray(imgArray, 12, "numbers")}
              <div className="fiveminutes"></div>
              <div className="minutes"></div>
          </div>
        </div>
  )
};


const renderImgArray = (imgArray, returnValue, type) => {

  const handleClickImage = (ele) => {
    console.log("-", ele);
  }

  const shuffledArray = imgArray.sort(() => 0.5 - Math.random());
  let selectedImg = shuffledArray.slice(0, returnValue);

  if(type !== "numbers"){
    return selectedImg.map((ele) =>{
      return (
        <img 
          onClick={() => handleClickImage(ele)}
          src={ele.url} 
          alt={""} 
        />
      )
    });
  }else{
    return selectedImg.map((ele, index) =>{
      let className=`numbers ${converter.toWords(index+1)}`;
      return (
        <div className={className}>
          <span>{index+1}</span>
          <img 
          onClick={() => handleClickImage(ele)}
          src={ele.url} alt={""} 
          />
        </div>
      )
    });
  }
};

export default Clock;
