const el_name = document.getElementById('mName');
const el_description = document.getElementById('mDesc');
const el_price = document.getElementById('mPrice');
const el_category = document.getElementById('mCat');
const el_img = document.getElementById('mImg');
const addDishBtn = document.getElementById('addDishBtn');

const addMenu = (name, description, price, category, img) => {
    let data = {
        name,
        description,
        price,
        category,
        img
    };

    fetch('http://localhost:3000/dashboard', {
        method: 'POST',
        body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then((json) => {
        console.log(json);
    })
    .catch(err => console.log(err));
};

addDishBtn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('clicked')
    let name = el_name.value;
    let description = el_description.value;
    let price = el_price.value;
    let category = el_category.value;
    let img = el_img.value;

    if (name === '' || description === '' || price === '' || category === '' || img === '') {
        alert('Please fill all fields');
        return;
    }

    addMenu(name,description,price,category,img)
})