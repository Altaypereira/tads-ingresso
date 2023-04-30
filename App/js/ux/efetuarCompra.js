let progress1_filled = false;
async function efetuarCompra(id){
    const response = await fetch('http://127.0.0.1/ingresso/events/' + id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })

    const data = await response.json()
    window.sessionStorage.setItem('event', JSON.stringify(data))
    

    // Construindo modal
    const overlay = document.createElement('div')
    overlay.id = 'overlay'

    const modal = document.createElement('div')
    modal.id = 'modal'
    
    document.body.appendChild(overlay)
    overlay.appendChild(modal)


    const slider_div = document.createElement('div')
    slider_div.classList.add('slider')
    modal.appendChild(slider_div)



    // Header modal

    const header = document.createElement('div')
    header.id = 'header'
    
    const c1 = document.createElement('form-circle')
    c1.setAttribute('fill', '0')
    c1.setAttribute('color', '#1db954')
    c1.setAttribute('icon-slot', 'bxs-check-circle')
    c1.classList.add('circle1')
    c1.onclick = () => {
        document.querySelector('.progress').style.width = '0%'
        forms = document.querySelectorAll('.form');
        forms[0].classList.remove('hidden')
        forms[1].classList.add('hidden')
        document.querySelector("#modal > div.slider").style.left = '0%'

    }
    header.appendChild(c1)


    // Bar 
    const bar = document.createElement('div');
    bar.classList.add('progress-bar');
    const progress = document.createElement('div');
    progress.classList.add('progress')
    bar.appendChild(progress)
    header.appendChild(bar)


    const c2 = document.createElement('form-circle')
    c2.setAttribute('fill', '0')
    c2.setAttribute('color', '#1db954')
    c2.setAttribute('icon-slot', 'bxs-check-circle')
    c2.classList.add('circle2') 
    header.appendChild(c2)



    modal.appendChild(header)

    // 1st step
    const form0 = document.createElement('div');
    form0.classList.add('form')

    const inputs = document.createElement('div');
    form0.classList.add('inputs')
    form0.innerHTML = `
        <h3 style='text-align: center;padding: 10px 0'>${data[0].nome} - ${data[0].f_data} ${data[0].f_horario}</h3>
        <div class='buy-section'>
            <div class='input-control active'>
                <span onclick='checkField(this.parentElement.querySelector("input"),"f")'>Quantidade de Ingressos</span>
                <input value='1' onkeyup="createInputs(this)" id='qtd' type='number' min="1" step="1" onfocus='checkField(this,"f")' onblur='checkField(this,"b")'>
            </div>

            <h4>Dados dos Usuários</h4>
            <div class='user-lists'>
                <div class='section'>
                        <h5>Usuário 1</h5>
                        <div class='input-control'>
                            <span onclick='checkField(this.parentElement.querySelector("input"),"f")'> Nome do <u> Usuário 1 </u></span>
                            <input class='name-user' type='text' onfocus='checkField(this,"f")' onblur='checkField(this,"b")'>
                        </div>
                        <div class='input-control'>
                            <span onclick='checkField(this.parentElement.querySelector("input"),"f")'> CPF do <u> Usuário 1 </u></span>
                            <input class='doc-user cpf' type='tel' onfocus='checkField(this,"f")' onblur='checkField(this,"b")'>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    
    `;

    form0.appendChild(inputs)
    slider_div.appendChild(form0)
    
    const btn_next = document.createElement('button')
    btn_next.classList.add('btn-next')
    btn_next.classList.add('disabled')
    btn_next.innerHTML = `<i class='bx bxs-chevron-right'></i>` 

    btn_next.onclick = () => {
        if (btn_next.classList.contains('disabled')){
            btn_next.classList.add('shake')
            setTimeout(() => {
                btn_next.classList.remove('shake')
            }, 900);
        }else{
            document.querySelector('.progress').style.width = '100%'
            forms = document.querySelectorAll('.form');
            forms[0].classList.add('hidden')
            forms[1].classList.remove('hidden')
            document.querySelector("#modal > div.slider").style.left = '-100%'
            progress1_filled = true;
        }

    }

    form0.appendChild(btn_next)
    // 2nd step

    const form = document.createElement('div');
    form.classList.add('form')
    form.classList.add('hidden')

    const card = document.createElement('div');
    card.classList.add('card')

    const creditCard = document.createElement('credit-card');
    creditCard.classList.add('credit-card')
    creditCard.setAttribute('number', ' ')
    creditCard.setAttribute('holder', ' ')
    creditCard.setAttribute('cvv', ' ')

    card.appendChild(creditCard)
    form.appendChild(card)
    slider_div.appendChild(form)
    
    
    // Formulario de Dados do Cartão
    const data_form = document.createElement('div')
    data_form.classList.add('data-form')
    

    data_form.innerHTML = `
        <div class='input-control'>
            <span onclick='checkField(this.parentElement.querySelector("input"),"f")'>Número do Cartão</span>
            <input onkeyup="typer(this)" id='cc' type='tel' class='credit-card-number' onfocus='checkField(this,"f")' onblur='checkField(this,"b")'>
        </div>

        <div class='input-control'>
            <span onclick='checkField(this.parentElement.querySelector("input"),"f")'>Titular do Cartão</span>
            <input onkeyup="typer(this)" id='holder' class='upper' type='text' onfocus='checkField(this,"f")' onblur='checkField(this,"b")'>
        </div>

        <div class='input-control'>
            <span onclick='checkField(this.parentElement.querySelector("input"),"f")'>Validade</span>
            <input onkeyup="typer(this)" id='exp' class='expiration-time' type='text' onfocus='checkField(this,"f")' onblur='checkField(this,"b")'>
        </div>

        <div class='input-control'>
            <span onclick='checkField(this.parentElement.querySelector("input"),"f");turnAround(true)'>CVV</span>
            <input onkeyup="typer(this)" id='cvv' type='text' onfocus='checkField(this,"f");turnAround(true)' onblur='checkField(this,"b");turnAround(false)'>
        </div>

        <div class='input-control active'>
            <span onclick='checkField(this.parentElement.querySelector("input"),"f");turnAround(true)'>Número de Parcelas</span>
            <select id='parcelas'></select>
        </div>

        <button class='buy-btn disabled'> Finalizar Compra </button>
    `;
    form.appendChild(data_form)

    setTimeout(() => {
        overlay.classList.add('active')
        modal.classList.add('active')
    }, 100);

    const interval = setInterval(() => {
        try{
            // Mask CC
            var options =  {
                onKeyPress: function(number, e, field, options) {
                const bandeiras = {'amex':0,'visa':1,'diners':2, 'mastercard':1}
                  var masks = ['0000 000000 00000', '0000 0000 0000 0000', '0000 000000 0000'];
                  var mask = getCreditCard(number)
                  if(mask)
                    $('.credit-card-number').mask(masks[bandeiras[mask]], options);
              }};
            $('.credit-card-number').mask('0000 0000 0000 0000', options);
            $('.expiration-time').mask('00/00');
            $('.cpf').mask('000.000.000-00');
            getParcelas();
            document.querySelector('.buy-btn').addEventListener('click', () => {
                document.querySelector('.buy-btn').classList.add('shake')
                setTimeout(() => {
                    document.querySelector('.buy-btn').classList.remove('shake')
                }, 900)
            })

            clearInterval(interval)
        }catch(e){}
    }, 200);

}



// Close modal
document.addEventListener('click', (e) => {
    if(e.target.id == 'overlay'){
        overlay.classList.remove('active')
        modal.classList.remove('active')
        setTimeout(() => {
            overlay.remove()
            modal.remove()
        }, 500)
    }
})

// Close modal with ESC
window.addEventListener('keyup', (e) => {
    
    if(getProgress() == 100 && progress1_filled) getProgress2()
    
    if(e.which == 27){
        modal.classList.remove('active')
        setTimeout(() => {
            overlay.remove()
        }, 500)
    }
})


function checkField(el, type){
    if(type == 'f'){
        el.parentElement.classList.add('active')
        el.focus()
    }else{
        if(el.value.length > 0){
            el.parentElement.classList.add('active')
        }else{
            el.parentElement.classList.remove('active')
        }
    }
}


function getProgress(){
        const els = document.querySelectorAll('.buy-section input');
        const total = els.length
        const filled = Array.from(els).filter(e => {
            return e.value.length > 0
        }).length
        const percent = Math.trunc((filled / total) * 100)
        document.querySelector("#header > form-circle.circle1").setAttribute('fill', percent)
        

        if(percent == 100){
            document.querySelector('.btn-next').classList.remove('disabled');
        }else{
            document.querySelector('.btn-next').classList.add('disabled');
        }
        
        return percent;
    
}


function getProgress2(){
        const els = document.querySelectorAll('.data-form input');
        const total = els.length + 1
        const filled = Array.from(els).filter(e => {
            return e.value.length > 0
        }).length + 1
        const percent = Math.trunc((filled / total) * 100)
        document.querySelector("#header > form-circle.circle2").setAttribute('fill', percent)

        if(percent == 100){
            console.log("ALTEROU O BOTÃO")
            document.querySelector('.buy-btn').addEventListener('click', buy)
            document.querySelector('.buy-btn').classList.remove('disabled')
        }else{
            document.querySelector('.buy-btn').classList.add('disabled')
            document.querySelector('.buy-btn').addEventListener('click', () => {
                document.querySelector('.buy-btn').classList.add('shake')
                setTimeout(() => {
                    document.querySelector('.buy-btn').classList.remove('shake')
                }, 900)
            })
        }

        return percent;
}

function typer(el){
    switch(el.id){
        case "cc":
            document.querySelector('.credit-card').setAttribute('number', el.value);
        break;

        case "holder":
            document.querySelector('.credit-card').setAttribute('holder', el.value);
        break;

        case "cvv":
            document.querySelector('.credit-card').setAttribute('cvv', el.value);
        break;

        case "exp":
            document.querySelector('.credit-card').setAttribute('exp', el.value);
        break;
    }
}

function turnAround(back){
    if(back){
        document.querySelector('.credit-card').setAttribute('flipped', true);
    }else{
        document.querySelector('.credit-card').setAttribute('flipped', false);
    }
}

function getParcelas(){
    let parcelas = document.querySelector("#parcelas");

    const data = JSON.parse(sessionStorage.getItem('event'))
    const qtd = document.querySelector('#qtd').value;
    const reais = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });

    for (let i = 1; i <= 12; i++) {
        if(i > 3){
            let price = ((data[0].valor * qtd) * ((0.04 * i) + 1)) / i
            const op = new Option(i + "x de " + reais.format(price) + " COM JUROS", i)
            parcelas.add(op);
        }else{
            let price = (data[0].valor * qtd) / i
            const op = new Option(i + "x de " + reais.format(price) + " SEM JUROS", i)
            parcelas.add(op);
        }
    }
}


function createInputs(el)
{
    getParcelas();
    const qtd = el.value
    const created = document.querySelectorAll('.user-lists > .section > .input-control > .name-user').length
        
    if(qtd - created < 0){
        for(i=1; i <= Math.abs(qtd - created) ; i++){
            document.querySelectorAll('.user-lists > .section')[created - i].remove()
        }
        return
    }

    for (i = 0; i < qtd - created; i++){
        document.querySelector('.user-lists').innerHTML += `
        <div class='section'>
            <h5>Usuário ${created + 1}</h5>
            <div class='input-control'>
                <span onclick='checkField(this.parentElement.querySelector("input"),"f")'> Nome do <u> Usuário ${created + 1} </u></span>
                <input class='name-user' type='text' onfocus='checkField(this,"f")' onblur='checkField(this,"b")'>
            </div>
            <div class='input-control'>
                <span onclick='checkField(this.parentElement.querySelector("input"),"f")'> CPF do <u> Usuário ${created + 1} </u></span>
                <input class='doc-user cpf' type='tel' onfocus='checkField(this,"f")' onblur='checkField(this,"b")'>
            </div>
        </div>
        `
    }

    setTimeout(() => {
        $('.cpf').mask('000.000.000-00')
    }, 120)
}





async function buy() {
    if(getProgress2 < 100) return;

    console.log("COMPRANDO")
    const type = "B"
    const qtd = document.querySelector('#qtd').value
    const names = document.querySelectorAll('.name-user')
    const docs = document.querySelectorAll('.doc-user') 
    for(let i = 0; i < qtd; i++){
        const spec_name = names[i].value
        const spec_doc = docs[i].value
        const client_id = JSON.parse(atob(window.localStorage.token.split('.')[1])).data.id
        const event_id = parseInt(JSON.parse(window.sessionStorage.event)[0].id)
        const data = {
            spec_doc, spec_name, event_id, client_id, type
        }

        const response = await fetch('http://127.0.0.1/ingresso/tickets/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + window.localStorage.token
            },
            body: JSON.stringify(data),
        })

        if(response.status == 201){
            
            iziToast.success({
                title: 'Eba!',
                message: `Ingresso de ${spec_name} comprado com sucesso!`
            });


            setTimeout(() => {
                document.getElementById('overlay').click();
                loadEvents()
                getTickets()
            }, 1000)
        }else{
            iziToast.error({
                title: 'Ops!',
                message: `Ocorreu um erro ao comprar o ingresso de ${spec_name}}`,
            });
        }
    }
}