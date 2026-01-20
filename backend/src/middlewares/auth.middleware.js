import jwt from 'jsonwebtoken';


export const requiresAuth = (req, res, next) => {
    const token = req.cookies.access

    if (!token) return res.status(401).json({message: 'Unauthorized'})
    try{
        const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
        req.userID = payload.sub
        next();
    } catch (err) {
        return res.status(401).json({message: 'Invalid Token'})
    }
}
