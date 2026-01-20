import jwt from 'jsonwebtoken';

export const signAccessToken = (userID) => {
    const token = jwt.sign(
        {sub: userID},
        process.env.JWT_ACCESS_SECRET,
        {expiresIn: '1d'}
    )
    return token;
}

export const signRefreshToken = (userID) => {
    const token = jwt.sign(
        {sub: userID},
        process.env.JWT_REFRESH_SECRET,
        {expiresIn: '7d'}
    )
    return token;
}