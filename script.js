"use strict";
// Gan nut su kien
const tableBodyEl = document.querySelector(".table-striped");
let deleteBtn = document.querySelectorAll(".btn-danger");
const healthyBtn = document.getElementById("healthy-btn");
const BMIBtn = document.getElementById("BMI-btn");
// Gan thong tin submit
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

// Khoi tao bien toan cuc
const petArr = [];
const healthyPetarr = [];
let healthyCheck = false;
let BMIcheck = false;

// Hien thi bang theo Array pets
const renderTableData = function (petArr) {
  // Xoa bang cu, chen dong tieu de dau tien
  tableBodyEl.innerHTML = "";

  const Title = document.createElement("thead");
  Title.innerHTML = `<tr><th scope="col">ID</th><th scope="col">Name</th><th scope="col">Age</th><th scope="col">Type</th><th scope="col">Weight</th><th scope="col">Length</th><th scope="col">Breed</th><th scope="col">Color</th><th scope="col">Vaccinated</th><th scope="col">Dewormed</th><th scope="col">Sterilized</th><th scope="col">BMI</th><th scope="col">Date Added</th><th scope="col">Action</th></tr>`;
  tableBodyEl.appendChild(Title);

  // Them cac phan tu array vao bang
  for (let i = 0; i < petArr.length; i++) {
    const row = document.createElement("thead");
    const vaccined = petArr[i].vaccinated ? "bi-check-circle-fill" : "bi-x-circle-fill";
    const dewormed = petArr[i].dewormed ? "bi-check-circle-fill" : "bi-x-circle-fill";
    const sterilized = petArr[i].sterilized ? "bi-check-circle-fill" : "bi-x-circle-fill";
    // Check BMI co duoc bang true
    if (BMIcheck) {
      row.innerHTML =
        `<tr><th scope="row">${petArr[i].id}</th> <td>${petArr[i].name}</td> <td>${petArr[i].age}</td><td>${petArr[i].type}</td> <td>${petArr[i].weight} kg</td> <td>${petArr[i].length} cm</td>    <td>${petArr[i].breed}</td>` +
        `<td><i class="bi bi-square-fill" style="color: ${petArr[i].color}"></i></td><td><i class="bi  ${vaccined}"></i></td>    <td><i class="bi  ${dewormed}"></i></td><td><i class="bi  ${sterilized}"</i></td>` +
        `<td>${petArr[i].BMI}</td><td>${petArr[i].date}}</td>    <td><button type="button" class=  "btn btn-danger" onclick="deletepet('${petArr[i].id}')">Delete</button>    </td>	  </tr>`;
    } //BMI = false
    else {
      row.innerHTML =
        `<tr><th scope="row">${petArr[i].id}</th> <td>${petArr[i].name}</td> <td>${petArr[i].age}</td><td>${petArr[i].type}</td> <td>${petArr[i].weight} kg</td> <td>${petArr[i].length} cm</td>    <td>${petArr[i].breed}</td>` +
        `<td><i class="bi bi-square-fill" style="color: ${petArr[i].color}"></i></td><td><i class="bi  ${vaccined}"></i></td>    <td><i class="bi  ${dewormed}"></i></td><td><i class="bi  ${sterilized}"</i></td>` +
        `<td>?</td><td>${petArr[i].date}}</td>    <td><button type="button" class=  "btn btn-danger" onclick="deletepet('${petArr[i].id}')">Delete</button>    </td>	  </tr>`;
    }
    // Hien bang
    tableBodyEl.appendChild(row);
  }
};

// Xoa du lieu vua nhap
const clearInput = function () {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  colorInput.value = "#000000";
  typeInput.value = "Select type";
  breedInput.value = "Select Breed";
  weightInput.value = "";
  lengthInput.value = "";
  (vaccinatedInput.checked = false), (dewormedInput.checked = false), (sterilizedInput.checked = false);
};

// click submit
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
  // Check Validate
  if (idInput.value === "" || nameInput.value === "" || ageInput.value === "" || weightInput.value === "" || lengthInput.value === "") alert("Please fill all infos!");
  else if (!checkId(idInput.value)) alert("ID must unique!");
  else if (ageInput.value < 1 || ageInput.value > 15) alert("Age must be between 1 and 15!");
  else if (weightInput.value < 1 || weightInput.value > 15) alert("Weight must be between 1 and 15!");
  else if (lengthInput.value < 1 || lengthInput.value > 100) alert("ength must be between 1 and 100!");
  else if (typeInput.value === "Select Type") alert("Please select Type!");
  else if (breedInput.value === "Select Breed") alert("Please select Breed");
  // Co the nhap doi tuong
  else {
    // push pet to petArr
    // Khoi tao BMI trong object petArr
    petArr.push(data);
    petArr[petArr.length - 1].BMICal();
    if (petArr[petArr.length - 1].vaccinated && petArr[petArr.length - 1].dewormed && petArr[petArr.length - 1].sterilized) {
      healthyPetarr.push(data);
      healthyPetarr[healthyPetarr.length - 1].BMICal();
    }
    // Hien bang voi phan tu da nhap
    clearInput();
    healthyCheck ? renderTableData(healthyPetarr) : renderTableData(petArr);
  }
});

// su kien cac nut delete
const deletepet = (petId) => {
  // Confirm before deletePet
  if (confirm("Are you sure?")) {
    for (let i = 0; i < petArr.length; i++) {
      if (petArr[i].id === petId) petArr.splice(i, 1);
    }
    for (let i = 0; i < healthyPetarr.length; i++) {
      if (healthyPetarr[i].id === petId) healthyPetarr.splice(i, 1);
    }
  }
  healthyCheck ? renderTableData(healthyPetarr) : renderTableData(petArr);
};

//Tat mo bang healthy pets
healthyBtn.addEventListener("click", function () {
  if (healthyCheck) {
    healthyCheck = false;
    healthyBtn.textContent = "Show Healthy Pet";
  } else {
    healthyCheck = true;
    healthyBtn.textContent = "Show ALL Pet";
  }

  healthyCheck ? renderTableData(healthyPetarr) : renderTableData(petArr);
});
const checkId = function (id) {
  for (let i = 0; i < petArr.length; i++) {
    if (petArr[i].id === id) return false;
  }
  return true;
};

// Tat mo che do BMI
BMIBtn.addEventListener("click", function () {
  if (BMIcheck) {
    BMIcheck = false;
  } else {
    BMIcheck = true;
  }

  healthyCheck ? renderTableData(healthyPetarr) : renderTableData(petArr);
});
// deleteBtn.addEventListener("click", function (e) {
//   console.log(1);
// });
