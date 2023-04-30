const login_button = document.querySelector("#login")

login_button.addEventListener("click", async () => {
    const username = document.querySelector("#user").value
    const password = document.querySelector("#pwd").value

    const data = {
        email:username,
        senha:password
    }

    const response = await fetch("http://127.0.0.1/ingresso/clients/auth", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if( response.status === 401 ) {
        window.dispatchEvent(login_error);
    } else if( response.status === 400 ) {
        window.dispatchEvent(invalid_email);
    }else {
        try{
            const { token } = await response.json();
            if (token === undefined) {
                return    
            }

            const perfil = JSON.parse(atob(token.split('.')[1])).data.perfil;
            console.log(perfil)
            if(perfil != "A"){
                window.localStorage.setItem("token", token);
                window.location.href = "./app.html";
            } else {
                window.localStorage.setItem("token", token);
                window.location.href = "./admin/app.html";
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    
        
})
