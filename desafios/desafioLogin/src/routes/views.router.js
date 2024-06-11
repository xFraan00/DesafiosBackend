import { Router } from "express";
import productModel from "../dao/models/products.model.js";
import cartModel from "../dao/models/carts.model.js";
import { isAuth, isNotAuth } from "../middleware/auth.js";

const viewsRouter = Router();

viewsRouter.get("/login", isNotAuth, (req, res) => {
    res.render("login");
});

viewsRouter.get("/register", isNotAuth, (req, res) => {
    res.render("register");
});

viewsRouter.get("/products", isAuth, async (req, res) => {
   try {
        const {user} = req.session;
        const page = req.query.page;
        const options = {
            page: page,
            limit: 5,
            lean: true
        }
        const products = await productModel.paginate({}, options);
        const {prevPage, nextPage, hasPrevPage, hasNextPage} = products
        
        const prevLink = hasPrevPage ? `http://localhost:8080/products?page=${prevPage}` : null;
        
        const nextLink = hasNextPage ? `http://localhost:8080/products?page=${nextPage}` : null;
        
        res.render("products", {products, prevLink, nextLink, page, user});
    } catch (error) {
        console.log(error);
    }
});

viewsRouter.get("/", async (req, res) => {
    try {
        const products = await productModel.find().lean();
        res.render("home", {products});
    } catch (error) {
        console.log(error);
    }
})

viewsRouter.get("/realtimeproducts", isAuth, async (req, res) => {
    try {
        const {user} = req.session;
        const page = req.query.page;
        const options = {
            page: page,
            limit: 5,
            lean: true
        }
        const products = await productModel.paginate({}, options);
        const {prevPage, nextPage, hasPrevPage, hasNextPage} = products
        
        const prevLink = hasPrevPage ? `http://localhost:8080/realtimeproducts?page=${prevPage}` : null;
        
        const nextLink = hasNextPage ? `http://localhost:8080/realtimeproducts?page=${nextPage}` : null;
        
        res.render("realtimeproducts", {products, prevLink, nextLink, page, user});
    } catch (error) {
        console.log(error);
    }
});

viewsRouter.get("/chat", (req, res) => {
    res.render("chat", {})
});


viewsRouter.get('/carts', async (_req, res) => {
    try {
        const cart = await cartModel.findOne().sort({ createdAt: -1 }).populate('products.product').lean();
        if (cart) {
            res.render('cart', { cart });
        } else {
            res.render('cart', { message: 'No se encontró ningún carrito' });
        }
    } catch (error) {
        console.log(error);
        res.render('cart', { message: 'Hubo un error al cargar el carrito' });
    }
});
export default viewsRouter;