let cart = [];

function addToCart(product, price) {
    const loader = document.getElementById('loader');
    loader.style.display = 'block';  // Mostrar cargador

    setTimeout(() => {
        const existingProduct = cart.find(item => item.product === product);

        if (existingProduct) {
            existingProduct.quantity += 1;
            existingProduct.totalPrice = existingProduct.quantity * existingProduct.price;
        } else {
            cart.push({ product, price, quantity: 1, totalPrice: price });
        }
        updateCartModal();

        loader.style.display = 'none';  // Ocultar cargador

        showAddedMessage();
    }, 100);
}

function showAddedMessage() {
    const message = document.createElement('div');
    message.classList.add('added-to-cart-message');
    message.textContent = '¡Producto añadido al carrito!';

    document.body.appendChild(message);

    setTimeout(() => {
        message.classList.add('show');
    }, 100);

    setTimeout(() => {
        message.classList.remove('show');
        document.body.removeChild(message);
    }, 3000);
}

function updateCartModal() {
    const modal = document.getElementById('cartModal');
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
    updateCartModal();
}

function closeModal() {
    const modal = document.getElementById('cartModal');
    modal.style.display = "none";
}

function filterProducts() {
    const searchInput = document.getElementById('search').value.toLowerCase();
    const products = document.querySelectorAll('.product');
    products.forEach(product => {
        const name = product.querySelector('h3').textContent.toLowerCase();
        const category = product.getAttribute('data-category').toLowerCase();
        if (name.includes(searchInput) || category.includes(searchInput)) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });
}

function proceedToWhatsApp() {
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

document.addEventListener('DOMContentLoaded', function () {
    function smoothScroll(element, change, duration) {
        const start = element.scrollLeft;
        let currentTime = 0;
        const increment = 20;

        const animateScroll = function() {
            currentTime += increment;
            const val = easeInOutQuad(currentTime, start, change, duration);
            element.scrollLeft = val;
            if (currentTime < duration) {
                requestAnimationFrame(animateScroll);
            }
        };
        animateScroll();
    }

    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    function scrollLeft(categoryId) {
        const carousel = document.getElementById(categoryId);
        if (carousel) {
            const step = 600;  // Ajusta el paso del desplazamiento
            smoothScroll(carousel, -step, 300);  // Ajusta la duración para que sea más rápida
        } else {
            console.error("El elemento no existe o no soporta scrollLeft");
        }
    }

    function scrollRight(categoryId) {
        const carousel = document.getElementById(categoryId);
        if (carousel) {
            const step = 600;  // Ajusta el paso del desplazamiento
            smoothScroll(carousel, step, 300);  // Ajusta la duración para que sea más rápida
        } else {
            console.error("El elemento no existe o no soporta scrollRight");
        }
    }

    window.scrollLeft = scrollLeft;
    window.scrollRight = scrollRight;

    document.getElementById('scroll-left-decoracion').addEventListener('click', function() {
        scrollLeft('decoracion');
    });
    document.getElementById('scroll-right-decoracion').addEventListener('click', function() {
        scrollRight('decoracion');
    });
    document.getElementById('scroll-left-Llaveros').addEventListener('click', function() {
        scrollLeft('Llaveros');
    });
    document.getElementById('scroll-right-Llaveros').addEventListener('click', function() {
        scrollRight('Llaveros');
    });
    document.getElementById('scroll-left-figuras').addEventListener('click', function() {
        scrollLeft('Figuras');
    });
    document.getElementById('scroll-right-figuras').addEventListener('click', function() {
        scrollRight('Figuras');
    });
    document.getElementById('scroll-left-nueva-categoria-2').addEventListener('click', function() {
        scrollLeft('nueva-categoria-2');
    });
    document.getElementById('scroll-right-nueva-categoria-2').addEventListener('click', function() {
        scrollRight('nueva-categoria-2');
    });
});
