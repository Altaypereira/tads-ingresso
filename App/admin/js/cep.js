
document.getElementById('cep').addEventListener('keyup', () => {
    let cep = document.getElementById('cep').value
    cep = cep.replaceAll('-', '').replaceAll('.', '');
    if(cep.length == 8){
        return getAdressByCep();
    } 

    document.getElementById('logradouro').value = '';
    document.getElementById('numero').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('uf').value = '';


});


async function getAdressByCep(){
    let cep = document.getElementById('cep').value;
    cep = cep.replaceAll('-', '').replaceAll('.', '');
    let url = `https://viacep.com.br/ws/${cep}/json/`;
    let response = await fetch(url);
    let data = await response.json();
    if(data.erro){
        iziToast.error({
            title: 'Erro',
            message: 'CEP não encontrado',
        });
        return
    }


    if(data.logradouro){
        document.getElementById('logradouro').value = data.logradouro;
        document.getElementById('bairro').value = data.bairro;
    }


    document.getElementById('cidade').value = data.localidade;
    
    let UF = document.getElementById('uf');

    for(let i = 0; i < UF.options.length; i++){
        if(UF.options[i].value == data.uf){
            UF.options[i].selected = true;
        }
    }


}