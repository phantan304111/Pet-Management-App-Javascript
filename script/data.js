"use strict";
//bat cac nut thong tin
const importBtn = document.getElementById("import-btn");
const inputBtn = document.getElementById("input-file");
const exportBtn = document.getElementById("export-btn");
//tao bien toan cuc
let petArr = JSON.parse(getFromStorage("Arr"));

let healthyCheck = false;
let BMIcheck = false;
let str = "";
let loadArr = "";
// neu array khong co trong storage thi dat thanh rong
if (petArr === null) petArr = [];

const petData = JSON.stringify(petArr);
//export data
const saveStaticDataToFile = function () {
  // var blob = new Blob([petData], {type: "text/plain;charset=utf-8"});
  // saveAs(blob, "petSave.json");
  save2([petData], "petSave.json", {type: "text/plain;charset=utf-8"});
};
const save2 = function (content, fileName, contentType) {
  var a = document.createElement("a");
  var file = new Blob([content], {type: contentType});
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
};
//import data
const loadStaticDataToFile = function () {
  readText(inputBtn.value);
  // loadArr = JSON.parse(str);
  // console.log(loadArr);
  // petArr = loadArr;
};
//bat su kien cac nut
exportBtn.addEventListener("click", saveStaticDataToFile);
importBtn.addEventListener("click", loadStaticDataToFile);
//doc file tu muc input
var reader;

function readText(filePath) {
  var output = "";
  if (filePath.files && filePath.files[0]) {
    reader.onload = function (e) {
      output = e.target.result;
      displayContents(output);
    };
    reader.readAsText(filePath.files[0]);
  } else {
    return false;
  }
  return true;
}
function displayContents(txt) {
  //  el = document.getElementById("main");
  str += txt; //display output in DOM
  console.log(str);
}
