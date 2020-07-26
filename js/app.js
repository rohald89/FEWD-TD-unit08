let employees = [];
let employeeNames = [];
const url = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=NL`;
let cardContainer = document.querySelector(".card-container");

let modalOverlay = document.querySelector(".modal__overlay");
let modal = document.querySelector(".modal");
let closeModalBtn = document.getElementById("modal__close");
let main = document.querySelector(".main");
const search = document.getElementById("search");

let activeModal;

fetch(url)
  .then((response) => response.json())
  .then((data) => data.results)
  .then(generateEmployee)
  .then(getEmployeeNames)
  .catch((err) => console.log(err));

// loop through the data from the api and create the card for each employee
function generateEmployee(data) {
  employees = data;
  let employeeHTML = "";

  employees.forEach((employee, index) => {
    let image = employee.picture.large;
    let name = employee.name;
    let email = employee.email;
    let city = employee.location.city;

    employeeHTML += `
                  <div class="employee" data-index="${index}">
                    <img src="${image}" alt="profile image of ${name.first}" class="employee__image"/>
                    <div class="employee__info">
                      <h2 class="employee__name">${name.first} ${name.last}</h2>
                      <p class="employee__email">${email}</p>
                      <p class="employee__city">${city}</p>
                    </div>
                  </div>
    `;
  });
  cardContainer.innerHTML = employeeHTML;
}

// Create modal
function createModal(index) {
  let {
    name,
    dob,
    phone,
    email,
    location: { city, street, state, postcode },
    picture,
  } = employees[index];

  let date = new Date(dob.date);

  const modalHTML = `
                <i class="fad fa-times" id="modal__close"></i>
                <div class="modal__image-container">
                  <i class="fad fa-angle-left fa-2x" id="left-arrow"></i>
                  <img class="modal__image" src="${picture.large}" />
                  <i class="fad fa-angle-right fa-2x" id="right-arrow"></i>
                </div>
                <div class="modal__info">
                  <h2 class="modal__name">${name.first} ${name.last}</h2>
                  <p class="modal__email">${email}</p>
                  <p class="modal__city">${city}</p>
                  <hr/>
                  <p class="modal__phone">${phone}</p>
                  <p class="modal__address">${street.number} ${
    street.name
  }, ${state} ${postcode}</p>
                  <p class="modal__bday">Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
                </div>
  `;

  modalOverlay.classList.add("active");
  main.classList.add("modal-active");
  modal.innerHTML = modalHTML;
  activeModal = parseInt(index);
}

// Open Modal when a card is selected
function openModal(e) {
  if (e.target !== cardContainer) {
    const employee = e.target.closest(".employee");
    const index = employee.getAttribute("data-index");
    createModal(index);
  }
}

// Close modal when X is clicked
function closeModal(e) {
  if (e.target.getAttribute("id") === "modal__close") {
    modalOverlay.classList.remove("active");
    main.classList.remove("modal-active");
  }
}

//create an array of Employee names with first and last names
function getEmployeeNames() {
  employees.forEach((employee) =>
    employeeNames.push(`${employee.name.first} ${employee.name.last}`)
  );
}

//filter employees from the array made above and see if they match the search value the visitor typed in
function filterEmployees() {
  const employeeCards = document.querySelectorAll(".employee");
  const searchValue = search.value.toLowerCase();
  employeeNames.forEach((employee, i) => {
    if (employee.toLowerCase().indexOf(searchValue) < 0) {
      employeeCards[i].style.display = "none";
    } else {
      employeeCards[i].style.display = "";
    }
  });
}

// scroll through employee cards in modal by checking the current open modal and increasing / decreasing the index
function changeModal(e) {
  if (e.target.getAttribute("id") === "left-arrow" && activeModal > 0) {
    createModal(activeModal - 1);
  } else if (
    e.target.getAttribute("id") === "right-arrow" &&
    activeModal < employees.length - 1
  ) {
    createModal(activeModal + 1);
  } else return;
}

// Eventlisteners
modalOverlay.addEventListener("click", (e) => changeModal(e));
search.addEventListener("keyup", (e) => filterEmployees(e));
cardContainer.addEventListener("click", (e) => openModal(e));
modalOverlay.firstElementChild.addEventListener("click", (e) => closeModal(e));
