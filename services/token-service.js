const jwt = require('jsonwebtoken');

const SECRET_KEY = "66335a5d32a1e0175f09dddb8a3adb60af4799c5f7249a32aa1a3caa248b9c144f99b53237851c8bbcb9b4699aceeffa3af2b4ac88eb260658f823882511493b"
// const SECRET_KEY = process.env.SECRET_KEY;


class TokenService {
    createToken = async (data) => {
        return jwt.sign(data, SECRET_KEY);
    }
    verifyToken = async (accessToken) => {
        return jwt.verify(accessToken, SECRET_KEY);
    }
}

module.exports = new TokenService();