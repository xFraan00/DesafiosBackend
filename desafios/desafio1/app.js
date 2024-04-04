class productManager {
    constructor() {
        this.products = [];
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        const codeExist = this.products.some(product => product.code === code);
        if (codeExist) {
            console.log("El Código del producto ya existe");
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

const manager = new productManager();

manager.addProduct("Pizza", "Pizza de Muzzarella", 150, "URL", "a1", 10);
manager.addProduct("Pizza", "Pizza de Cebolla", 200, "URL", "b2", 10);
manager.addProduct("Pizza", "Pizza de Jamon y Morron", 250, "URL", "c3", 10);

const allProducts = manager.getProducts();
console.log(allProducts);
