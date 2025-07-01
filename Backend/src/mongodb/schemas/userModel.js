const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/.+\@.+\..+/, "Please use a valid email address"]
    },
    password: {
        type: String,
        required: true,
        minlength: [6, "Password length must be 6."]
    },
    xp: {
        type: Number,
        default: 0
    },
    level: {
        type: Number,
        default: 1
    }
},
    { timestamps: true }
)

//generate jwt token
userSchema.methods.generateToken = async function () {
    try {
        return jwt.sign({
            userId:this._id.toString(),
            email:this.email
        },process.env.JWT_SECRET_STRING)
    } catch (error) {
        console.log("jwt generate error: ", error)
    }
}

//hash password
userSchema.pre("save", async function (next) {
    if (this.isModified("password"))
        this.password = await bcrypt.hash(this.password, parseInt( process.env.Bcrypt_Hash_Rounds))
    next();
})

const userModel =new mongoose.model("UserModel", userSchema);

module.exports = userModel;