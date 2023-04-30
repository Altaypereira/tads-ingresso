document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(atob(window.localStorage.token.split('.')[1]))
    client_id = user.data.id
    const editBtns = document.querySelectorAll('.edit-btn')
    editBtns.forEach(btn => {
        if(btn.parentElement.querySelector('input').getAttribute('type') == 'email'){
            btn.parentElement.querySelector('input').value = user.data.email
        }else{
            btn.parentElement.querySelector('input').value = ''
        }
        btn.addEventListener('click', () => {
            allowEdit(btn)
        })
    })
})


function allowEdit(el) {
    const input = el.parentElement.querySelector('input')
    input.removeAttribute('readonly')
    input.focus()
    el.innerHTML = 'Salvar'

    el.addEventListener('click', () => {
        save(el)
    })
}

function save(el) {
    const dict = {
        'email': 'email',
        'password': 'senha',
    }
    const input = el.parentElement.querySelector('input')
    input.setAttribute('readonly', true)
    const newData = input.value
    const keyData = input.getAttribute('type')
    let data = {}
    data[dict[keyData]] = newData


    updateProfileInformation(data).then((response) => {
        if (response) {
            iziToast.success({
                title: 'Informação Atualizada!',
                message: 'Por segurança você será deslogado, faça login novamente com as novas credenciais!',
            });

            setTimeout(() => {
                window.localStorage.clear()
                window.location.href = './index.html'
            }, 3000);
        } else {
            iziToast.error({
                title: 'Oops!',
                message: 'Não foi possível atualizar a informação!',
            });
        }
    })

}


