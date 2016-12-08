/**
 * Created by yonjar on 2016/12/6.
 */
const msPerDay = 86400000;
const init = function (selector) {
  const element = document.querySelector(selector);
  const dateString = element.getAttribute("data-dateString");
  const shortString = element.getAttribute("data-isShortString");
  const isShortString = shortString === "true";
  let nowDate = new Date();
  let thisDate, diffTime, diffString, longString;
  
  if (dateString === "" || dateString === null){
    thisDate = new Date(Date.now());
  }
  else {
    thisDate = new Date(dateString);
  }
  
  if (thisDate.getTime() > nowDate.getTime()){
    diffTime = thisDate.getTime() - nowDate.getTime();
    diffString = "還有";
  }
  else {
    diffTime = nowDate.getTime() - thisDate.getTime();
    diffString = "已經過了";
  }
  
  let _diffDays = diffTime / msPerDay,
    diffDays = Math.floor(_diffDays),
    
    _diffHours = 24 * (_diffDays - diffDays),
    diffHours = Math.floor(_diffHours),
    
    _diffMins = 60 * (_diffHours - diffHours),
    diffMins = Math.floor(_diffMins),
    
    _diffSec = 60 * (_diffMins - diffMins),
    diffSec = Math.floor(_diffSec);
  
  if (isShortString.valueOf()) {
    longString = "";
  }
  else {
    longString = "距離" + thisDate.toLocaleString() + diffString;
  }
  element.innerHTML = longString + diffDays + "天 " + addZero(diffHours) + ":" + addZero(diffMins) + ":" + addZero(diffSec);
  
  let that = this;
  let update = function () {
    that.init(selector);
  };
  setTimeout(update,1000);
};

const addZero = function (n) {
  return n < 10 ? "0"+n : n;
};

const diffDate = function () {
  diffDate.prototype.init = init;
  window.diffDate = diffDate;
};
