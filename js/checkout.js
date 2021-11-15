let getCheckoutProducts = JSON.parse(localStorage.getItem('productos-cart'))
const dataProds = Object.values(getCheckoutProducts)
const checkoutProducts = document.querySelector('#checkout-products')
const resumen = document.querySelector('#resumen')
checkoutProducts.innerHTML = ''


const calcularCostoProductos = () =>{
    const precio = dataProds.reduce((acc, {precio, cantidad}) => acc + cantidad * precio,0)
    const aPagar = document.createElement('p')
    aPagar.className = 'pagar'
    aPagar.innerHTML = `Costo productos: <b> $${precio}` 
    resumen.appendChild(aPagar)
    let envio = 200
    if(precio >= 2000) {
        envio = "envío bonificado"
        let precioCero = true
    }
    else if (precio === 0) {
        envio = '0'
    }

    const costoEnvio = document.createElement('p')
    costoEnvio.innerHTML = `Costo de envío: $${envio}`
    resumen.appendChild(costoEnvio)

    const CalculoCostoTotal = () => {
        let finalTotal =  precio + 200
        if(precio >= 2000) {
            finalTotal = precio + 0
        }
        else if (precio === 0) {
            finalTotal = 0
        }
        const precioFinal = document.createElement('p')
        precioFinal.innerHTML= `Total a pagar: $${finalTotal}`
        resumen.appendChild(precioFinal)
    }
    CalculoCostoTotal()
}

calcularCostoProductos()


for(let item of dataProds) {
   checkoutProducts.innerHTML += `
    <h5>${item.nombre}</h5>
    <div class="checkout-items">
    <p>${item.cantidad}x</p>
    <p>$${item.precio*item.cantidad}</p>
    </div>`
}
if(dataProds.length === 0) {
    checkoutProducts.innerHTML = ''
    const avisoEmpty = document.createElement('p')
    avisoEmpty.className = 'aviso-empty'
    avisoEmpty.innerHTML= "No hay productos agregados"
    checkoutProducts.appendChild(avisoEmpty)   
}
else{
    const paybtn = document.createElement('button')
    paybtn.innerHTML = "Pagar"
    paybtn.className = "paybtn"
    resumen.append(paybtn)
}





