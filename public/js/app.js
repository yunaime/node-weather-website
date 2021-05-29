const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();

    messageOne.textContent = '';
    messageTwo.textContent = '';

    /// original address to fetch on localhost `http://localhost:3000/weather?address=${search.value}`
    /// new address to fetch from heroku fetch(`/weather?address=${search.value}`
    fetch(`/weather?address=${search.value}`).then((response) => {
    
        response.json().then((data) => {
            if(data.error) {
                console.log('Error: ', data.error);
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        });
    })    
})