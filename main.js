// Keep the cart in the browser so it stays there when we change pages.
let cart = JSON.parse(localStorage.getItem("shopeaseCart") || "[]");

function saveCart() {
    localStorage.setItem("shopeaseCart", JSON.stringify(cart));
    showCartItems();
}

function showCartItems() {
    const count = document.getElementById("cartCount");
    const itemsBox = document.getElementById("cartItems");
    const totalBox = document.getElementById("cartTotal");

    if (!count || !itemsBox || !totalBox) return;

    count.textContent = cart.reduce((total, item) => total + item.quantity, 0);

    if (cart.length === 0) {
        itemsBox.innerHTML = "<p>Your cart is empty.</p>";
    } else {
        itemsBox.innerHTML = cart.map(item => `
            <div class="cart-item">
                <span>${item.name} × ${item.quantity}</span>
                <span>₹${(item.price * item.quantity).toFixed(2)}</span>
                <button class="remove" data-remove="${item.id}">Remove</button>
            </div>
        `).join("");
    }

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    totalBox.textContent = "₹" + total.toFixed(2);
}

document.addEventListener("click", function(event) {
    const addButton = event.target.closest(".add");

    if (addButton) {
        const id = Number(addButton.dataset.id);
        const product = {
            id: id,
            name: addButton.dataset.name,
            price: Number(addButton.dataset.price),
            stock: Number(addButton.dataset.stock)
        };

        const existingItem = cart.find(item => item.id === id);

        if (existingItem) {
            if (existingItem.quantity < product.stock) {
                existingItem.quantity++;
            } else {
                alert("No more stock available.");
                return;
            }
        } else {
            if (product.stock < 1) return;
            product.quantity = 1;
            cart.push(product);
        }

        saveCart();
        alert("Product added to cart!");
    }

    const removeButton = event.target.closest("[data-remove]");
    if (removeButton) {
        const id = Number(removeButton.dataset.remove);
        cart = cart.filter(item => item.id !== id);
        saveCart();
    }
});

document.getElementById("showCart")?.addEventListener("click", function() {
    document.getElementById("cartBox").hidden = false;
});

document.getElementById("closeCart")?.addEventListener("click", function() {
    document.getElementById("cartBox").hidden = true;
});

document.getElementById("search")?.addEventListener("input", function() {
    const word = this.value.toLowerCase();
    document.querySelectorAll(".product").forEach(function(product) {
        product.hidden = !product.dataset.name.includes(word);
    });
});

document.getElementById("checkout")?.addEventListener("click", async function() {
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    try {
        const response = await fetch("/checkout", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({cart: cart.map(item => ({
                id: item.id,
                quantity: item.quantity
            }))})
        });

        const result = await response.json();

        if (!response.ok) {
            alert(result.error || "Please try again.");
            if (response.status === 401) window.location.href = "/login";
            return;
        }

        alert(result.message + " Total: ₹" + result.total);
        cart = [];
        saveCart();
        window.location.href = "/orders";
    } catch (error) {
        alert("Could not place order. Please try again.");
    }
});

showCartItems();
