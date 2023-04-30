async function getTickets(){
    const client = JSON.parse(atob(window.localStorage.token.split('.')[1])).data.id;
    const response = await fetch('http://127.0.0.1/ingresso/tickets/client/' + client, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem('token')
        }
    });

    const tickets = await response.json()
    let HTML = `<h1>Meus tickets</h1>`;
    if(tickets.length == 0){
        HTML += `<h2>Você ainda não possui tickets</h2>`;
    }
    for(ticket of tickets){
        console.table(ticket)
        if(ticket.type == 'Compra'){
            HTML += `
                <div class="ticket">
                    <div class="ticket-data">    
                        <h3 class='name'>${ticket.event_name}</h3>
                        <h4 class='local'>${ticket.event_local}</h4>
                        <h3 class='date'>${ticket.event_date} - ${ticket.event_time}</h3>
                        <h3 class='spec'>${ticket.spec_name} - ${ticket.spec_doc}</h3>
                        <h3 class='price'> ${ticket.event_price} </h3>
                        <button class="validator">
                            <a href='http://127.0.0.1/ingresso/tickets/${ticket.token}/validate' target='_blank'>
                                <i class='bx bx-qr'></i>
                                Validar
                            </a>
                        </button>
                        <button class="print-btn" onclick='PrintElem(this)'>Imprimir</button>
                    </div>    
                    <div class="ticket-qr" style="background-image: url('${ticket.qr_code}')">
                        <button class="download-btn" onclick='openQRCode(this)'>Visualizar QR Code</button>
                    </div>
                </div>
            `;
        }else{
            HTML += `
                <div class="ticket">
                    <div class="ticket-data">
                        <h3 class='destaque'> Reservado </h3>    
                        <p>
                        <strong>
                            Obs.: Você tem até <u>${ticket.booking_expiration_time}</u> para efetuar a compra do seu ticket.
                        </strong>
                        </p>
                        <h3 class='name'>${ticket.event_name}</h3>
                        <h4 class='local'>${ticket.event_local}</h4>
                        <h3 class='date'>${ticket.event_date} - ${ticket.event_time}</h3>
                        <h3 class='spec'>${ticket.spec_name}</h3>
                    </div>    
                </div>
            `;
        }
        
    }

    document.querySelector('#tickets').innerHTML = HTML;

}

getTickets();



function openQRCode(el){
    const img = el.parentElement.style.backgroundImage.slice(5, -2);
    let w = window.open(img, '_blank', 'width=500,height=500');
    let image = new Image();
    image.src = img;
    setTimeout(function(){
        w.document.write(image.outerHTML);
    }, 0);
}