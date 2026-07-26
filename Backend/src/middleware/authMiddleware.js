import jwt from "jsonwebtoken";

const authenticateUser = (req, res, next) => {
    try {
        // 1. Read token from cookie
        const token = req.cookies.token;

        // 2. Check if token exists
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized. Please login."
            });
        }

        // 3. Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 4. Store decoded payload in request
        req.user = decoded;

        // 5. Continue to next middleware/controller
        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token."
        });
    }
};

export default authenticateUser;