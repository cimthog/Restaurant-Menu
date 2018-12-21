const nameInput = document.getElementById('user-name');
const passwordInput = document.getElementById('user-password');
const submitBtn = document.getElementById('submit-btn');

console.log('JS here baby!')

const signInUser = (name, password) => {
    let data = {
        name,
        password,
    };

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then((json) => {
         if (!json.token) {
            console.log('An error occured', json.message);
            return;
        }
        localStorage.setItem('token', json.token);
        console.log(json.token);
        window.location.href = 'admin.html';
    })
    .catch(err => console.log('An error occured', err.message));
};

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let name = nameInput.value;
    let password = passwordInput.value;

    if (name === '' || password === '') {
        alert('Please fill all fields');
        return;
    }

    console.log(name, password)

    signInUser(name, password);
})