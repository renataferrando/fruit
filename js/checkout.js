let getCheckoutProducts = JSON.parse(localStorage.getItem('productos-cart'))
const dataProds = Object.values(getCheckoutProducts)
const checkoutProducts = document.querySelector('#checkout-products')
const resumen = document.querySelector('#resumen')
const empty = document.querySelector('.empty')
checkoutProducts.innerHTML = ''

console.log(dataProds)

for(let item of dataProds) {
   checkoutProducts.innerHTML += `
    <h5>${item.nombre}</h5>
    <div class="checkout-items">
    <p>${item.cantidad}x</p>
    <p>$${item.precio*item.cantidad}</p>
    </div>`
   
}

if(dataProds.length === 0) {
    empty.innerHTML = ''
    const avisoEmpty = document.createElement('p')
    avisoEmpty.className = 'aviso-empty'
    avisoEmpty.innerHTML= "No hay productos agregados"
    empty.appendChild(avisoEmpty)   
}

showTotalPrice()