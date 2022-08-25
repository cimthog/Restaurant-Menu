const API_URL = "http://localhost:3000/dashboard";
var submitBtn = document.getElementById("addDishBtn");
var foodName = document.getElementById("mName");
var desc = document.getElementById("mDesc");
var cat = document.getElementById("mCat");
var price = document.getElementById("mPrice");
var img = document.getElementById("mImg");

var selectedFile;
img.onchange = function() {
  selectedFile = img.files;
  console.log(selectedFile);
};

submitBtn.addEventListener("click", e => {
  e.preventDefault();
  console.log(selectedFile[0]);
  console.log("Clicked");

  const data = {
    name: foodName.value,
    description: desc.value,
    category: cat.value,
    price: price.value,
    img: selectedFile[0].uri
  };

  // console.log(data); check the stucture before you push to the api
  // console.log(JSON.stringify(data))

  fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(result => {
      console.log(result);
      // return result;
    })
    .catch(err => console.log(err));
});
