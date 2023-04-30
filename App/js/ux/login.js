const login_error = new Event('login_error');
const invalid_email = new Event('invalid_email');


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

window.addEventListener('login_error', () => {
    iziToast.error({
        title: 'Oops!',
        message: 'Usuário e/ou senha incorretos!',
    });  
})

window.addEventListener('invalid_email', () => {
    iziToast.warning({
        title: 'Oops!',
        message: 'Email inválido!',
    });
})