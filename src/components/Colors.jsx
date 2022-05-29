import React, { useEffect, useRef, useState } from "react";
import "./Colors.css";

export const Colors = () => {
  let [color, setColor] = useState([]);
  let [outputArr, setOutputArr] = useState([]);
  let [warningColor, setWarningColor] = useState("Blue");
  let inputRef = useRef();

  useEffect(() => {
    let temp = getColors();
    setColor(temp);
  }, []);

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

  const getRandom = (min, max) => {
    let step1 = max - min + 1;
    let step2 = Math.random() * step1;
    let result = Math.floor(step2) + min;
    return result;
  };

  const handleClick = (warning) => {
    let arr = [];
    if (inputRef.current.value > color.length) {
      setWarningColor("red");
      return;
    }
    setWarningColor("blue");
    for (let i = 0; i < color.length; i++) {
      if (inputRef.current.value == i + 1) {
        setOutputArr([...outputArr, ...[color[i]]]);
      } else {
        arr.push(color[i]);
      }
    }
    setColor(arr);
  };

  const handleClickOuterArr = (e) => {
    let arr = [];
    for (let i = 0; i < outputArr.length; i++) {
      let num = Object.values(outputArr[i]);
      if (num == e.target.id) {
        let arr1 = [];
        let count = 0;
        for (let j = 0; j < color.length; j++) {
          let temp = Object.values(color[j]);
          if (temp[0] > num && count == 0) {
            arr1.push(outputArr[i]);
            arr1.push(color[j]);
            count++;
          } else {
            arr1.push(color[j]);
          }
        }
        if (arr1.length != color.length + 1) {
          console.log(arr1, color);
          arr1.push(outputArr[i]);
        }
        setColor(arr1);
      } else {
        arr.push(outputArr[i]);
      }
    }
    setOutputArr(arr);
  };

  return (
    <div id="main-div">
      <div>
        <h2> Empty div </h2>
        <div id="empty-div">
          {outputArr.map((c) => {
            return (
              <div
                onClick={handleClickOuterArr}
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
      <div>
        <h2> Provide Number and Shoot </h2>
        <div id="input-div">
          <div style={{ color: `${warningColor}` }}>
            {" "}
            Note : Please enter Number equal / below :  {color.length} .{" "}
          </div>
          <input ref={inputRef} type="number" min="1" max={color.length} />
          <button onClick={handleClick}>Shoot</button>
        </div>
      </div>
    </div>
  );
};
