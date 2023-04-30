// nome
// data
// horario
// inicio_venda
// termino_venda
// lugares
// banner
// valor
// logradouro
// numero
// bairro
// cidade
// uf

async function createEvent(){
    const nome = document.getElementById('event-name').value;
    const data = document.getElementById('event-date').value;
    const horario = document.getElementById('event-time').value;
    const inicio_venda = document.getElementById('event-time-sell-begins').value;
    const termino_venda = document.getElementById('event-time-sell-ends').value;
    const lugares = document.getElementById('event-places').value;
    const banner = document.getElementById('banner64').value;
    const valor = document.getElementById('event-price').value;
    const logradouro = document.getElementById('logradouro').value;
    const numero = document.getElementById('numero').value;
    const bairro = document.getElementById('bairro').value;
    const cidade = document.getElementById('cidade').value;
    const uf = document.getElementById('uf').value;

    const dataObj = {
        nome,
        data,
        horario,
        inicio_venda,
        termino_venda,
        lugares,
        banner,
        valor,
        logradouro,
        numero,
        bairro,
        cidade,
        uf
    }

    const response = await fetch('http://127.0.0.1/ingresso/events', {
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


document.getElementById('btn-event').addEventListener('click', createEvent);