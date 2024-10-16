import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
        unique: true
    },
    password: String,
    balance: Number,
    statement: [String | null]
})

const User = mongoose.model('User', UserSchema, 'Users')

export default User