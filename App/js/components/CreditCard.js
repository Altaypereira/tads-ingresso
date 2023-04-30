class CreditCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
    static get observedAttributes() { return ['number', 'holder', 'exp', 'flipped','cvv']; }
    connectedCallback() {

        const number = this.getAttribute('number');
        const name = this.getAttribute('holder');
        const cvv = this.getAttribute('cvv');
        const exp = this.getAttribute('exp');
        const flipped = this.getAttribute('flipped') == "true" ? true : false | null;
        this.shadowRoot.innerHTML = `
        <style>
            @font-face {
                font-family: 'kredit';
                src: url('./font/kredit.otf');
            }
            .flip-container {
                perspective: 1000;
                width: fit-content;
                height: fit-content;
                padding:0;
                margin:0;
            }
            .flip-container.flipped .flipper, .flip-container.hover .flipper {
                transform: rotateY(180deg);
            }
        
            .flip-container, .front, .back {
                width: 400px;
                aspect-ratio: 4/2.5;
            }
        
        .flipper {
            transition: 0.3s ease-in-out;
            transform-style: preserve-3d;
            position: relative;
        }
        
        .front, .back {
            backface-visibility: hidden;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
        }
        
        .front {
            z-index: 2;
            transform: rotateY(0deg);
        }
        
        .back {
            transform: rotateY(180deg);
        }
        
        
            .card
            {
                position: relative;
                width: clamp(200px, 80%, 400px);
                aspect-ratio: 4/2.5;
                background: rgb(2,17,1);
                background: -moz-linear-gradient(0deg, rgba(2,17,1,1) 55%, rgba(0,22,9,1) 100%);
                background: -webkit-linear-gradient(0deg, rgba(2,17,1,1) 55%, rgba(0,22,9,1) 100%);
                background: linear-gradient(0deg, rgba(2,17,1,1) 55%, rgba(0,22,9,1) 100%);
                filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#021101",endColorstr="#001609",GradientType=1);
                border-radius: 10px;
                box-shadow: 0 0 10px 3px rgba(0,0,0,0.3);
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                color: #fff;
                font-family: 'kredit';
            }
        
            .card > .flag
            {
                position: absolute;
                bottom: 10px;
                right: 10px;
            }

            .card > .exp
            {
                position: absolute;
                bottom: 10px;
                left: 10px;
            }
        
            .card > .number
            {
                font-weight: normal;
                font-size: .9rem;
                letter-spacing: 2px;
                margin: 0;
                margin-bottom: 10px;
                width: 100%;
                text-align: center;
            }
            .card > .titular
            {
                font-weight: normal;
                margin: 0;
                font-size: .8rem;
                letter-spacing: 2px;
                width: 100%;
                text-align: center;
                text-transform:uppercase;
            }
        
            .cvv{
                position: absolute;
                right: 30px;
                top: 50%;
                transform: translateY(-50%);
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                color: #fff;
            }
        
            .cvv > .number
            {
                font-size: 1.4rem;
            }
        </style>
        
        <div class="flip-container ${flipped ? "flipped": ""}">
            <div class="flipper">
                <div class="front">
                    <div class="card">
                        <h4 class="number">${number}</h4>
                        <h4 class="titular">${name}</h4>
                        <div class="flag">
                            <img src="./assets/cc/" alt='' width="40">
                        </div>
                        <div class="exp">
                            ${exp}
                        </div>
                    </div>
                </div>
                <div class="back">
                    <div class="card">
                        <div class="cvv">
                            <span class="number">${cvv}</span>
                            <span>CVV</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    }


    attributeChangedCallback(name, older, newer) {
        if(name == 'flipped'){
            if(this.getAttribute('flipped') == "true")
                this.shadowRoot.querySelector('.flip-container').classList.add('flipped')
            else
                this.shadowRoot.querySelector('.flip-container').classList.remove('flipped')
            
            return
        }
        setTimeout(() => {
            if(name == 'cvv'){
                this.shadowRoot.querySelector(".cvv > .number").innerHTML = newer
                return
            }
    
            if(name == 'holder'){
                this.shadowRoot.querySelector(".titular").innerHTML = newer
                return
            }
    
            if(name == 'exp'){
                this.shadowRoot.querySelector(".exp").innerHTML = newer
                return
            }
    
            if(name == "number"){
                let flag = getCreditCard(newer);
                if(flag){
                    this.shadowRoot.querySelector(".flag > img").setAttribute('src', './assets/cc/' + flag + '.png')
                }
            }
            
            this.shadowRoot.querySelector("." + name).innerHTML = newer
        }, 300)
    }


}

customElements.define('credit-card', CreditCard);