const userModel = require("../mongodb/schemas/userModel");
const bcrypt = require("bcrypt");


exports.registerUser = async (req, res) => {
    try {
        console.log(req.body)
        const { name, email, password } = req.body;

        //check if email already exists
        const isExist = await userModel.findOne({ email: email })
        if (isExist) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }

        //if user not exists / register user
        const userDoc = await userModel({ name, email, password });

        //save user
        const userRegistered = await userDoc.save();

        //generate token
        const token = await userRegistered.generateToken();

        //send response
        return res.status(200)
            /////////////// PUBLIC SUFFEX LIST : due to public suffex list we cannot fetch or pass cookies in SUB DOMAINS as EXAMPLE.RENDER.COM ,etc
            // .cookie("jwt", token, {
            //     // httpOnly: false, // deny accessing cookie in frontend js
            //     // secure: false, // can only share in https not http "set true in production"
            //     // maxAge: 48 * 60 * 60 * 1000,
            // })
            .json({
                cookie: { jwt: token },
                success: true,
                message: "User Registered successfully.",
                user: {
                    userId: userRegistered._id,
                    name: userRegistered.name,
                    email: userRegistered.email,
                    xp: userRegistered.xp,
                    level: userRegistered.level,
                    createdAt: userRegistered.createdAt
                }
            })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        })
    }
}


exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("reach22")
        //find user
        const isExist = await userModel.findOne({ email });

        //if user dosen't exist
        if (!isExist) {
            return res.status(400).json({
                success: false,
                message: "User not found",
            })
        }

        //if user found check password
        const isVarified = await bcrypt.compare(password, isExist.password)

        //on wrong password
        if (!isVarified) {
            return res.status(401).json({
                success: false,
                message: "Invalid credientails",
            })
        }

        //generate token and send response
        const token = await isExist.generateToken();
        
        return res.status(200)
            /////////////// PUBLIC SUFFEX LIST : due to public suffex list we cannot fetch or pass cookies in SUB DOMAINS as EXAMPLE.RENDER.COM ,etc
            // .cookie("jwt", token, {
            //     // httpOnly: false, // deny accessing cookie in frontend js
            //     // secure: false, // can only share in https not http "set true in production"
            //     // maxAge: 48 * 60 * 60 * 1000,
            // })
            .json({
                cookie: { jwt: token },
                success: true,
                message: "Login successfull",
                user: {
                    userId: isExist._id,
                    name: isExist.name,
                    email: isExist.email,
                    xp: isExist.xp,
                    level: isExist.level,
                    createdAt: isExist.createdAt
                }
            })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        })
    }
}

//fetched by frontend to get profile on reload "jwt auth" on frontend
exports.getProfile = async (req, res) => {
    try {
        const userId = req.user?.userId

        const userProfile = await userModel.findById({ _id: userId })

        if (!userProfile) {
            return res.status(404).json({
                success: true,
                message: "User not found.",
            })
        }

        return res.status(200).json({
            success: true,
            message: "User found successfully",
            user: {
                userId: userProfile._id,
                name: userProfile.name,
                email: userProfile.email,
                xp: userProfile.xp,
                level: userProfile.level,
                createdAt: userProfile.createdAt
            }
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        })
    }
}


exports.updateProfile = async (req, res) => {
    try {
        const userId = req.user?.userId
        const { name, email } = req.body

        const userProfile = await userModel.findById({ _id: userId })

        if (!userProfile) {
            return res.status(404).json({
                success: true,
                message: "User not found.",
            })
        }

        //update accordinly to fields passed by user
        if (name) userProfile.name = name;
        if (email) userProfile.email = email;

        //save changes
        await userProfile.save();
        console.log("updated user", userProfile);

        return res.status(200).json({
            success: true,
            message: "User udpdated successfully",
            user: {
                userId: userProfile._id,
                name: userProfile.name,
                email: userProfile.email,
                xp: userProfile.xp,
                level: userProfile.level,
                createdAt: userProfile.createdAt
            }
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        })
    }
}