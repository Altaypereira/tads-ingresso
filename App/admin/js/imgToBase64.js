const banner = document.querySelector('#banner');

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}
// Get image as base64 string with your type
banner.addEventListener('change', () => {
    const file = banner.files[0];
    getBase64(file).then(
        data => {
            document.getElementById('banner64').value = data;
        }
    );
});

