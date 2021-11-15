const productosHome = document.querySelector('#productos-home');
const productCont = document.querySelector('#template-card').content;
const productCart = document.querySelector('#template-cart-product').content;
const fragment = document.createDocumentFragment();
const addCartBtn = document.querySelector('.btn');
let cartProducts = {};
const productoCarro = document.querySelector('#products-cart');
const totalPrice = document.querySelector('.total');
const clearCart = document.querySelector('.clear_btn');
const checkoutBtn = document.querySelector('.button');


//GETTIN DATA
  
document.addEventListener('DOMContentLoaded', () => {
    fetchData()
    if(localStorage.getItem('productos-cart'))
    cartProducts = JSON.parse(localStorage.getItem('productos-cart'))
   
    showInCart()
})

const fetchData = async () => {
    try {
        const res = await fetch('data.json')
        const data = await res.json()
        //console.log(data)
        showProducts(data)
    } catch (error) {
        console.log(error)
    }
}


//MOSTRAR CARDS PRODUCTOS EN HOME
const showProducts = (data) =>{
    data.forEach(producto =>{
        productCont.querySelector('h3').textContent = producto.nombre
        productCont.querySelector('small').textContent = producto.precio
        productCont.querySelector('.card-img-top').setAttribute('src', producto.imagen)
        productCont.querySelector('.card-text').textContent = producto.descripcion
        productCont.querySelector('.btn').dataset.id = producto.id
        const clone = productCont.cloneNode(true)
        fragment.appendChild(clone)
    })
    productosHome.appendChild(fragment)
}

//CAPTA CADA ELEMENTO
productosHome.addEventListener('click', e => {
    addCart(e)
})
productoCarro.addEventListener('click', e =>{
    qtyValue(e)
})

const addCart = e => {
    if(e.target.classList.contains('btn')) {    
    inCart(e.target.parentElement.parentElement.parentElement)
    cartContainer.classList.add ('active') 
    }
    e.stopPropagation()
}


//PRODUCTO EN CARRITO
const inCart = objeto => {
    const productoInCart = {
        id: objeto.querySelector('.btn').dataset.id,
        nombre: objeto.querySelector('h3').textContent,
        precio: objeto.querySelector('small').textContent,
        cantidad: 1
    }
    if(cartProducts.hasOwnProperty(productoInCart.id)){
        productoInCart.cantidad = cartProducts[productoInCart.id].cantidad + 1 
    }

  
    cartProducts[productoInCart.id] = {...productoInCart}
    showInCart()
}

//FUNCION PARA MOSTRAR PRODUCTO EN CARRITO
const showInCart = () => {
    productoCarro.innerHTML=''
    Object.values(cartProducts).forEach(producto =>{
        productCart.querySelector('h5').textContent = producto.nombre
        productCart.querySelector('small').textContent = producto.cantidad * producto.precio
        productCart.querySelector('.btn-add').dataset.id = producto.id
        productCart.querySelector('span').textContent = producto.cantidad
        productCart.querySelector('.btn-sup').dataset.id = producto.id
        productCart.querySelector('.btn-trash').dataset.id = producto.id
        productCart.querySelector('.bi-trash').dataset.id = producto.id
        
        const clone = productCart.cloneNode(true)
        fragment.appendChild(clone)   
    })

    productoCarro.appendChild(fragment)

    showTotalPrice ()
    localStorage.setItem('productos-cart', JSON.stringify(cartProducts))
    if(productoCarro.innerHTML != '') {
        document.querySelector('.dot').classList.add('active')
    }
    else {
        document.querySelector('.dot').classList.remove('active')
    }
}
//PRECIO TOTAL

const showTotalPrice = () => {
    const qty = Object.values(cartProducts).reduce((acc, {cantidad})=> acc + cantidad, 0) 
    const precio = Object.values(cartProducts).reduce((acc, {precio, cantidad})=> acc + cantidad * precio, 0)

    totalPrice.innerHTML='Total: '
    const total = document.createElement('span')
    total.className = "total"
    total.innerHTML = `<span class ="total-price">
                        ${precio}
                        </span>`
    totalPrice.appendChild(total)
}



//VACIAR CARRITO    
clearCart.addEventListener ('click', ()=> {
    cartProducts = {}
    showInCart()
})


//BOTONES NAV

const qtyValue = e => {
    if(e.target.classList.contains('btn-add')) {
        const item  = cartProducts[e.target.dataset.id]
        item.cantidad ++
        cartProducts [e.target.dataset.id] = {...item}
        showInCart()
    }
    if(e.target.classList.contains('btn-sup')) {
        const item  = cartProducts[e.target.dataset.id]
        item.cantidad --
        if (item.cantidad === 0) {
            delete cartProducts[e.target.dataset.id]
        }
        showInCart()
    }
    if (e.target.classList.contains('bi-trash')) {
            delete cartProducts[e.target.dataset.id]
        }
        
showInCart()
}


