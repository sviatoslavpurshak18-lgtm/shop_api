import express from 'express';

const app = express();

const PORT = 3000;

let products = [
    { id: 1, title: "Product 1", price: 10.99, description: "Description for Product 1" },
    { id: 2, title: "Product 2", price: 19.99, description: "Description for Product 2" },
    { id: 3, title: "Product 3", price: 5.99, description: "Description for Product 3" },
]

let nextId = 4; // для генерації унікальних id для нових продуктів


// app.get('/', (req, res) => {
//     res.json({ status: 'ok' });
// });

app.get('/users', (req, res) => {
    res.json({ page: "users" });
});

app.get('/api/products', (req, res) => { // повертає всі товари у форматі JSON
    res.json(products);
});

app.get('/api/products/:id', (req, res) => { // повертає конкретний товар за його id - /products/1
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: "Product not found" });
    }
});

app.use(express.json());
app.use(express.static('public'));

app.post('/api/products', (req, res) => {
    const { title, price } = req.body;

    if (!title || typeof price !== 'number') {
        return res.status(400).json({ error: "Туфта дані" });
    }


    const product = { id: nextId, title, price };
    nextId++;
    products.push(product);

    res.status(201).json(product);

})

app.delete('/api/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const productIndex = products.findIndex(p => p.id === productId);

    if (productIndex !== -1) {
        products.splice(productIndex, 1);
        res.json({ message: "Product deleted" });
    } else {
        res.status(404).json({ error: "Product not found" });
    }

    products = products.filter((p) => p.id !== id);
    res.status(204).end();

});


app.listen(PORT, () => {
    console.log(`Сервер працює: http://localhost:${PORT}`);
});