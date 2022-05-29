import React, { useEffect, useRef, useState } from "react";
import "./Colors.css";

export const Colors = () => {

  let [color, setColor] = useState([]);          // This state is to use the color when the component is mounter;
  let [emptyDivArray, setemptyDivArray] = useState([]);      // This state is to use to add the object when shoot button is clicked;
  let [alertUser, setalertUser] = useState("Blue");       // to give the alert to the user what numbers they can use;
  let inputRef = useRef();      // to store the value of the input number;

  useEffect(() => {
    setColor(getColors());
  }, []);

  // getColors function is to return the random array of objects with color and unique values with the help of getRandom function;
  const getColors = () => {  
    let fiveColors = ["blue", "red", "yellow", "orange", "pink"];
    let arr = [];
    for (let i = 0; i < 5; i++) {
      let index = getRandom(0, fiveColors.length - 1);
      let obj = {};
      obj[fiveColors[index]] = i + 1;
      arr.push(obj);
      fiveColors.splice(index, 1);
    }
    return arr;
  };

  // getRandom function is used to generate the random number from the parameters;
  const getRandom = (min, max) => {  
    let step1 = max - min + 1;
    let step2 = Math.random() * step1;
    let result = Math.floor(step2) + min;
    return result;
  };

  // handleShoot function is use to manage the Event of the Shoot buttonThe changes in Circles and Empty div are done in this function;
  const handleShoot = () => {       

    if (inputRef.current.value > color.length) {  // This condition to alert the user; 
      setalertUser("red");
      return;
    }

    let arr = [];
    setalertUser("blue");
    for (let i = 0; i < color.length; i++) {
      if (inputRef.current.value == i + 1) {
        setemptyDivArray([...emptyDivArray, ...[color[i]]]);
      } else {
        arr.push(color[i]);
      }
    }
    setColor(arr);
  };

  // handleOnclickForCircles is used to make the circles back to it's previous places and remove from empty-div;
  const handleOnclickForCircles = (e) => {
    let outerArray = [];
    for (let i = 0; i < emptyDivArray.length; i++) {  // This loop is to remove the circle which is clicked ;
      let num = Object.values(emptyDivArray[i]);
      if (num == e.target.id) {
        let innerArray = [];
        let count = 0;
        for (let j = 0; j < color.length; j++) {  // This loop is to add the object into array by the original order of elements;
          let value = Object.values(color[j]);
          if (value[0] > num && count == 0) {
            innerArray.push(emptyDivArray[i]);
            innerArray.push(color[j]);
            count++;
          } else {
            innerArray.push(color[j]);
          }
        }
        if (innerArray.length != color.length + 1) {
          // console.log(innerArray, color);
          innerArray.push(emptyDivArray[i]);
        }
        setColor(innerArray);
      } else {
        outerArray.push(emptyDivArray[i]);
      }
    }
    setemptyDivArray(outerArray);
  };

  return (
    <div id="main-div">
      {/* Empty Container for shifting the circles as per shoot click */}
      <div>
        <h2> Empty div </h2>
        <div id="empty-div">
          {emptyDivArray.map((c) => {
            return (
              <div
                onClick={handleOnclickForCircles}
                className="empty-div-circles"
                id={Object.values(c)}
                key={Object.values(c)}
                style={{
                  backgroundColor: `${Object.keys(c)}`,
                }}
              ></div>
            );
          })}
        </div>
      </div>
      {/* div for showing Circles/Balloons when UI is mounted */}
      <div>
        <h2> Circle/s </h2>
        <div id="colored-circles-div">
          {color.map((c) => {
            return (
              <div
                className="circles"
                id={Object.values(c)}
                key={Object.values(c)}
                style={{ backgroundColor: `${Object.keys(c)}` }}
              ></div>
            );
          })}
        </div>
      </div>
        {/* div which contains input and button */}
      <div>
        <h2> Provide Number and Shoot </h2>
        <div id="input-div">
          <div style={{ color: `${alertUser}` }}>
            {" "}
            Note : Please enter Number equal / below :  {color.length} .{" "}
          </div>
          <input ref={inputRef} type="number" min="1" max={color.length} />
          <button onClick={handleShoot}>Shoot</button>
        </div>
      </div>
    </div>
  );
};
