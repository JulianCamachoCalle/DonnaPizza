// Función para actualizar la cantidad de la pizza en el modal
function updateQuantity(change) {
    const quantityInput = document.getElementById('modal-quantity');
    let quantity = parseInt(quantityInput.value);
    quantity = Math.max(1, quantity + change);
    quantityInput.value = quantity;
}

// Función para agregar una pizza al carrito
function addToCart() {
    const name = document.getElementById('modal-pizza-name').textContent;
    const size = document.querySelector('input[name="size"]:checked').value;
    const price = size === 'Familiar' ? document.getElementById('modal-price-familiar').textContent : document.getElementById('modal-price-media').textContent;
    const quantity = parseInt(document.getElementById('modal-quantity').value);

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.name === name && item.size === size);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ name, size, price, quantity });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();

    // Mostrar el SweetAlert de confirmación
    Swal.fire({
        title: '¡Producto agregado!',
        html: `<strong>${quantity} x ${name} (${size})</strong> ha sido añadido a tu carrito.`,
        icon: 'success',
        confirmButtonText: 'Aceptar',
        customClass: {
            confirmButton: 'btn btn-success',
        },
        buttonsStyling: false
    });
}



// Cargar y mostrar el carrito en el modal
function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsList = document.getElementById('cart-items');
    cartItemsList.innerHTML = '';

    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.textContent = `${item.quantity} x ${item.name} (${item.size}) - S/. ${item.price}`;

        const removeButton = document.createElement('button');
        removeButton.className = "btn btn-outline-danger btn-sm";
        removeButton.textContent = "Eliminar";
        removeButton.onclick = () => removeFromCart(index);
        li.appendChild(removeButton);
        cartItemsList.appendChild(li);
    });
}

// Alternar la visibilidad del modal
function toggleCartModal() {
    loadCart();
    const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
    cartModal.show();
}

// Función para eliminar un producto del carrito
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}


// Llama a la función para cargar las pizzas al cargar la página
document.addEventListener('DOMContentLoaded', cargarPizzas)