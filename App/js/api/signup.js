const login_button = document.querySelector("#login")

login_button.addEventListener("click", async () => {
    const name = document.querySelector("#name").value
    const username = document.querySelector("#user").value
    const password = document.querySelector("#pwd").value

    const data = {
        nome: name,
        email:username,
        senha:password
    }

    const response = await fetch("http://127.0.0.1/ingresso/clients", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if( response.status === 400 ) {
        const { error } = await response.json()
        window.messageError = error
        window.dispatchEvent(signup_error)
    }else {
        if( response.status === 201 ) {
            window.dispatchEvent(signup_success)
        }
    }
    
    
        
})
