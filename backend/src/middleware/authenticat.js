const jwtProvider = require("../config/jwtProvider")
const userService = require("../services/user.service")

const authenticate = async(req, res, next) => {
    if (req.headers.authorization) {
        console.log(`Received authentication request with headers:`, req.headers);
    }


    try {
        const token = req.headers.authorization?.split(" ")[1]
        if (!token) {
            return res.status(401).json({ message: "Authentication required" });
        }

        let userId;
        try {
            userId = jwtProvider.getUserIdFromToken(token);
        } catch (error) {
            console.error("Error extracting user ID from token:", error);
            return res.status(401).json({ message: "Invalid token", error: error.message });
        }

        if (!userId) {
            return res.status(401).json({ message: "Invalid token" });
        }

        let user;
        try {
            user = await userService.findUserById(userId);
        } catch (error) {
            console.error("Error finding user by ID:", error);
            return res.status(401).json({ message: "User not found", error: error.message });
        }

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
