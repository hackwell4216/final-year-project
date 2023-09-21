import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "Please provide a firstname"],
        unique: true,
    },
    lastname: {
        type: String,
        required: [true, "Please provide your lastname"]
    },
    phone: {
        type: String,
        required: [true, "Please enter your phone"]
    },
    address: {
        type: String,
        require: [true, "Please enter your residential address"]
    },
    idCard: {
        type: String,
        require: [true, "Provide a national ID number"]
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
})

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;