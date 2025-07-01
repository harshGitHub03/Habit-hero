const jwt = require("jsonwebtoken")

exports.jwtVerify = async (req, res, next) => {
    try {
        //retreve token
        const token = req.header("Authentication")?.split(" ")[1]

        //if token dosen't exists
        if (!token) {
            return res.status(404).json({
                success: false,
                message: "token not found"
            })
        }

        //if token exists
        const isVarified = jwt.verify(token, process.env.JWT_SECRET_STRING);

        //if token invalid
        if (!isVarified) {
            return res.status(401).json({
                success: false,
                message: "invalid jwt token"
            })
        }
        req.user = isVarified; // attach token data eg. userId,email

        next(); //pass control to next controller
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "server error",
            error: error.message
        })
    }
}