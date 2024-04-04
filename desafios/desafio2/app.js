const fs = require("fs");

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


const manager = new ProductManager();

 //manager.addProduct("Pizza", "Pizza de Muzzarella", 150, "URL", "a1", 10);
 //manager.addProduct("Pizza", "Pizza de Cebolla", 180, "URL", "b2", 10);
// manager.addProduct("Pizza", "Pizza de Jamon y Morron", 250, "URL", "c3", 10);

//manager.updateProduct(1, { price: 150 });

//manager.deleteProduct(2)

