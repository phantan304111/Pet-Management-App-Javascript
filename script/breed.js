"use strict";
//chinh navbar
const navBar = document.getElementById("sidebar");
navBar.addEventListener("click", function (e) {
  navBar.classList.toggle("active");
});
////Bat cac phan tu thong tin html
const submitBtn = document.getElementById("submit-btn");
const ipBreed = document.getElementById("input-breed");
const ipType = document.getElementById("input-type");
const tableBodyEl = document.querySelector(".table-striped");

///bien toan cuc
let breedArr = JSON.parse(getFromStorage("Breed"));

if (breedArr === null) breedArr = [];

//////////////////
// Cac ham
// Hien thi bang theo Array
const renderBreedTable = function (petArr) {
  // Xoa bang cu, chen dong tieu de dau tien
  tableBodyEl.innerHTML = "";
  //thanh tieu de
  const Title = document.createElement("thead");
  Title.innerHTML =
    `<tr><th scope="col">#</th>` +
    `<th scope="col">Breed</th>` +
    `<th scope="col">Type</th>` +
    `<th scope="col">Action</th>` +
    `</tr>`;
  tableBodyEl.appendChild(Title);

  // Them cac phan tu array vao bang
  for (let i = 0; i < breedArr.length; i++) {
    const row = document.createElement("thead");

    row.innerHTML =
      `<tr><th scope="row">${breedArr[i].id}</th> <td>${breedArr[i].name}</td> <td>${breedArr[i].type}</td>` +
      `<td><button type="button" class=  "btn btn-danger" onclick="deletebreed('${breedArr[i].id}')">Delete</button></td></tr>`;

    tableBodyEl.appendChild(row);
  }
};

// Xoa du lieu vua nhap
const clearInput = function () {
  ipBreed.value = "";
  ipType.value = "Select Type";
};

if (breedArr !== null) renderBreedTable(breedArr);

// click submit

submitBtn.addEventListener("click", function (e) {
  // alert("Please select Type");
  // nhap thong tin submit
  // Khoi tao doi tuong can nhap
  if (ipType.value === "Select Type") alert("Please select Type!");
  else if (ipBreed.value === "") alert("Please fill breed name");
  else if (checkBreed(ipBreed.value)) alert("Da co breed nay");
  else {
    //nhap breed moi vao bang
    const data = {
      id: newID(),
      name: ipBreed.value,
      type: ipType.value,
    };
    breedArr.push(data);
    saveToStorage("Breed", JSON.stringify(breedArr));
  }

  // Hien bang voi phan tu da nhap
  clearInput();
  renderBreedTable(breedArr);
});

////////
//CAC NUT KHAC

// su kien cac nut delete
const deletebreed = (petId) => {
  // Confirm before deleteBreed
  if (confirm("Are you sure?")) {
    console.log(petId);
    for (let i = 0; i < breedArr.length; i++) {
      if (breedArr[i].id == petId) breedArr.splice(i, 1);
      saveToStorage("Breed", JSON.stringify(breedArr));
    }
  }
  //hien breed sau khi delete
  renderBreedTable(breedArr);
};
//dat id moi cho breed
const newID = function () {
  let flag = true;
  for (let i = 1; i < 255; i++) {
    flag = true;
    for (let j = 0; j < breedArr.length; j++) {
      if (breedArr[j].id === i) flag = false;
    }
    if (flag == true) return i;
  }
  return 255;
};
//kiem tra breed co trung
const checkBreed = function (breed) {
  for (let i = 0; i < breedArr.length; i++) {
    if (breedArr[i].name === i) return true;
    console.log(breedArr[i].id);
  }
  return false;
};
