// var addBtn = document.getElementById('addBtn')
// var addBtn = document.getElementById('addBtn')

// addBtn.addEventListener('click', function (e) {
//     e.preventDefault();
//     window.location.href = '/add.html'
// })


var categorySelectBox = document.getElementById('category');
var displayAreaForMenuItems = document.getElementsByClassName("menu-list")[0];
var API_URL = "http://localhost:3000/api/v1/menu/";

//Load African dishes first
getAvailableMenuItems("African");

function clearCurrentlyDisplayingMenuItems(){
    displayAreaForMenuItems.innerHTML = "";
}

function populateDOMWithMenuItems(menuItemsArray){

    clearCurrentlyDisplayingMenuItems();

   menuItemsArray.forEach((menuItem, i) => {
        var menuDiv = document.createElement("div");
        menuDiv.classList.add("menu");
        var menuItemImage = document.createElement('img');
        menuItemImage.classList.add("imagery");
        menuItemImage.src = `http://localhost:3000/${menuItem.img}`;
        var menuItemTitle = document.createElement("h3");
        menuItemTitle.innerHTML = menuItem.name;
        var menuItemDescription = document.createElement("p");
        menuItemDescription.innerHTML = menuItem.description;
        var menuItemPrice = document.createElement("p");
        menuItemPrice.innerHTML = menuItem.price;

        menuDiv.appendChild(menuItemImage);
        menuDiv.appendChild(menuItemTitle);
        menuDiv.appendChild(menuItemDescription);
        menuDiv.appendChild(menuItemPrice);

        displayAreaForMenuItems.appendChild(menuDiv);
   })
}

function getAvailableMenuItems(category){
    fetch(API_URL + category)
    .then((response) => response.json())
    .then((jsonResponse) => {
        populateDOMWithMenuItems(jsonResponse.items);
    })
    .catch((err) => {
        alert("Something went wrong. This issue is being resolved.")
        console.log("An error occured", err);
    })
}

categorySelectBox.onchange = function(){
    var selectedOption = this[this.selectedIndex];
    var selectedCategory = selectedOption.value;
    getAvailableMenuItems(selectedCategory);
}