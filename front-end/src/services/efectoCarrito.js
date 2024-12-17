export function efectoAgregarProducto() {
    const cartContainer = document.querySelector('.bar');
    cartContainer.classList.add('sacudir');

    setTimeout(() => {
        cartContainer.classList.remove('sacudir');
    }, 500);
}
