import "./normalize.min.css";
import "./styles.css";

var pinState = false;
var timer = 5000 * 60; // only in ms

let context = null;
const beep_duration = 2000;
const beep_freq = 4500;

document
  .getElementById("output")
  .addEventListener("change", function toggleCheckbox(element) {
    element = element.target;

    var sliderValue = document.getElementById("timerSlider");

    var xhr = new XMLHttpRequest();
    if (element.checked) {
      sliderValue.disabled = true;

      /*
      context = new AudioContext();
      beep();
      context = null; */

      pinState = true;
      xhr.open("GET", "http://172.0.0.1/turnOn?time=" + timer, true);
      xhr.send();
      document.getElementById("timeleft").style.visibility = "visible";
      document.getElementById("timeleft").innerText = msToTime(timer);
      runCount(timer - 1000);

      var stmp = setTimeout(function () {
        if (document.getElementById(element.id).checked) {
          document.getElementById("timerSlider").disabled = false;
          document.getElementById(element.id).checked = false;
        }
      }, timer);
    } else {
      sliderValue.disabled = false;
      pinState = false;
      document.getElementById("timerSlider").disabled = false;
      xhr.open("GET", "http://172.0.0.1/turnOff", true);
      xhr.send();

      document.getElementById("timeleft").innerText = "N/A";
      document.getElementById("timeleft").style.visibility = "hidden";
      document.getElementById("output").checked = false;
      document.getElementById("timerSlider").disabled = false;
      clearInterval(countdown_lp);

      try {
        clearTimeout(stmp);
      } catch (error) {
        console.log(error);
      }
    }
  });

document
  .getElementById("timerSlider")
  .addEventListener("change", function updateSliderTimer() {
    var sliderValue = document.getElementById("timerSlider").value;
    document.getElementById("timerValue").innerHTML = sliderValue + " min";
    timer = parseInt(sliderValue) * 1000 * 60;
  });

function getInitialData() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      clbk(JSON.parse(this.responseText));
    }
  };
  xmlhttp.open("GET", "http://172.0.0.1/getValue", true);
  xmlhttp.send();

  function clbk(dta) {
    if (parseInt(dta.time) > 0) timer = parseInt(dta.time);
    pinState = !!parseInt(dta.status);
    document.getElementById("timerValue").innerHTML =
      parseInt(timer) / 1000 / 60 + " min";
    document.getElementById("timerSlider").value = parseInt(timer) / 1000 / 60;
    document.getElementById("output").checked = pinState;
    if (pinState) document.getElementById("timerSlider").disabled = true;
    else document.getElementById("timerSlider").disabled = false;

    if (dta.status == "1") {
      var time_left = parseInt(dta.time) - parseInt(dta.ontime);
      document.getElementById("timeleft").style.visibility = "visible";
      document.getElementById("timeleft").innerText = msToTime(time_left);
      runCount(time_left - 1000);
    }
  }
}
var countdown_lp;
function runCount(mss) {
  countdown_lp = setInterval(function () {
    if (pinState == true) {
      document.getElementById("timeleft").style.visibility = "visible";
      document.getElementById("timeleft").innerText = msToTime(mss);
      mss = mss - 1000;
      if (mss < 0) {
        document.getElementById("timeleft").innerText = "N/A";
        document.getElementById("timeleft").style.visibility = "hidden";
        document.getElementById("output").checked = false;
        document.getElementById("timerSlider").disabled = false;
        clearInterval(countdown_lp);
       
      }
    } else {
      document.getElementById("timeleft").innerText = "N/A";
      document.getElementById("timeleft").style.visibility = "hidden";
      document.getElementById("output").checked = false;
      document.getElementById("timerSlider").disabled = false;
      clearInterval(countdown_lp);
      
    }
  }, 1000);
}
function msToTime(duration) {
  var seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  return "Remaining Time: " + minutes + ":" + seconds;
}
/*
const beep = (freq = beep_freq, duration = beep_duration, vol = 100) => {
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.connect(gain);
  oscillator.frequency.value = freq;
  oscillator.type = "square";
  gain.connect(context.destination);
  gain.gain.value = vol * 0.01;
  oscillator.start(context.currentTime);
  oscillator.stop(context.currentTime + duration * 0.001);
};
*/
window.onload = getInitialData;
