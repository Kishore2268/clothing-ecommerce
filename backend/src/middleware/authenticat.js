const jwtProvider = require("../config/jwtProvider")
const userService = require("../services/user.service")

const authenticate = async(req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]
        if (!token) {
            return res.status(401).json({ message: "Authentication required" });
        }

        const userId = jwtProvider.getUserIdFromToken(token);
        if (!userId) {
            return res.status(401).json({ message: "Invalid token" });
        }

        const user = await userService.findUserById(userId);
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(401).json({ message: "Authentication failed", error: error.message });
    }
}

module.exports = authenticate;