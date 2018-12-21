var submitBtn = document.getElementById('addDishBtn');
var foodName = document.getElementById('mName');
var desc = document.getElementById('mDesc');
var cat = document.getElementById('mCat');
var price = document.getElementById('mPrice');
var img = document.getElementById('mImg');

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
    console.log(foodName.value, desc.value, cat.value, price.value);
    formData.append("name", foodName.value);
    formData.append("description", desc.value);
    formData.append("category", cat.value);
    formData.append("price", price.value);
    formData.append('img', selectedFile[0].uri);

    fetch( 'http://localhost:3000/dashboard', {
        method: 'POST',
        body: formData
       })
       .then((res) => res.json())
       .then((json) => console.log(json))
       .catch(err => console.log(err));
})