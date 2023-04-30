async function efetuarReserva(id){
    const client = JSON.parse(atob(window.localStorage.token.split('.')[1])).data;
    const response = await fetch('http://127.0.0.1/ingresso/tickets/', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem('token')
        },
        body: JSON.stringify({
            "client_id": client.id,
            "event_id": id,
            "type": "R",
            'spec_name': client.nome,
            'spec_doc': '-'
        })
    })

    if(response.status != 201){
        iziToast.error({
            title: 'Oops!',
            message: 'Não foi possível efetuar a reserva!',
        });
    }else{
        iziToast.success({
            title: 'Sucesso!',
            message: 'Reserva efetuada com sucesso!',
        });
    }

    loadEvents();
    getTickets()
}