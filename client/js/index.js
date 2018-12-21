let category = "African"
const API_URL = `http://localhost:3000/api/v1/menu/${category}`;
const form = document.querySelector("form"); // submit search form

const input = document.querySelector("input");
const loadingImage = document.querySelector("#loadingImage");
//selects the links on the page
const menuClasses = document.querySelectorAll(".menu-class");

// display Section
const displaySection = document.querySelector(".menu");
const menu_list = document.getElementById("list");
loadingImage.style.display = "none"; //removes loading image when page is gone

form.addEventListener("submit", formsubmitted);

menuClasses.forEach(menuClass, linkClicked )

// display content on start
window.addEventListener(
  "DOMContentLoaded",
  function(event) {
    event.preventDefault();

    onStart();
    get()
      .then(displayContent)
      .then(() => {
        loadingImage.style.display = "none";
      });
  },
  false
);

function formsubmitted(event) {
  event.preventDefault();
  const newData = {
    title: input.value
  };

  onStart();
  search(newData.title)
    .then(res => {
      displayContent(res);
    })
    .then(() => {
      loadingImage.style.display = "none";
    });
}

function linkClicked(event) {
  event.preventDefault();
  const newData = menuClass.textContent;

  onStart();
  search(newData)
    .then(res => {
      displayContent(res);
    })
    .then(() => {
      loadingImage.style.display = "none";
    });
}

function onStart() {
  loadingImage.style.display = ""; //returns loading image
  displaySection.innerHTML = ""; // clears previous search result section
}

function get() {
  return fetch(API_URL)
    .then(response => response.json())
    .then(result => {
      return result;
    }); //fetch requets to api url with serachTerm
}

function search(data) {
  category = data;
  return fetch(API_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(result => {
      return result;
    });
}

function displayContent(contents) {
  contents.forEach(content => {
    var menu_line = `<img src="${content.image}" class="imagery"> 
    <h3>${content.name}</h3>
    <p class="description">${content.description}</p>
    <h1>${content.price}</h1>
    `;

    menu_list.innerHTML += menu_line;
  });
}
