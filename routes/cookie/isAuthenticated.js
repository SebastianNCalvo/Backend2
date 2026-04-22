export default function isAuthenticated (req, res, next) {
    if (!req.session?.user) {
        return res.status(400).json({msg: "No hay una sesion iniciada"})
    }
    return next();
}