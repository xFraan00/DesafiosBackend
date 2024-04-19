const express = require("express");
const ProductManager = require("./product-manager");

const app = express();
const PORT = 8080;

app.use(express.json());

const productManager = new ProductManager(); 

app.get("/products", (req, res) => {
    const limit = req.query.limit;
    if (limit) {
        const limitedProducts = productManager.getProducts().slice(0, limit);
        res.json(limitedProducts);
    } else {
        res.json(productManager.getProducts());
    }
});

app.get("/products/:pid", (req, res)=>{
    const productId = parseInt(req.params.pid)
    const product = productManager.getProductById(productId)
    if(product){
        res.json(product)
    }else{
        res.status(404).json({messege: "Producto no encontrado"})
    }
})


app.listen(PORT, () => {
    console.log(`Servidor Express corriendo en el puerto ${PORT}`);
});
