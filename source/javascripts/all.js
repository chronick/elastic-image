//= require_tree .
"use strict";

document.addEventListener("DOMContentLoaded", function(){
  var logo = document.getElementById('logo');

  var debug = false;

  var xCenter = 0;
  var yCenter = 0

  var x,y,z
  var xBuffer = []; 
  var yBuffer = [];
  var zBuffer = [];

  var xOffset, yOffset, zOffset;

  var width,height;
  var left,top;

  var zDrag = 5;
  var xDrag = 8;
  var yDrag = 8;

  var smoothThreshold = 0.5;

  var maxBuffer = 4;

  var cssText;


  var calculateCenter = function() {
    xCenter = (document.width/2) - (logo.width/2);
    yCenter = (document.width/2) - (logo.height/2);
  }

  var sum = function(array) {
    return array.reduce(function(previousValue, currentValue){
      return currentValue + previousValue;
    });
  };

  var avg = function(array) {
    return sum(array) / array.length;
  }

  var smooth = function(num) {
    if (Math.abs(num) >= smoothThreshold) {
      return num;
    }
    else return 0;
  }

  var addToBuffer = function(array, current) {
    if (array instanceof Array) {
      if (array.length >= maxBuffer){
        console.log(array.pop());
      }
      array.unshift(smooth(current));
    }
  };

  var currentAvg = function(array, current) {
    addToBuffer(array, current);
    return avg(array);
  };

  var motionHandler = function(event){
    x = currentAvg(xBuffer, event.acceleration.x);
    y = currentAvg(yBuffer, event.acceleration.y);
    z = currentAvg(zBuffer, event.acceleration.z);

    xOffset = Math.floor(x * xDrag);
    yOffset = Math.floor(y * yDrag);
    zOffset = z * zDrag;

    left = (xCenter + xOffset);
    top = (yCenter + yOffset);
    width = (150 + zOffset);

    cssText = "left: " + left.toString() + "px;"
    + "top: " + top.toString() + "px;"
    + "width: " + width.toString() + "px;";

    // logo.style.left = left.toString() + "px";
    // logo.style.top = top.toString() + "px";
    // logo.style.width = (width).toString() + "px";

    logo.style.cssText = cssText;

    if(debug) {
      document.getElementById('a-x').innerHTML = 'x' + x.toString();
      document.getElementById('a-y').innerHTML = 'y' + y.toString();
      document.getElementById('a-z').innerHTML = 'z' + z.toString();
    }

    calculateCenter();
  };

  var resizeHandler = function() {
    calculateCenter();
    logo.style.left = xCenter.toString() + "px";
    logo.style.top = yCenter.toString() + "px";
    logo.style.width = "100px";
  }

  window.addEventListener('devicemotion', motionHandler);
  window.addEventListener('resize', resizeHandler);
  resizeHandler();
});
