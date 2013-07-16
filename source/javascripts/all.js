//= require_tree .

window.addEventListener('deviceorientation', function(){
  var rotate = event.gamma % 45;
  document.querySelectorAll('article').style.webkitTransform = "rotateX("+rotate+"deg)";
  })
});