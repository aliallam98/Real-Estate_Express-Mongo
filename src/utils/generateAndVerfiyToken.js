import jwt from 'jsonwebtoken'



export const generateToken = ({ payload = {}, signature = process.env.JWTPRIVATETOKENKEY, expiresIn = 60 * 60 * 24} = {}) => {
    const token = jwt.sign(payload, signature, { expiresIn: parseInt(expiresIn) });
    return token
}

export const verifyToken = ({ token, signature = process.env.JWTPRIVATETOKENKEY } = {}) => {
    const decoded = jwt.verify(token, signature);
    return decoded
}