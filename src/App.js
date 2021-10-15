import React, { useCallback, useState, useEffect } from "react";
import axios from "axios";
import Clock from "./Clock";
import './App.css';
import "./ec.css";


function App() {

    const [data, setData] = useState(null);

    const callback = useCallback((count) => {
      console.log(count);
    }, []);

    const runAnimation=()=>{

      let msg = "T O O N D A T A W O R L D";  
      let size = 24;
      let circleY = 1; 
      let circleX = 3; 
      let letter_spacing = 5; 
      let diameter = 15;
      let rotation = -0.4;
      let speed = 0.4;   
        
      if (!window.addEventListener 
        && !window.attachEvent 
        || !document.createElement) return;
      
          msg = msg.split('');
          let n = msg.length - 1, 
          a = Math.round(size * diameter * 0.208333), 
          currStep = 20,
          ymouse = a * circleY + 20, 
          xmouse = a * circleX + 20, 
          y = [], 
          x = [], 
          Y = [], 
          X = [],
          o = document.createElement('div'), 
          oi = document.createElement('div'),
          b = document.compatMode && document.compatMode != "BackCompat"? document.documentElement : document.body,
    
          mouse = function(e){
          e = e || window.event;
          ymouse = !isNaN(e.pageY)? e.pageY : e.clientY; // y-position
          xmouse = !isNaN(e.pageX)? e.pageX : e.clientX; // x-position
          },

          makecircle = function(){ // rotation/positioning
          if(init.nopy){
            o.style.top = (b || document.body).scrollTop + 'px';
            o.style.left = (b || document.body).scrollLeft + 'px';
          };
          currStep -= rotation;
          for (let d, i = n; i > -1; --i){ // makes the circle
            d = document.getElementById('iemsg' + i).style;
            d.top = Math.round(y[i] + a * Math.sin((currStep + i) / letter_spacing) * circleY - 15) + 'px';
            d.left = Math.round(x[i] + a * Math.cos((currStep + i) / letter_spacing) * circleX) + 'px';
          };
          },  
    
          drag = function(){ // makes the resistance
          y[0] = Y[0] += (ymouse - Y[0]) * speed;
          x[0] = X[0] += (xmouse - 20 - X[0]) * speed;
          for (let i = n; i > 0; --i){
            y[i] = Y[i] += (y[i-1] - Y[i]) * speed;
            x[i] = X[i] += (x[i-1] - X[i]) * speed;
          };
          makecircle();
        },
          
          init = function(){ // appends message divs, & sets initial values for positioning arrays
          if(!isNaN(window.pageYOffset)){
            ymouse += window.pageYOffset;
            xmouse += window.pageXOffset;
          } else init.nopy = true;
          for (let d, i = n; i > -1; --i){
            d = document.createElement('div'); d.id = 'iemsg' + i;
            d.style.height = d.style.width = a + 'px';
            d.appendChild(document.createTextNode(msg[i]));
            oi.appendChild(d); y[i] = x[i] = Y[i] = X[i] = 0;
          };
          o.appendChild(oi); document.body.appendChild(o);
          setInterval(drag, 25);
          },
          
          ascroll = function(){
          ymouse += window.pageYOffset;
          xmouse += window.pageXOffset;
          window.removeEventListener('scroll', ascroll, false);
          };
          
          o.id = 'outerCircleText'; o.style.fontSize = size + 'px';
          
          if (window.addEventListener){
          window.addEventListener('load', init, false);
          document.addEventListener('mouseover', mouse, false);
          document.addEventListener('mousemove', mouse, false);
            if (/Apple/.test(navigator.vendor))
            window.addEventListener('scroll', ascroll, false);
          }
          else if (window.attachEvent){
          window.attachEvent('onload', init);
          document.attachEvent('onmousemove', mouse);
          };
        };

        useEffect(() => {
          axios.get("https://sheet.best/api/sheets/b88ebd9c-12bb-4dc7-a9b8-6b30253f25eb")
            .then((response => {
              const {data} = response;
              setData(data);
            }
          )); 
          runAnimation(); 
        }, []);

    if(!data){
      return null;
    }
      return (
        <div className="container">

            <Clock 
              id="1"
              imgArray={data} 
              parentCallback={callback}
              position={"relative"}
            />

        </div>
      );
    }

export default App;


