
async function createAdmin(){
    const nome = document.getElementById('admin-name').value;
    const email = document.getElementById('admin-email').value;
    const senha = document.getElementById('admin-password').value;
    

    const dataObj = {
        nome,
        email,
        senha,
        perfil: "A"
    }

    const response = await fetch('http://127.0.0.1/ingresso/clients', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(dataObj)
    });

    if( response.status == 201 ){
        iziToast.success({
            title: 'Sucesso',
            message: 'Evento criado com sucesso',
        });
        setTimeout(() => {
            window.location.href = './app.html';
        }, 1000);
    } else {
        iziToast.error({
            title: 'Erro',
            message: 'Erro ao criar evento',
        });
    }
}


document.getElementById('btn-admin').addEventListener('click', createAdmin);