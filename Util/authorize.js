const jwt = require('jsonwebtoken')
module.exports = authorize

function authorize (roles = []){
    if (typeof roles === 'string') {
        roles = [roles];
    }
    return (
        (req, res, next) => {
            const token = req.header('Authorization')
            if(jwt.decode(token).userRole === req.user.userRole){
                next()
            }
            if (roles.length && !roles.includes(req.user.userRole)) {
                return res.status(401).send({ message: 'Unauthorized' });
            }
        }
    )
}