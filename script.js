let cart = [];
let scrollPosition = 0;
const carouselState = {}; // almacena posición de cada carrusel

// ====================== Carrito ======================
function addToCart(product, price) {
    const loader = document.getElementById('loader');
    loader.style.display = 'block';

    setTimeout(() => {
        const existingProduct = cart.find(item => item.product === product);
        if (existingProduct) {
            existingProduct.quantity += 1;
            existingProduct.totalPrice = existingProduct.quantity * existingProduct.price;
        } else {
            cart.push({ product, price, quantity: 1, totalPrice: price });
        }
        updateCartModal();
        loader.style.display = 'none';
        showAddedMessage();
    }, 100);
}

function showAddedMessage() {
    const message = document.createElement('div');
    message.classList.add('added-to-cart-message');
    message.textContent = '¡Producto añadido al carrito!';
    document.body.appendChild(message);
    setTimeout(() => message.classList.add('show'), 100);
    setTimeout(() => {
        message.classList.remove('show');
        document.body.removeChild(message);
    }, 3000);
}

function updateCartModal() {
    const cartItemsContainer = document.getElementById('cartItems');
    const totalPriceContainer = document.getElementById('totalPrice');
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<tr><td colspan="5">El carrito está vacío.</td></tr>';
        totalPriceContainer.textContent = '0.00';
    } else {
        let total = 0;
        cart.forEach((item, index) => {
            total += item.totalPrice;
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.product}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>${item.quantity}</td>
                <td>$${item.totalPrice.toFixed(2)}</td>
                <td><button class="remove-item" onclick="removeFromCart(${index})">Eliminar</button></td>
            `;
            cartItemsContainer.appendChild(row);
        });
        totalPriceContainer.textContent = total.toFixed(2);
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartModal();
}

function openCartModal() {
    const modal = document.getElementById('cartModal');
    modal.style.display = "block";

    // Bloquear scroll del fondo
    scrollPosition = window.pageYOffset;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
}

function closeModal() {
    const modal = document.getElementById('cartModal');
    modal.style.display = "none";

    // Restaurar scroll
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.width = '';
    window.scrollTo(0, scrollPosition);
}

// ====================== Buscador ======================
function filterProducts() {
    const searchInput = document.getElementById('search').value.toLowerCase();
    const products = document.querySelectorAll('.product');
    products.forEach(product => {
        const name = product.querySelector('h3').textContent.toLowerCase();
        const category = product.getAttribute('data-category').toLowerCase();
        product.style.display = (name.includes(searchInput) || category.includes(searchInput)) ? "block" : "none";
    });
}

// ====================== WhatsApp ======================
function proceedToWhatsApp() {
    if(cart.length === 0) {
        alert("Tu carrito está vacío");
        return;
    }
    let cartMessage = "Pedido:\n";
    let total = 0;
    cart.forEach(item => {
        cartMessage += `${item.product} - $${item.price.toFixed(2)} x ${item.quantity}\n`;
        total += item.totalPrice;
    });
    cartMessage += `\nTotal: $${total.toFixed(2)}`;
    const encodedMessage = encodeURIComponent(cartMessage);
    const whatsappUrl = `https://wa.me/3320600333?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
}

// ====================== Carrusel ======================
document.addEventListener('DOMContentLoaded', function () {

    function getScrollStep(carousel) {
        const product = carousel.querySelector('.product');
        if (!product) return 250;
        let gap = 20;
        if (window.innerWidth <= 900) gap = 10;
        if (window.innerWidth <= 600) gap = 5;
        return product.offsetWidth + gap;
    }

    function scrollCarousel(categoryId, direction) {
        const carousel = document.getElementById(categoryId);
        if (!carousel) return;

        const step = getScrollStep(carousel);

        if (direction === 'right') {
            carousel.scrollLeft += step;
        } else {
            carousel.scrollLeft -= step;
        }
    }

    // Ajusta los IDs según tu HTML
    const categories = ['decoracion', 'Llaveros', 'figuras', 'nueva-categoria-2'];

    categories.forEach(cat => {
        const left = document.getElementById(`scroll-left-${cat}`);
        const right = document.getElementById(`scroll-right-${cat}`);
        if (left) left.addEventListener('click', () => scrollCarousel(cat, 'left'));
        if (right) right.addEventListener('click', () => scrollCarousel(cat, 'right'));
    });
});
