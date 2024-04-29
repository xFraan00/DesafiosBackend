const express = require("express");
const ProductManager = require("./product-manager");

const app = express();
const PORT = 8080;

app.use(express.json());

const productManager = new ProductManager();

app.get("/products", (req, res) => {
    try {
        const limit = req.query.limit;
        if (limit) {
            const limitedProducts = productManager.getProducts().slice(0, limit);
            res.json(limitedProducts);
        } else {
            res.json(productManager.getProducts());
        }
    } catch (error) {
        res.status(500).json({ message: "Error al procesar la solicitud" });
    }
});

app.get("/products/:pid", (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const product = productManager.getProductById(productId);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: "Producto no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al procesar la solicitud" });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor Express corriendo en el puerto ${PORT}`);
});
