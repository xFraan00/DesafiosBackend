import { Router } from 'express';
import passport from 'passport';


const router = Router();

router.post('/register', passport.authenticate('register', { failureRedirect: '/api/session/failRegister' }), async (req, res) => {    
    res.redirect('/login');
});

router.post('/login', passport.authenticate('login', { failureRedirect: '/api/session/failLogin' }), async (req, res) => {
    const user = req.user;
    if (!user) {
        return res.status(400).send({ result: 'Error', message: 'Credenciales inválidas' });
    }
    
    req.session.user = {
        id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        age: user.age,
        role: user.role 
    };

   
    res.redirect('/products');
});

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(500).send({ result: 'Error', message: 'Error al cerrar sesión' });
        res.redirect('/login');
    });
});

router.get('/failRegister', (req, res) => {
    res.send({ error: 'Error al registrar el usuario' });
});

router.get('/failLogin', (req, res) => {
    res.send({ error: 'Error al hacer el login' });
});

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }), (_req, _res) => {});

router.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/api/session/failLogin' }), (req, res) => {
    req.session.user = req.user;
    res.redirect('/products');
});

export default router;
