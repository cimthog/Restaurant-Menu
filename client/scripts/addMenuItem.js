var submitBtn = document.getElementById('add-dish');
var foodName = document.getElementById('name');
var desc = document.getElementById('description');
var cat = document.getElementById('category');
var price = document.getElementById('price');
var img = document.getElementById('img');

var selectedFile
img.onchange = function(){
    selectedFile = img.files;
    console.log(selectedFile)
}


submitBtn.addEventListener('click', (e)=> {
    e.preventDefault();
    console.log(selectedFile[0])
    console.log('Clicked')
    var formData = new FormData();
    console.log(foodName.value, desc.value, cat.value, price.value1);
    formData.append("name", foodName.value);
    formData.append("description", desc.value);
    formData.append("category", cat.value);
    formData.append("price", price.value);
    formData.append('img', selectedFile[0]);

    for(let pair in formData.entries()){
        console.log(`${pair[0]} - ${pair[1]}`)
;    }

    fetch( 'http://localhost:3000/dashboard', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: formData
       })
       .then((res) => res.json())
       .then((json) => console.log(json))
       .catch(err => console.log(err))
})