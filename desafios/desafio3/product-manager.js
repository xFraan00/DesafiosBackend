const fs = require("fs");

const express = require("express")


class ProductManager {
    constructor() {
        this.filepath = "./products.json";
        this.loadProducts(); 
    }

    loadProducts() {
        try {
            const data = fs.readFileSync(this.filepath, "utf8");
            this.products = JSON.parse(data);
            console.log("Base de Datos cargada:", this.products);
        } catch (error) {
            this.products = [];
            console.log("Error al cargar la Base de Datos", error);
        }
    }
    
    saveProducts() {
        const data = JSON.stringify(this.products, null, 2);
        try {
            fs.writeFileSync(this.filepath, data);
            console.log("Productos guardados en la Base de Datos");
        } catch (error) {
            console.log("Error al guardar los productos en la Base de Datos", error);
        }
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        const codeExist = this.products.some(product => product.code === code);
        if (codeExist) {
            console.log("El código del producto ya existe");
            return;
        }
        
        const productId = this.products.length + 1; 
        const product = {
            id: productId,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };
        this.products.push(product);
        console.log("Producto agregado:", product);
        this.saveProducts();
    }

    updateProduct(productId, updatedFields) {
        const productIndex = this.products.findIndex(product => product.id === productId);
        if (productIndex === -1) {
            console.log("Producto no encontrado");
            return;
        }
    
        
        Object.assign(this.products[productIndex], updatedFields);
        console.log("Producto actualizado:", this.products[productIndex]);
        this.saveProducts(); 
    }

    deleteProduct(productId) {
        const initialLength = this.products.length;
        this.products = this.products.filter(product => product.id !== productId);
        if (this.products.length === initialLength) {
            console.log("El producto no existe");
            return;
        }
        this.saveProducts();
        console.log("Producto eliminado");
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (!product) {
            console.log("Producto no encontrado");
            return; 
        }
        return product;
    }

    getProducts() {
        return this.products;
    }
}

module.exports = ProductManager;

/*
const manager = new ProductManager();

manager.addProduct("Hamburguesa", "Hamburguesa Clásica", 150, "URL", "c1", 10);
manager.addProduct("Sándwich", "Sándwich de Pollo", 120, "URL", "c2", 10);
manager.addProduct("Ensalada", "Ensalada César", 180, "URL", "c3", 10);
manager.addProduct("Pasta", "Pasta Alfredo", 200, "URL", "c4", 10);
manager.addProduct("Sushi", "Sushi Variado", 300, "URL", "c5", 10);
manager.addProduct("Taco", "Taco de Carnitas", 100, "URL", "c6", 10);
manager.addProduct("Sopa", "Sopa de Verduras", 80, "URL", "c7", 10);
manager.addProduct("Pollo", "Pollo a la Parrilla", 220, "URL", "c8", 10);
manager.addProduct("Pescado", "Filete de Salmón", 270, "URL", "c9", 10);
manager.addProduct("Postre", "Pastel de Chocolate", 180, "URL", "c10", 10);
*/
