import React, {useEffect} from 'react';


function ImgBackground(props) {

  function runAnimation() {

    let msg = "T O O N D A T A W O R L D";
    let size = 20;
    let circleY = 1;
    let circleX = 3;
    let letter_spacing = 5;
    let diameter = 15;
    let rotation = -0.4;
    let speed = 0.4;
  
    msg = msg.split('');

    let n = msg.length - 1;
    let a = Math.round(size * diameter * 0.208333);
    let currStep = 20;
    let ymouse = a * circleY + 20;
    let xmouse = a * circleX + 20;
    let y = [];
    let x = [];
    let Y = [];
    let X = [];
    let o = document.createElement('div');
    let oi = document.createElement('div');

    let b = document.compatMode 
    && document.compatMode !== "BackCompat" 
    ? document.documentElement : document.body;

    const mouse = (e) => {

      e = e || window.event;
      ymouse = !isNaN(e.pageY) ? e.pageY : e.clientY; // y-position
      xmouse = !isNaN(e.pageX) ? e.pageX : e.clientX; // x-position
    };

    const makecircle = () => {

      if (init.nopy) {
          o.style.top = (b || document.body).scrollTop + 'px';
          o.style.left = (b || document.body).scrollLeft + 'px';
      };
      currStep -= rotation;
      for (let d, i = n; i > -1; --i) { // makes the circle
          d = document.getElementById('iemsg' + i).style;
          d.top = Math.round(y[i] + a * Math.sin((currStep + i) / letter_spacing) * circleY - 15) + 'px';
          d.left = Math.round(x[i] + a * Math.cos((currStep + i) / letter_spacing) * circleX) + 'px';
      };
    };

    const drag = () => {

      y[0] = Y[0] += (ymouse - Y[0]) * speed;
      x[0] = X[0] += (xmouse - 20 - X[0]) * speed;
      for (let i = n; i > 0; --i) {
          y[i] = Y[i] += (y[i - 1] - Y[i]) * speed;
          x[i] = X[i] += (x[i - 1] - X[i]) * speed;
      };

      makecircle();
    };

    const init = () => {

        if (!isNaN(window.pageYOffset)) {
              ymouse += window.pageYOffset;
              xmouse += window.pageXOffset;
          } else init.nopy = true;
          for (let d, i = n; i > -1; --i) {
              d = document.createElement('div');
              d.id = 'iemsg' + i;
              d.style.height = d.style.width = a + 'px';
              d.appendChild(document.createTextNode(msg[i]));
              oi.appendChild(d);
              y[i] = x[i] = Y[i] = X[i] = 0;
          };
        o.appendChild(oi);
        document.body.appendChild(o);
        setInterval(drag, 25);
    };

    const ascroll = () => {
      ymouse += window.pageYOffset;
      xmouse += window.pageXOffset;
      window.removeEventListener('scroll', ascroll, false); 
    }


    o.id = 'outerCircleText';
    o.style.fontSize = size + 'px';

    if (window.addEventListener) {

        window.addEventListener('load', init, false);
        document.addEventListener('mouseover', mouse, false);
        document.addEventListener('mousemove', mouse, false);
        if (/Apple/.test(navigator.vendor))
            window.addEventListener('scroll', ascroll, false);
    } else if (window.attachEvent) {
        window.attachEvent('onload', init);
        document.attachEvent('onmousemove', mouse);
    }; 

    init();
    mouse();
    ascroll();
}

  const {imgArray} = props;

  const displayMainContent = (imgArray) => {

   let imgArrayToJsx = imgArray
   .map((ele, index) => {

    let styleImgDiv = {
      width: `${ele.dimensions}px`,
      display: "block"
    }

     return (
       <div style={styleImgDiv}>
         <img 
            style={{width: "100%"}}
            src={ele.url} 
            alt={ele.url}
         />
       </div>
     )
   }) 


    return (
      <div>
        {imgArrayToJsx}
      </div>
    )
  }

  useEffect(() => {
    runAnimation();
  }, []);

  return (
    <div />
  )
 }

export default ImgBackground;
