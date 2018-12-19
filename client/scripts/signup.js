console.log('JS here baby!')

const nameInput = document.getElementById('user-name');
const passwordInput = document.getElementById('user-password');
const submitBtn = document.getElementById('submit-btn');

const registerUser = (name, password) => {
    let data = {
        name,
        password,
    };

    fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then((json) => {
        console.log('Successfully registered');
        alert('Successfully registered');
        window.location.href = 'login.html';
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

    registerUser(name, password);
})