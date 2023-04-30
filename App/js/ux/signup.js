const signup_error = new Event('signup_error');
const signup_success = new Event('signup_success');


document.querySelectorAll('input').forEach(
    input => {
        const placeholder = input.getAttribute('placeholder');
        input.setAttribute('placeholder', '');
        input.addEventListener('focus', () => {
            const writer = setInterval(() => {
                if (input.getAttribute('placeholder').length < placeholder.length) {
                    input.setAttribute('placeholder', input.getAttribute('placeholder') + placeholder.charAt(input.getAttribute('placeholder').length));
                } else {
                    clearInterval(writer);
                }
            }, 10);
        });
        input.addEventListener('blur', () => {
            const eraser = setInterval(() => {
                if (input.getAttribute('placeholder').length > 0) {
                    input.setAttribute('placeholder', input.getAttribute('placeholder').slice(0, -1));
                } else {
                    clearInterval(eraser);
                }
            }, 10);
        });
    }
)

window.addEventListener('signup_error', () => {
    iziToast.warning({
        title: 'Oops!',
        message: window.messageError,
    });  
})

window.addEventListener('signup_success', () => {
    iziToast.success({
        title: 'Cadastro Bem-sucedido!',
        message: 'Direcionando para a página de login...',
        timeout: 2800,
    });

    setTimeout(() => {
        window.location.href = "./index.html"
    }, 3000);
})