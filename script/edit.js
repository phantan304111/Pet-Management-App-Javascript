"use strict";
//chinh navbar
const navBar = document.getElementById("sidebar");
navBar.addEventListener("click", function (e) {
  navBar.classList.toggle("active");
});
//thau tom cac nut su kien
const editForm = document.getElementById("container-form");
const editBtn = document.querySelector(".navbar-brand");
const tableBodyEl = document.querySelector(".table-striped");
const submitBtn = document.getElementById("submit-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
///bien toan cuc
let petArr = JSON.parse(getFromStorage("Arr"));
let breedArr = JSON.parse(getFromStorage("Breed"));
let healthyPetarr = JSON.parse(getFromStorage("arrHealthy"));
let boolHeathy = false;
if (petArr === null) petArr = [];
if (healthyPetarr === null) healthyPetarr = [];
if (breedArr === null) breedArr = [];

//Ve table
const renderTableData = function (petArr) {
  // Xoa bang cu, chen dong tieu de dau tien
  tableBodyEl.innerHTML = "";
  //dong tieu de dau tien
  const Title = document.createElement("thead");
  Title.innerHTML = `<tr><th scope="col">ID</th><th scope="col">Name</th><th scope="col">Age</th><th scope="col">Type</th><th scope="col">Weight</th><th scope="col">Length</th><th scope="col">Breed</th><th scope="col">Color</th><th scope="col">Vaccinated</th><th scope="col">Dewormed</th><th scope="col">Sterilized</th><th scope="col">BMI</th><th scope="col">Date Added</th><th scope="col">Action</th></tr>`;
  tableBodyEl.appendChild(Title);

  // Them cac phan tu array vao bang
  for (let i = 0; i < petArr.length; i++) {
    const row = document.createElement("thead");
    // Check BMI co duoc bang true
    const vaccined = petArr[i].vaccinated ? "bi-check-circle-fill" : "bi-x-circle-fill";
    const dewormed = petArr[i].dewormed ? "bi-check-circle-fill" : "bi-x-circle-fill";
    const sterilized = petArr[i].sterilized ? "bi-check-circle-fill" : "bi-x-circle-fill";
    row.innerHTML =
      `<tr><th scope="row">${petArr[i].id}</th> <td>${petArr[i].name}</td> <td>${petArr[i].age}</td><td>${petArr[i].type}</td> <td>${petArr[i].weight} kg</td> <td>${petArr[i].length} cm</td>    <td>${petArr[i].breed}</td>` +
      `<td><i class="bi bi-square-fill" style="color: ${petArr[i].color}"></i></td><td><i class="bi  ${vaccined}"></i></td>    <td><i class="bi  ${dewormed}"></i></td><td><i class="bi  ${sterilized}"</i></td>` +
      `<td>?</td><td>${petArr[i].date}}</td>    <td><button type="button" class=  "btn btn-warning" onclick="startEditPet('${petArr[i].id}')">Edit</button>    </td>	  </tr>`;
    // Hien bang
    tableBodyEl.appendChild(row);
  }
};
//Breed render
typeInput.onchange = function () {
  if (typeInput.value === "Select Type") console.log(11);
  else if (typeInput.value === "Dog") {
    breedInput.innerHTML = `<option>Select Breed</option>`;
    for (let i = 0; i < breedArr.length; i++)
      if (breedArr[i].type == "Dog") breedInput.innerHTML += `<option>${breedArr[i].name}</option>`;
  } else if (typeInput.value === "Cat") {
    breedInput.innerHTML = `<option>Select Breed</option>`;
    for (let i = 0; i < breedArr.length; i++)
      if (breedArr[i].type == "Cat") breedInput.innerHTML += `<option>${breedArr[i].name}</option>`;
  }
};
//hien bang
renderTableData(petArr);
//nhan nut edit su kien
editBtn.addEventListener("click", function () {
  //hien form chinh sua
  editForm.classList.toggle("hide");
});
//nhan nut edit tung dong
const startEditPet = function (id) {
  //hien form chinh sua
  editForm.classList.remove("hide");
  //lay thong tin pet chon dat vao form
  boolHeathy = false;
  let i = findID(id);
  console.log(i);
  idInput.value = petArr[i].id;
  nameInput.value = petArr[i].name;
  ageInput.value = petArr[i].age;
  typeInput.value = petArr[i].type;
  weightInput.value = petArr[i].weight;
  lengthInput.value = petArr[i].length;
  colorInput.value = petArr[i].color;

  vaccinatedInput.checked = petArr[i].vaccinated;
  dewormedInput.checked = petArr[i].dewormed;
  sterilizedInput.checked = petArr[i].sterilized;
  //kiem tra pet hien tai co khoe manh de khi doi, xoa trong array khoe   manh
  if (petArr[i].vaccinated == true && petArr[i].dewormed == true && petArr[i].sterilized == true)
    boolHeathy = true;
  //chinh breed khi type thay doi
  if (typeInput.value === "Select Type") console.log(11);
  else if (typeInput.value === "Dog") {
    breedInput.innerHTML = `<option>Select Breed</option>`;
    for (let i = 0; i < breedArr.length; i++)
      if (breedArr[i].type == "Dog") breedInput.innerHTML += `<option>${breedArr[i].name}</option>`;
  } else if (typeInput.value === "Cat") {
    breedInput.innerHTML = `<option>Select Breed</option>`;
    for (let i = 0; i < breedArr.length; i++)
      if (breedArr[i].type == "Cat") breedInput.innerHTML += `<option>${breedArr[i].name}</option>`;
  }
  breedInput.value = petArr[i].breed;
};
// xoa thong tin vua nhap
const clearInput = function () {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  colorInput.value = "#000000";
  typeInput.value = "Select type";
  breedInput.value = "Select Breed";
  weightInput.value = "";
  lengthInput.value = "";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
};

//submit
submitBtn.addEventListener("click", function (e) {
  // alert("Please select Type");
  // nhap thong tin submit
  // Khoi tao doi tuong can nhap

  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: weightInput.value,
    length: lengthInput.value,
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    date: new Date(),
    BMICal: function () {
      if (this.type === "cat") {
        this.BMI = (this.weight * 703) / this.length ** 2;
        return this.BMI;
      } else {
        this.BMI = (this.weight * 886) / this.length ** 2;
        return this.BMI;
      }
    },
  };
  //Check Validate
  if (
    idInput.value === "" ||
    nameInput.value === "" ||
    ageInput.value === "" ||
    weightInput.value === "" ||
    lengthInput.value === ""
  )
    alert("Please fill all infos!");
  else if (ageInput.value < 1 || ageInput.value > 15) alert("Age must be between 1 and 15!");
  else if (weightInput.value < 1 || weightInput.value > 15)
    alert("Weight must be between 1 and 15!");
  else if (lengthInput.value < 1 || lengthInput.value > 100)
    alert("ength must be between 1 and 100!");
  else if (typeInput.value === "Select Type") alert("Please select Type!");
  else if (breedInput.value === "Select Breed" || breedInput.value == "")
    alert("Please select Breed");
  // Co the nhap doi tuong
  else {
    let i = findID(idInput.value);
    //da tim duoc va chinh sua doi tuong can sua
    petArr[i] = data;
    saveToStorage("Arr", JSON.stringify(petArr));
    //neu pet healthy, them vao mang healthy
    if (petArr[i].vaccinated && petArr[i].dewormed && petArr[i].sterilized) {
      healthyPetarr.push(data);

      saveToStorage("arrHealthy", JSON.stringify(healthyPetarr));
    }
    //loai bo phan tu unhealthy sau chinh sua khoi mang healthy
    else if (boolHeathy) {
      for (let j = 0; j < healthyPetarr.length; j++)
        if (healthyPetarr[j].id == petArr[i].id) {
          healthyPetarr.splice(j, 1);
          saveToStorage("arrHealthy", JSON.stringify(healthyPetarr));
        }
    }
    // Hien bang voi phan tu da nhap
    clearInput();
    editForm.classList.add("hide");
    renderTableData(petArr);
  }
});
//tim vi tri phan tu chinh sua
const findID = function (id) {
  for (let i = 0; i < petArr.length; i++) {
    if (petArr[i].id == id) return i;
  }
};
