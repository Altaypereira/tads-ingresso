// http://127.0.0.1/ingresso/tickets/client/

async function updateProfileInformation(body) {
    const response = await fetch('http://127.0.0.1/ingresso/clients/', {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem('token')
        },
        body: JSON.stringify(body)
    });

    if(response.status == 201){
        return true;
    }
    
    return false;
}