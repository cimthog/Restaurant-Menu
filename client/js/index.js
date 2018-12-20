const API_URL = "";

const form = document.querySelector("form"); // submit search form

const input = document.querySelector("input");
const loadingImage = document.querySelector("#loadingImage");
const displaySection = document.querySelector(".menu");

loadingImage.style.display = "none"; //removes loading image when page is gone

form.addEventListener("submit", formsubmitted);

// display content on start
window.addEventListener(
  "DOMContentLoaded",
  function(event) {
    event.preventDefault();

    onStart();
    getImages()
      .then(displayImages)
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
  search(newData)
    .then(res => {
      displayImages(res);
    })
    .then(() => {
      loadingImage.style.display = "none";
    });
}

function onStart() {
  loadingImage.style.display = ""; //returns loading image
  displaySection.innerHTML = ""; // clears previous search result section
}

function getImages() {
  return fetch(API_URL)
    .then(response => response.json())
    .then(result => {
      return result;
    }); //fetch requets to api url with serachTerm
}

function search(data) {
  return fetch(API_URL, {
    method: "POST",
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

// display image function for unsplash
function displayImages(images) {
  images.forEach(image => {
      //console.log(key, images[key].urls.full);  // iterations for object returns
      const data = {
        imageElement = document.createElement("img"),
        header = document.createElement("h3"),
        description = document.createElement("p"),
        value = document.createElement("h1"),
      }
      data.imageElement.src = image.image // image property on JSON return
      data.header = image.title // title property on JSON return
      data.description = image.description // description propery on JSON return
      data.value = image.value // value property on JSON return
  
      displaySection.appendChild(data);
  })
}
