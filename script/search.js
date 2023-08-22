"use strict";
//chinh navbar
const navBar = document.getElementById("sidebar");
navBar.addEventListener("click", function (e) {
  navBar.classList.toggle("active");
});
//thau tom cac form thong tin
const submitBtn = document.getElementById("find-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");

const breedInput = document.getElementById("input-breed");
const typeInput = document.getElementById("input-type");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");

////Bat cac phan tu thong tin html
const tableBodyEl = document.querySelector(".table-striped");
///bien toan cuc
let petArr = JSON.parse(getFromStorage("Arr"));
let healthyPetarr = JSON.parse(getFromStorage("arrHealthy"));
let breedArr = JSON.parse(getFromStorage("Breed"));

if (breedArr === null) breedArr = [];
if (petArr === null) petArr = [];
if (healthyPetarr === null) healthyPetarr = [];
let petSearch = [];
let data = {
  id: "",
  name: "",
  type: "Select Type",
  breed: "Select Breed",
  vaccinated: false,
  dewormed: false,
  sterilized: false,
};
//Ham ve table search
const renderTableData = function (petArr) {
  // Xoa bang cu, chen dong tieu de dau tien
  tableBodyEl.innerHTML = "";
  //thanh tieu de dau tien
  const Title = document.createElement("thead");
  Title.innerHTML = `<tr><th scope="col">ID</th><th scope="col">Name</th><th scope="col">Age</th><th scope="col">Type</th><th scope="col">Weight</th><th scope="col">Length</th><th scope="col">Breed</th><th scope="col">Color</th><th scope="col">Vaccinated</th><th scope="col">Dewormed</th><th scope="col">Sterilized</th><th scope="col">BMI</th><th scope="col">Date Added</th></tr>`;
  tableBodyEl.appendChild(Title);
  // Them cac phan tu array vao bang
  for (let i = 0; i < petArr.length; i++) {
    const row = document.createElement("thead");
    const vaccined = petArr[i].vaccinated ? "bi-check-circle-fill" : "bi-x-circle-fill";
    const dewormed = petArr[i].dewormed ? "bi-check-circle-fill" : "bi-x-circle-fill";
    const sterilized = petArr[i].sterilized ? "bi-check-circle-fill" : "bi-x-circle-fill";

    row.innerHTML =
      `<tr><th scope="row">${petArr[i].id}</th> <td>${petArr[i].name}</td> <td>${petArr[i].age}</td><td>${petArr[i].type}</td> <td>${petArr[i].weight} kg</td> <td>${petArr[i].length} cm</td>    <td>${petArr[i].breed}</td>` +
      `<td><i class="bi bi-square-fill" style="color: ${petArr[i].color}"></i></td><td><i class="bi  ${vaccined}"></i></td>    <td><i class="bi  ${dewormed}"></i></td><td><i class="bi  ${sterilized}"</i></td>` +
      `<td>?</td><td>${petArr[i].date}}</td>      </tr>`;
    // Hien bang
    tableBodyEl.appendChild(row);
  }
};
//tim lan dau
//renderTableData(petArr);
//thay doi breed khi type thay doi
typeInput.onchange = function () {
  if (typeInput.value === "Select Type") {
    breedInput.innerHTML = `<option>Select Breed</option>`;
    for (let i = 0; i < breedArr.length; i++)
      breedInput.innerHTML += `<option>${breedArr[i].name}</option>`;
  } else if (typeInput.value === "Dog") {
    breedInput.innerHTML = `<option>Select Breed</option>`;
    for (let i = 0; i < breedArr.length; i++)
      if (breedArr[i].type == "Dog") breedInput.innerHTML += `<option>${breedArr[i].name}</option>`;
  } else if (typeInput.value === "Cat") {
    breedInput.innerHTML = `<option>Select Breed</option>`;
    for (let i = 0; i < breedArr.length; i++)
      if (breedArr[i].type == "Cat") breedInput.innerHTML += `<option>${breedArr[i].name}</option>`;
  }
};
//Bam nut bat dau Search
submitBtn.addEventListener("click", function (e) {
  petSearch = [];
  data.id = idInput.value;
  data.name = nameInput.value;
  data.type = typeInput.value;
  data.breed = breedInput.value;
  data.vaccinated = vaccinatedInput.checked;
  data.dewormed = dewormedInput.checked;
  data.sterilized = sterilizedInput.checked;
  for (let i = 0; i < petArr.length; i++) {
    if (
      (petArr[i].id.search(data.id) != -1 || data.id === "") &&
      (petArr[i].name.search(data.name) != -1 || data.name === "") &&
      (petArr[i].type == data.type || data.type === "Select Type") &&
      (petArr[i].breed == data.breed || data.breed === "Select Breed")
      //&& petArr[i].vaccinated == data.vaccinated &&
      // petArr[i].dewormed == data.dewormed &&
      // petArr[i].sterilized == data.sterilized
    ) {
      // Them pet dat chuan vao array search
      petSearch.push(petArr[i]);
      //neu box duoc check, loai pet khong dat dieu kien khoi array
      if (data.vaccinated)
        for (let i = petSearch.length - 1; i >= 0; i--) {
          if (petSearch[i].vaccinated === false) console.log(petSearch.splice(i, 1));
        }
      if (data.dewormed)
        for (let i = petSearch.length - 1; i >= 0; i--) {
          if (petSearch[i].dewormed === false) console.log(petSearch.splice(i, 1));
        }
      if (data.sterilized)
        for (let i = petSearch.length - 1; i >= 0; i--) {
          if (petSearch[i].sterilized === false) console.log(petSearch.splice(i, 1));
        }
    }
  }
  //hien thi bang search
  renderTableData(petSearch);
});
// tim id
const findID = function (id) {
  for (let i = 0; i < petArr.length; i++) {
    if (petArr[i].id == id) return i;
  }
};
