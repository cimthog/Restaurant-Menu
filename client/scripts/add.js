const API_URL = "http://localhost:3000/dashboard";
var submitBtn = document.getElementById("addDishBtn");
var foodName = document.getElementById("mName");
var desc = document.getElementById("mDesc");
var cat = document.getElementById("mCat");
var price = document.getElementById("mPrice");
var img = document.getElementById("mImg");
var fileContent;

var selectedFile;
img.onchange = function() {
  selectedFile = img.files;
  console.log(selectedFile);
};

/* document.getElementById("mImg").onchange = function(event) {
  var reader = new FileReader();
  reader.readAsDataURL(event.srcElement.files[0]);
  var me = this;
  reader.onload = function () {
    fileContent = reader.result;
  // console.log(fileContent);
}} */

console.log(img.value)

submitBtn.addEventListener("click", e => {
  e.preventDefault();
  console.log(selectedFile[0]);
  console.log("Clicked");

  var formData = new FormData();

  formData.append('name', foodName.value);
  formData.append('description', desc.value);
  formData.append('category', cat.value);
  formData.append('price', price.value);
  formData.append('img', selectedFile[0]);

  /* const data = {
    name: foodName.value,
    description: desc.value,
    category: cat.value,
    price: price.value,
    img: selectedFile[0],
  }; */

  // console.log(data); check the stucture before you push to the api
  // console.log(JSON.stringify(data))

  fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    mode: "no-cors",
    body: formData,
  })
  .then((response) => response.json)
  .then(result => {
    console.log(result);
    // return result;
  })
  .catch(err => console.log(err))
});
