let nombre= prompt("Por favor, ingrese su nombre: ");
let apellido= prompt("Por favor, ingrese su apellido: ");
function bienvenida (nombre, apellido){
    alert(`Bienvenido ${nombre} ${apellido}`);
}
bienvenida (nombre, apellido);


class Producto{
    constructor(id, articulo, precio, stock, img){
        this.id = id;
        this.articulo = articulo;
        this.precio = precio;
        this.stock = stock;
        this.img = img;
        this.cantidad = 1; 
    }
}

const PRODUCTO_1 = new Producto (1, "Shirt IJU", 1800, 4, "../assets/img/shirt.jpg");
const PRODUCTO_2 = new Producto (2, "Pants SEA", 2400, 5, "../assets/img/jean.jpg");
const PRODUCTO_3 = new Producto (3, "Tshirt BREEZE", 1200, 2, "../assets/img/tshirt.jpg");
const PRODUCTO_4 = new Producto (4, "Sweater COMFY", 2600, 5, "../assets/img/sweater.jpg");
const PRODUCTO_5 = new Producto (5, "3xSocks", 600, 6, "../assets/img/socks.jpg");
const PRODUCTO_6 = new Producto (6, "Hat SUMMER", 500, 3, "../assets/img/hat.jpg");

const PRODUCTOS = [PRODUCTO_1, PRODUCTO_2, PRODUCTO_3, PRODUCTO_4, PRODUCTO_5, PRODUCTO_6]; 

let carrito = [];

const CONTAINER_PROD = document.getElementById("containerProd");

const PROD_DEV = () =>{
    const ROW = document.createElement("div");
    ROW.classList.add("row", "justify-content-evenly");
    PRODUCTOS.forEach(producto =>{
        const card = document.createElement("div");
        card.classList.add("col-md-4", "cards");
        card.innerHTML = `
            <div class="card" style="width: 100%;">
                <img src="${producto.img}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h2 class="card-title">${producto.articulo}</h2>
                    <p class="card-text">${producto.precio}</p>
                    <button class="btn btn-primary" id="boton${producto.id}"> Add to cart </button>
                </div>
            </div>
        `;
        ROW.appendChild(card);
        
            const BUTTON = document.getElementById(`boton${producto.id}`);
            BUTTON.addEventListener("click", () =>{
                addToCart(producto.id);
            });
    });
    CONTAINER_PROD.appendChild(ROW);
}

PROD_DEV();

const addToCart = (id) =>{
    const addedProd = carrito.find(producto => producto.id === id);
    if(addedProd) {
        addedProd.cantidad++;
    }else{
        const producto = PRODUCTOS.find(producto => producto.id === id);
        carrito.push(producto);
    }
    console.log(carrito);
}

const CONTAINER_CARR = document.getElementById("containerCart");
const myCart = document.getElementById("myCart");

myCart.addEventListener("click", ()=>{
    mostrarCarrito();
})

const mostrarCarrito = () =>{
    containerCart.innerHTML= " ";
    carrito.forEach(producto =>{
        const card = document.createElement("div");
        card.classList.add("col-md-4", "cards");
        card.innerHTML = `
            <div class="card" style="width: 100%;">
                <img src="${producto.img}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h2 class="card-title">${producto.articulo}</h2>
                    <p class="card-text">${producto.precio}</p>
                    <button class="btn btn-primary" id="boton${producto.id}"> Add to cart </button>
                </div>
            </div>
        `
        containerCart.appendChild(card);

        const boton = document.getElementById(`eliminar ${producto.id}`);
        boton.addEventListener("click", ()=>{
            eliminarDelCarrito(producto.id)
        })
    })
}

const eliminarDelCarrito = (id) => {
    const producto = carrito.find(producto => producto.id === id);
    const indice = carrito.indexOf(producto);
    carrito.splice(indice,1);
    mostrarCarrito();
}

const CART_JSON = JSON.stringify(carrito);

localStorage.setItem("carrito", CART_JSON);

const CARRITO_RECU = localStorage.getItem("carrito");

const carritoRecuperado = JSON.parse(CARRITO_RECU);

console.log(carritoRecuperado);

const CONTAINER_CART = document.getElementById("containerCart");

const addToCartButtons = document.querySelectorAll('.addToCartBtn');

addToCartButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        alert(`Producto ${carrito[index].articulo} fue añadido a tu carrito!`);
    });
});