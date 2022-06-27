const tokenService = require("../services/token-service");

const auth = async (req, res, next) => {
    try {
        const accessToken = req.header('accessToken');

        if (!accessToken) {
            return res.status(401).json("You are not authorized");
        }

        const userData = await tokenService.verifyToken(accessToken);
        if (!userData) {
            return res.status(401).json({ message: "Your are not authorized" });
        }

        req.user = userData;
    } catch (error) {
        res.status(403).json({ message: "Token is invalid" })
        console.log(error);
    } finally {
        next();
    }
}

module.exports = auth