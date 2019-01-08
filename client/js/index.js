let category = "African";
let lastClicked = document.querySelector(".active");
const form = document.querySelector(".search-text"); // submit search form

const input = document.querySelector("input");
// const loadingImage = document.querySelector("#loadingImage");
//selects the links on the page
const menuClasses = document.querySelectorAll(".menu-class");

// display Section
const displaySection = document.querySelector(".menu");
const menu_list = document.querySelector(".menu-list");
// loadingImage.style.display = "none"; //removes loading image when page is gone

form.addEventListener("click", formsubmitted);

menuClasses.forEach(menuClass => menuClass.addEventListener("click", linkClicked))

// display content on start
/*window.addEventListener(
  "DOMContentLoaded",
  function(event) {
    event.preventDefault();

    onStart();
    get("African")
      .then(displayContent)
      .then(() => {
        // loadingImage.style.display = "none";
      });
  },
  false
);
*/

function formsubmitted(event) {
  event.preventDefault();
  console.log("clicked")
  const newData = {
    title: input.value
  };
  console.log(newData)

  onStart();
  search(newData.title)
    .then(res => {
      displayContent(res);
    })
    .then(() => {
      // loadingImage.style.display = "none";
    });
}

function linkClicked(event) {
  event.preventDefault();
  console.log("clicked");
  lastClicked.classList.remove("active");
  this.classList.add("active");
  const newData = this.textContent;
  lastClicked = this;

  onStart();
  console.log(newData)
  search(newData)
    .then(res => {
      displayContent(res.items);
    })
    .then(() => {
      // loadingImage.style.display = "none";
    });
}

function onStart() {
  // loadingImage.style.display = ""; //returns loading image
  // displaySection.innerHTML = ""; // clears previous search result section
}

function get(data) {
  const API_URL_GET = `http://localhost:3000/api/v1/menu/${data}`;  
  fetch(API_URL_GET)
    .then(response => response.json())
    .then(result => {
      console.log(result.items);
      // return result;
      displayContent(result.items);
    }); //fetch requets to api url with serachTerm
}

function search(data) {
  category = data;
  console.log(category, data);
  const API_URL_SEARCH = `http://localhost:3000/api/v1/menu/${category}`;
  return fetch(API_URL_SEARCH, {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
  })
    .then(response => response.json())
    .then(result => {
      return result;
    });
}


function displayContent(contents) {
  console.log(contents)
  const domain_name = "http://localhost:3000/";
  menu_list.innerHTML = '';
  menu_list.innerHTML = contents.map(content => {
      return `<div class="menu">
      <img src="${domain_name+content.img}" class="imagery"> 
      <h3>${content.name}</h3>
      <p class="description">${content.description}</p>
      <p class="title">${content.price}</h1></div>
      `;
    })
    .join(' ')
  
}

get("African")