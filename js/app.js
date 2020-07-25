let modalOverlay = document.querySelector(".modal__overlay");
let closeModal = document.querySelector(".modal__close");
let cardContainer = document.querySelector(".card-container");
let employees = document.getElementsByClassName("employee");

fetch("https://randomuser.me/api/?results=12")
  .then((response) => response.json())
  .then((data) => generateEmployee(data.results));

function generateEmployee(data) {
  console.log(data);
  const html = data
    .map(
      (item) => `<div class="employee">
                <img src="${item.picture.thumbnail}" alt="profile image of ${item.name.first}" class="employee__image"/>
                 <div id="modal__employee--info">
                   <h2 class="employee__name">${item.name.first} ${item.name.last}</h2>
                   <p class="employee__email">${item.email}</p>
                   <p class="employee__city">${item.location.city}</p>
                 </div>
              </div>`
    )
    .join("");
  cardContainer.innerHTML = html;
}

closeModal.addEventListener("click", () => {
  modalOverlay.classList.remove("active");
});

for (let i = 0; i < employees.length; i++) {
  let employee = employees[i];
  employee.addEventListener("click", () => {
    modalOverlay.classList.add("active");
  });
  //   let modalImage = document
  //     .getElementById("modal__employee")
  //     .firstElementChild.getAttribute("src");
  //   let modalInfo = document.getElementById("modal__employee--info");

  // modalImage = e.target.firstElementChild.getAttribute("src");
  // console.log(modalInfo);
  // console.log(e.target.lastElementChildk);
  // modalInfo.innerHTML = e.target.lastElementChild;
}
