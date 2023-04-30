const eventos = document.querySelector('#events');
async function loadEvents () {
    const response = await fetch('http://127.0.0.1/ingresso/events/', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })

    if(response.status != 200){
        location.href = './index.html';
    }

    const data = await response.json()
    let i = 0;
    eventos.innerHTML = '';
    const interval = setInterval(() => {
        const event = data[i]
        const event_card = document.createElement('event-card')
        event_card.setAttribute('banner', event.banner)
        event_card.setAttribute('event-id', event.id)
        event_card.setAttribute('title', event.nome)
        event_card.setAttribute('date', `${event.f_data} - ${event.f_horario}`)
        event_card.setAttribute('price', event.f_valor)
        event_card.setAttribute('address', `${event.logradouro}, ${event.numero} - ${event.bairro}, ${event.cidade} - ${event.uf}`)
        event_card.setAttribute('remaining', event.lugares_disponiveis)
        event_card.setAttribute('status', event.status)
        event_card.setAttribute('timer', parseInt(((new Date()).getTime() / 1000)))
        eventos.appendChild(event_card)

        if (i < data.length - 1) {
            i++
        } else {
            clearInterval(interval)
        }
    }, 300)
}


loadEvents()