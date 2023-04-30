class FillCircle extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.identifier = "circle" + Math.floor(Math.random() * 999999);
    }

    static get observedAttributes() { return ['fill']; }

    map_range(value, low1 = 0, high1 = 100, low2 = -90, high2 = 270) {
        return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
    }

    connectedCallback() {
        const icon = this.getAttribute('icon-slot');
        const fill = this.getAttribute('fill');

        this.shadowRoot.innerHTML = `
            <style>
            @import url('https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css');
            .circle{
                width:fit-content;
                height:fit-content;
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
              }
              
              .circle i{
                position:absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                font-size: 2.5rem;
                transition: all 1s ease-in;
              }
              
              
              .circle i {
              background: rgb(29,185,84);
              background: linear-gradient(180deg, rgba(29,185,84,0) 0%, rgba(0,0,0,0) 101%);
                  -webkit-background-clip: text;
                  -webkit-text-fill-color: transparent;
              }

              .circle i.ok {
                background: rgb(29,185,84);
                background: linear-gradient(180deg, rgba(29,185,84,1) 100%, rgba(0,0,0,1) 101%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }


            </style>

            <div class="circle">
                <i class='bx ${icon} ${fill == 100? "ok":""}'></i>
                <canvas id="${this.identifier}" width="120" height="120"></canvas>
            </div>
        `;
        
        const interval = setInterval(() => {
            let c = this.shadowRoot.getElementById(this.identifier)
            if(c != null){
                this.draw(0)
                clearInterval(interval)
            }
        }, 100);

    }


    attributeChangedCallback(_, older, newer) {
        if(parseInt(newer) > parseInt(older))
            this.draw(parseInt(older))
        else    
            this.drawBack(parseInt(older))

        if(newer == 100){
            setTimeout(() => {
                this.shadowRoot.querySelector('i').classList.add('ok')
            }, 600);
            
        }else{
            setTimeout(() => {
                this.shadowRoot.querySelector('i').classList.remove('ok')
            }, 600);
        }
    }


    draw(current = 0) {
        const color = this.getAttribute('color');
        let c = this.shadowRoot.getElementById(this.identifier);
        var ctx = c.getContext("2d");
        const fill = parseInt(this.getAttribute("fill"));

        if(current == fill){
            return
        }

        current += 1;
        if (current > fill){
            return this.draw(fill)
        }

        ctx.clearRect(0, 0, c.width, c.height);
        ctx.beginPath();
        ctx.lineWidth = 5;
        ctx.strokeStyle = color;
        ctx.arc(60, 60, 20, ((Math.PI * -90) / 180), ((Math.PI * this.map_range(current)) / 180), false);
        ctx.stroke();
        setTimeout(() => {
            this.draw(current)
        }, 10)
    }


    drawBack(current = 0) {
        const color = this.getAttribute('color');
        let c = this.shadowRoot.getElementById(this.identifier);
        var ctx = c.getContext("2d");
        const fill = parseInt(this.getAttribute("fill"));
        if(current == fill){
            return
        }

        current -= 1;
        if( current <= fill){
            return this.drawBack(fill)
        }

        ctx.clearRect(0, 0, c.width, c.height);
        ctx.beginPath();
        ctx.lineWidth = 5;
        ctx.strokeStyle = color;
        ctx.arc(60, 60, 20, ((Math.PI * -90) / 180), ((Math.PI * this.map_range(current)) / 180), false);
        ctx.stroke();
        setTimeout(() => {
            this.drawBack(current)
        }, 10)
    }

}

customElements.define('form-circle', FillCircle);