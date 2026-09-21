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

async function submitProductForm(event) {
    event.preventDefault();

    const errBlock = document.querySelector('#error');
    errBlock.textContent = '';

    const formData = new FormData(event.target);
    const title = formData.get('title');
    const price = Number(formData.get('price'));

    console.log({ title, price });

    try {
        const res = await fetch('/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, price })
        });

        const resData = await res.json();

        if (!res.ok) {
            throw new Error(resData.error || 'Помилка при додаванні товару');
        }

        event.target.reset();
        refresh();

    } catch (err) {
        errBlock.textContent = err.message;
    }
}

document.querySelector('#form').addEventListener('submit', submitProductForm);

refresh();