const form = document.querySelector('#form');

form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = {};

    for( let el of form.elements ) {
        if(el.name.length > 0 )
        formData[el.name] = el.value;
    }

    fetch('http://localhost:8080/api/auth/login/', {
        method: 'POST',
        body: JSON.stringify( formData ),
        headers: { 'Content-Type': 'application/json' }
    })
    .then( resp => resp.json())
    .then( ({ token })  => {
       

        localStorage.setItem('token', token);
    })
    .catch( err => {
        console.log(err)
    })
});


function handleCredentialResponse(response) {

    // Google Token : ID:TOKEN
    
    const body = { id_token: response.credential }

    fetch('http://localhost:8080/api/auth/google', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(body)
    })
        .then( resp => resp.json())
        .then( ({ token }) => {
          localStorage.setItem('token', token);
        })
        .catch( console.warn)
       
}

const button = document.getElementById('google_signout');
button.onclick = () => {
    console.log( google.accounts.id);
    google.accounts.id.disableAutoSelect()

    google.accounts.id.revoke( localStorage.getItem('email'), done => {
        localStorage.clear();
        location.reload();
    });
}