// ...existing code...

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

    function getScrollStep(carousel) {
        // Obtiene el ancho de un producto + gap
        const product = carousel.querySelector('.product');
        if (!product) return 250;
        const style = window.getComputedStyle(carousel);
        let gap = 20;
        if (window.innerWidth <= 900) gap = 10;
        if (window.innerWidth <= 600) gap = 5;
        return product.offsetWidth + gap;
    }

    function scrollLeft(categoryId) {
        const carousel = document.getElementById(categoryId);
        if (carousel) {
            const step = getScrollStep(carousel);
            smoothScroll(carousel, -step, 300);
        } else {
            console.error("El elemento no existe o no soporta scrollLeft");
        }
    }

    function scrollRight(categoryId) {
        const carousel = document.getElementById(categoryId);
        if (carousel) {
            const step = getScrollStep(carousel);
            smoothScroll(carousel, step, 300);
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

// ...existing code...
