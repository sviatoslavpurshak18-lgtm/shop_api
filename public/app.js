"use strict";

async function loadProducts() {

    const response = await fetch('/api/products');

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }

    return await response.json();
}

const list = document.querySelector('#list');

function render(products) {
    list.innerHTML = '';

    for (const product of products) {
        const li = document.createElement('li');
        li.textContent = `${product.title} — ${product.price} грн `;
        list.append(li);
    }
}

const errorBox = document.querySelector('#error');

async function refresh() {
    try {
        errorBox.textContent = '';
        const products = await loadProducts();

        render(products);
    } catch (err) {
        errorBox.textContent = `Не вдалось завантажити: ${err.message}`;
    }
}

refresh();