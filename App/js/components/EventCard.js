class EventCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() { return ['timer']; }

    connectedCallback() {

        const id = this.getAttribute('event-id');
        const banner = this.getAttribute('banner');
        const remaining = this.getAttribute('remaining');
        const title = this.getAttribute('title');
        const address = this.getAttribute('address');
        const price = this.getAttribute('price');
        let status = false;
        try{
            status = JSON.parse(atob(this.getAttribute('status')));
        }catch(e){}
        
        let reserva = `<button class="booking" onclick="efetuarReserva(${id})">
                                <div class="text-float">
                                    <i class='bx bx-time'></i>
                                    <span>Reserve sua vaga</span>
                                </div>
                            </button>`;

        if(status){
            if(status.booking_expiration_time){
                const interval = setInterval(() => {
                    this.setAttribute('timer', parseInt(this.getAttribute('timer')) + 1);
                    if(!status.booking_expiration_time){
                        clearInterval(interval)
                    }
                },1000);
            }
            
            if(status.booking_expiration_time){
                reserva = `
                <button class="booking" disabled>
                    <div class="text-float">
                        <span>
                            <strong>...</strong> restantes
                        </span>
                    </div>
                </button>
                `;    
            }
        }

        if(status.type == 'B'){
            reserva = `
            <button class="booking" disabled>
                <div class="text-float">
                    <span>
                    Você já <strong>possui ingresso(s)</strong> para o evento
                    </span>
                </div>
            </button>
            `;    
        }

        this.shadowRoot.innerHTML = `
            <style>
            @import url('https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css');
            .event{
                width: 300px;
                height: 400px;
                background-color: #00000080;
                border-radius: 10px;
                box-shadow: 0 0 10px 5px rgba(0,0,0,0.2);
                display: flex;
                align-items: center;
                justify-content: flex-start;
                flex-direction: column;
                transition: all 0.3s ease-in-out;
                margin: 20px 20px;
                padding-bottom: 20px;
            }
            
            .event .banner{
                width: 300px;
                height: 200px;
                border-radius: 10px 10px 0 0;
                background-size: cover;
                background-position: center;
                position: relative;
            }
            
            .event .banner .remaining{
               width: calc(100% - 20px);
               height: 30px;
               padding: 5px 10px;
                background-color: #ffffffa3;
                color: rgb(113, 0, 0);
                font-size: 1.1rem;
                font-weight: 1000;
                position: absolute; 
                bottom: 0px;
                right: 0px;
                text-align: center;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .event .banner .remaining i{
                margin-right: 10px;
            }
            
            .event .title{
                width: calc(100% - 10px);
                height: 50px;
                padding: 0 5px;
                color: var(--cor-principal);
                margin: 5px 0;
                font-size: 20px
            }
            
            .event .description{
                width: calc(100% - 10px);
                height: 40px;
                padding: 0 5px;
                color: #fff;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                margin: 0;
            }
            
            .event .price {
                width: calc(100% - 10px);
                height: 40px;
                padding: 0 5px;
                color: var(--cor-principal);
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                margin: 0;
            }
            
            .event .buy{
                width: 90%;
                height: 50px;
                border: solid 1px var(--cor-principal);
                color: var(--cor-principal);
                background-color: transparent;
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.2rem;
                cursor: pointer;
                overflow: hidden;
                position: relative;
            }

            .event .booking{
                margin-top: 10px;
                width: 90%;
                height: 50px;
                border: 0;
                color: #fff;
                background-color: #BA9A14;
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1rem;
                cursor: pointer;
                overflow: hidden;
                position: relative;
            }

            .event .booking[disabled]{
                background-color: #a1a1a1;
                cursor: not-allowed;

            }
            .event .buy .text-float{
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s ease-in-out 0.1s;
                color: var(--cor-principal);
                z-index: 1;
            }
            
            .event .buy::before{
                content: '';
                width: 100%;
                height: 100%;
                position: absolute;
                left: -100%;
                top: 0;
                background-color: var(--cor-principal);
                transition: all 0.3s;
            }
            
            .event .buy:hover .text-float{
                color: #fff;
            }
            .event .buy:hover::before{
                left: 0;
                color: #fff;
            }
            
            
            .event .buy i{
                margin-right: 10px;
            }
            
            
            
            
            </style>

            <div class="event">
                        <div class="banner"
                            style='background-image: url(${banner})'>
                            <div class="remaining">
                                <i class="bx bxs-hot"></i>
                                Restam ${remaining} ingresso(s)
                            </div>
                        </div>
                        <h1 class="title">
                            ${title}
                        </h1>
                        <p class="description">
                            ${address}
                        </p>
                        <h4 class="price">
                            <span>${price}</span>
                        </h4>

                        <button class="buy" onclick="efetuarCompra(${id})">
                            <div class="text-float">
                                <i class='bx bxs-cart-add'></i>
                                <span>Comprar</span>
                            </div>
                        </button>
                        ${reserva}
                    </div>
        `;

    
    }


    attributeChangedCallback(_, older, newer) {
        try{
            const time = this.remaining_time();
            this.shadowRoot.querySelector('.booking > div > span > strong').innerHTML = time
        }catch(e){}
    }

    remaining_time(){
        try{
            const status = JSON.parse(atob(this.getAttribute('status')));
            const time = status.booking_expiration_time;
            const now = parseInt(new Date().getTime() / 1000);
            const remaining = time - now;
            if(remaining <= 0 && remaining >= -2){
                if(remaining == 0){
                    setTimeout(() => {
                        loadEvents();
                        getTickets();
                    }, 2000);
                }
                return 'Tempo esgotado. 0 segundos ';
            }

            const days = Math.floor(remaining / (60 * 60 * 24)) > 0 ? Math.floor(remaining / (60 * 60 * 24)) : false;
            let hours = Math.floor((remaining % (60 * 60 * 24)) / (60 * 60));
            hours = hours < 10 ? `0${hours}` : hours;
            let minutes = Math.floor((remaining % (60 * 60)) / (60));
            minutes = minutes < 10 ? `0${minutes}` : minutes;
            let seconds = Math.floor((remaining % (60)));
            seconds = seconds < 10 ? `0${seconds}` : seconds;

            if (days) {
                return `${days} dias, ${hours} horas, ${minutes} minutos e ${seconds} segundos`;
            }else{
                return `${hours}:${minutes}:${seconds}`;
            }
        }catch(e){
            return 'Erro ao calcular tempo';
        }
    }


}

customElements.define('event-card', EventCard);