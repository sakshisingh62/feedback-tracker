const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {

    try {


        let token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: "No Token Provided" });
        }
        // Accept "Bearer <token>" format
        if (token.startsWith("Bearer ")) {
            token = token.split(" ")[1];
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();

    } catch (error) {

        res.status(401).json({
            message: "Invalid Token"
        });

    }
};

module.exports = authMiddleware;