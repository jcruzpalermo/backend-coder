import { Router } from "express";
import passport from "passport";
import { AuthControllers } from "../../controllers/AuthController/index.js";


const router = Router()

router.post('/signup', AuthControllers.signUp)

router.post('/', passport.authenticate('login', { failureRedirect: "/login-error" }), async (req, res) => {
    res.send({ success: true, message: 'Logged succesfull', user: req.user })
})

router.get('/login-error', (req, res) => {
    res.send({ success: false, message: 'error in login' })
})

router.get('/github-login', passport.authenticate('github'), AuthControllers.githubLogin)

router.get('/github', passport.authenticate('github'), (req, res) => {
    res.send(req.user)
})

router.get('/info', (req, res) => {
	res.json({
		argumentos_de_entrada: process.argv.slice(2),
		nombre_sistema_operativo: process.platform,
		version_node: process.version,
		memoria_total_reservada: process.memoryUsage().rss,
		path_de_ejecucion: process.execPath,
		process_id: process.pid,
		carpeta_del_proyecto: process.cwd(),
	});
});

router.get('/api/randoms', (req, res) => {
	const forked = fork('./controllers/randoms.js');

	let { cantidad } = req.query;
	let obj = {};
	cantidad
		? forked.send({ cantidad, obj })
		: forked.send({ cantidad: 500000000, obj });
	forked.on('message', msg => res.json(msg));
});

export { router as AuthRouter }